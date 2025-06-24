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
import { useParams, useRouter } from "next/navigation";
import { FoodSchema, TFood } from "@/schemas/foodSchema";
import { addFoodToMenu, createFood, updateFood } from "@/apicalls/food";
import { useGetRestaurantUser } from "@/hooks/restaurantsQueries";


const EditFoodForm = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const session = useSession();
    const { id: id } = useParams()
    const { data: restaurantData, isPending: isLoading } = useGetRestaurantUser(session?.data?.user.id, session?.data?.user?.access_token);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<TFood>({
        resolver: zodResolver(FoodSchema),
        mode: "onChange",
    });

    const { mutate, isPending } = useMutation({
        mutationFn: addFoodToMenu,
        onSettled(apiData: any) {
            console.log(apiData)
            if (apiData?.status === 204) {
                queryClient.invalidateQueries({ queryKey: ["foods"] });
                toast.success("Food Created Successfully");
                reset();
                router.push(`/restaurantDashboard/menus/${id}`);
            }
            if (apiData.response.status === 422) {
                toast.error("Please fill all the required Fields");
            }
        },
    });

    const onSubmit = (data: TFood) => {
        const modifiedData = {
            id: Number(id),
            restaurantId: restaurantData?.restaurantId,
            body: {
                ...data,
                price: Number(data.price),
                spiceLevel: Number(data.spiceLevel),
            },
            token: session?.data?.user?.access_token,
        };
        console.log(modifiedData)
        console.log(modifiedData.body)
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
            <InputBox<TFood>
                name="name"
                id="name"
                placeholder="Enter Food Name..."
                register={register}
                error={(errors && errors?.name?.message?.toString()) || ""}
                desc="enter the name of food"
                label="Food's Name *"
            />
            <InputBox<TFood>
                name="category"
                id="category"
                placeholder="Enter Food Category..."
                register={register}
                error={(errors && errors?.category?.message?.toString()) || ""}
                desc="enter the category of food"
                label="Food's Category *"
            />

            <InputBox<TFood>
                name="spiceLevel"
                id="spiceLevel"
                placeholder="Enter Food's Spice Level (1-5)..."
                register={register}
                error={(errors && errors?.spiceLevel?.message?.toString()) || ""}
                desc="enter the spice level of food"
                label="Food's Spiciness *"
            />

            <InputBox<TFood>
                name="price"
                id="price"
                placeholder="Enter Food Price..."
                register={register}
                error={(errors && errors?.price?.message?.toString()) || ""}
                desc="enter the price of food"
                label="Food's Price *"
            />


            <Button type="submit" className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium  rounded-md  border-r-0 ">
                {isPending ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="size-5 animate-spin" />
                        <p>Creating..</p>
                    </div>
                ) : (
                    "Create Food"
                )}
            </Button>
        </form>
    );
};

export default EditFoodForm;
