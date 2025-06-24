"use client";

import Loading from "@/components/Loading";
import InputBox from "@/components/InputBox";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ImageUpload from "../_components/ImageUpload";
import { useRouter } from "next/navigation";
import { useGetUserDetails } from "@/hooks/usersQueries";
import { TUser, UserSchema } from "@/schemas/profileSchema";
import { updateUserDetails } from "@/apicalls/users";

type EditProps = {
  id: string;
  fromProfilePage?: boolean;
};

const EditForm: React.FC<EditProps> = ({ id, fromProfilePage = false }) => {
  const router = useRouter();
  const session = useSession();
  const queryClient = useQueryClient();
  console.log(`User ID: ${Number(id)}`)
  console.log(`Admin Token: ${session?.data?.user?.access_token}`)
  const { data: userData, isPending } = useGetUserDetails(Number(id), session?.data?.user?.access_token);

  console.log(userData)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TUser>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      contact: userData?.contact?.toString(),
      role: userData?.role?.toString(),
      image: userData?.image?.toString(),
    },
  });


  useEffect(() => {
    if (userData) {
      setValue("firstName", userData?.firstName || "");
      setValue("lastName", userData?.lastName || "");
      setValue("email", userData?.email || "");
      setValue(
        "contact",
        userData?.contact?.toString()
      );
      setValue("image", userData?.image?.toString());
      setValue("role", userData?.role?.toString());
    }
  }, [userData, setValue]);

  const { mutate, isPending: Updating } = useMutation({
    mutationFn: updateUserDetails,
    onSettled(data: any) {
      if (data.status === 200) {
        if (!fromProfilePage) {
          queryClient.invalidateQueries({ queryKey: ["user", id] });
          queryClient.invalidateQueries({ queryKey: ["users"] });
          toast.success("User Updated Successfully");
          reset();
          router.push("/dashboard/users");
        } else {
          toast.success("User Details Updated Successfully");
          queryClient.invalidateQueries({ queryKey: ["user"] });
          queryClient.invalidateQueries({ queryKey: ["users", id] });
        }
      }

      if (data.response.status === 422) {
        toast.error("Please fill all the required fields.");
      } else {
        toast.error("Failed to update user, Something went wrong.");
      }
    },
  });

  const onSubmit = (data: TUser) => {
    const modifiedData = {
      id: Number(id),
      data: {
        ...data,
      },
      token: session?.data?.user?.access_token,
    };

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
      <InputBox<TUser>
        name="firstName"
        id="firstName"
        placeholder="Enter First Name..."
        register={register}
        error={(errors && errors?.firstName?.message?.toString()) || ""}
        desc="enter the first name of user"
        label="User's First Name *"
      />

      <InputBox<TUser>
        name="lastName"
        id="lastName"
        placeholder="Enter Last Name..."
        register={register}
        error={(errors && errors?.lastName?.message?.toString()) || ""}
        desc="enter the last name of user"
        label="User's Last Name *"
      />

      <InputBox<TUser>
        name="email"
        id="email"
        placeholder="Enter Email..."
        register={register}
        error={(errors && errors?.email?.message?.toString()) || ""}
        desc="enter the email of user"
        label="User's Email *"
      />

      <InputBox<TUser>
        name="contact"
        id="contact"
        placeholder="Enter Contact Information..."
        register={register}
        error={
          (errors && errors?.contact?.message?.toString()) || ""
        }
        desc="enter the contact of user"
        label="User's Contact *"
      />

      <InputBox<TUser>
        name="role"
        id="role"
        placeholder="Enter role..."
        register={register}
        error={(errors && errors?.role?.message?.toString()) || ""}
        desc="enter the role of user"
        label="User's role *"
      />

      {/* Optional Fields  */}

      <ImageUpload
        control={control}
        errors={errors}
        defImg={userData?.image?.split("/")[1]}
      />


      {/* Form Submission */}
      {/* Form Submission */}
      <Button type="submit" className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium  rounded-md  border-r-0 ">
        {isPending ? (
          <div className="flex items-center gap-2">
            <Loader2 className="size-5 animate-spin" />
            <p>Editing..</p>
          </div>
        ) : (
          "Edit User"
        )}
      </Button>
    </form>
  );
};

export default EditForm;
