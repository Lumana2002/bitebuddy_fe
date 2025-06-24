"use client";

import Loading from "@/components/Loading";
import InputBox from "@/components/InputBox";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import { useRouter } from "next/navigation";
import { useGetRestaurant } from "@/hooks/restaurantsQueries";
import { updateRestaurant } from "@/apicalls/restaurant";
import { RestaurantSchema, TRestaurant } from "@/schemas/restaurantSchema";
import TextAreaBox from "@/components/TextAreaBox";

type EditProps = {
  id: string;
  fromProfilePage?: boolean;
};

const EditForm: React.FC<EditProps> = ({ id }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const session = useSession()
  const { data: restaurantData, isPending } = useGetRestaurant(Number(id));

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TRestaurant>({
    resolver: zodResolver(RestaurantSchema),
    defaultValues: {
      name: restaurantData?.name,
      email: restaurantData?.email,
      cuisine: restaurantData?.cuisine,
      contact: restaurantData?.contact?.toString(),
      image: restaurantData?.image?.toString(),
      description: restaurantData?.description,
      address: restaurantData?.address,
      status: restaurantData?.status,
    },
  });


  useEffect(() => {
    if (restaurantData) {
      setValue("name", restaurantData?.name || "");
      setValue("email", restaurantData?.email || "");
      setValue("cuisine", restaurantData?.cuisine || "");
      setValue(
        "contact",
        restaurantData?.contact?.toString()
      );
      setValue("image", restaurantData?.image?.toString());
      setValue("description", restaurantData?.description || "");
      setValue("address", restaurantData?.address || "");
      setValue("status", restaurantData?.status || "inactive");
    }
  }, [restaurantData, setValue]);

  const { mutate, isPending: Updating } = useMutation({
    mutationFn: updateRestaurant,
    onSettled(data: any) {
      if (data.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["restaurant", id] });
        queryClient.invalidateQueries({ queryKey: ["restaurants"] });
        toast.success("Restaurant Updated Successfully");
        reset();
        router.push("/dashboard/restaurants");
      }

      if (data.response.status === 422) {
        toast.error("Please fill all the required fields.");
      } else {
        toast.error("Failed to update restaurant, Something went wrong.");
      }
    },
  });

  const onSubmit = (data: TRestaurant) => {
    const { image, ...resData } = data;
    console.log(data)

    const modifiedData = {
      id: Number(id),
      data: {
        ...resData,
        image: image
      },
      token: session?.data?.user?.access_token
    };
    console.log(data?.image)

    mutate(modifiedData);
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-8 py-10 px-5 vsm:px-14 rounded-lg border border-input shadow"
    >
      {/* Required Fields  */}
      <InputBox<TRestaurant>
        name="name"
        id="name"
        placeholder="Enter Restaurant's Name..."
        register={register}
        error={(errors && errors?.name?.message?.toString()) || ""}
        desc="enter the name of restaurant"
        label="Restaurant's Name *"
      />

      <InputBox<TRestaurant>
        name="cuisine"
        id="cuisine"
        placeholder="Enter Cuisine..."
        register={register}
        error={(errors && errors?.cuisine?.message?.toString()) || ""}
        desc="enter the restaurant's cuisine"
        label="Restaurant's Cuisine *"
      />

      <InputBox<TRestaurant>
        name="email"
        id="email"
        placeholder="Enter Email..."
        register={register}
        error={(errors && errors?.email?.message?.toString()) || ""}
        desc="enter the email of restaurant"
        label="Restaurant's Email *"
      />

      <InputBox<TRestaurant>
        name="contact"
        id="contact"
        placeholder="Enter Contact Information..."
        register={register}
        error={
          (errors && errors?.contact?.message?.toString()) || ""
        }
        desc="enter the contact of restaurant"
        label="Restaurant's Contact *"
      />

      <TextAreaBox<TRestaurant>
        name="description"
        id="description"
        placeholder="Restaurant's Description*"
        register={register}
        error={(errors && errors?.description?.message?.toString()) || ""}
        desc="enter the restaurant's description"
        label="Restaurant's Description *"
      />

      <InputBox<TRestaurant>
        name="address"
        id="address"
        placeholder="Enter Restaurant's Address..."
        register={register}
        error={(errors && errors?.address?.message?.toString()) || ""}
        desc="enter the restaurant's address"
        label="Restaurant's Address *"
      />

      <InputBox<TRestaurant>
        name="status"
        id="status"
        placeholder="Active or Inactive..."
        register={register}
        error={(errors && errors?.contact?.message?.toString()) || ""}
        desc="enter the restaurant's status"
        label="Restaurant's Status *"
      />

      <ImageUpload
        control={control}
        errors={errors}
        defImg={restaurantData?.image}
        token={session?.data?.user?.access_token}
      />


      {/* Form Submission */}
      <Button type="submit" className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium  rounded-md  border-r-0 ">
        {isPending ? (
          <div className="flex items-center gap-2">
            <Loader2 className="size-5 animate-spin" />
            <p>Editing..</p>
          </div>
        ) : (
          "Edit Restaurant"
        )}
      </Button>
    </form>
  );
};

export default EditForm;
