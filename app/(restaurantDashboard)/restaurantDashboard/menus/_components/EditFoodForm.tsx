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
import { useRouter } from "next/navigation";
import { useGetFoodDetail } from "@/hooks/foodQueries";
import { FoodSchema, TFood } from "@/schemas/foodSchema";
import { updateFood } from "@/apicalls/food";

type EditFoodFormProps = {
    id: string
    foodId: string;
};

const EditFoodForm = ({ id, foodId }: EditFoodFormProps) => {
    const router = useRouter();
    const session = useSession();
    const queryClient = useQueryClient();
    const { data: foodData, isPending } = useGetFoodDetail(Number(foodId), session?.data?.user?.access_token);
    console.log(id)

    console.log(foodData)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<TFood>({
        resolver: zodResolver(FoodSchema),
        defaultValues: {
            name: foodData?.name,
            category: foodData?.category,
            price: foodData?.price,
            spiceLevel: foodData?.spiceLevel,
        },
    });

    useEffect(() => {
        if (foodData) {
            setValue("name", foodData?.name || "");
            setValue("category", foodData?.category || "");
            setValue("price", foodData?.price || '');
            setValue("spiceLevel", foodData?.spiceLevel || '');
        }
    }, [foodData, setValue]);

    const { mutate, isPending: Updating } = useMutation({
        mutationFn: updateFood,
        onSettled(data: any) {
            if (data.status === 200) {
                toast.success("Food Details Updated Successfully");
                queryClient.invalidateQueries({ queryKey: ["food"] });
                queryClient.invalidateQueries({ queryKey: ["foods", foodId] });
                router.push(`/restaurantDashboard/menus/${id}`);
            }
            if (data.response.status === 422) {
                toast.error("Please fill all the required fields.");
            } else {
                toast.error("Failed to update food, Something went wrong.");
            }
        },
    });

    const onSubmit = (data: TFood) => {
        const modifiedData = {
            id: Number(foodId),
            data: {
                ...data,
                menuId: Number(id),
                price: Number(data.price),
                spiceLevel: Number(data.spiceLevel),
            },
            token: session?.data?.user?.access_token,
        };
        console.log(modifiedData)
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
                label="Food's price *"
            />


            <Button type="submit" className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium  rounded-md  border-r-0 ">
                {isPending ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="size-5 animate-spin" />
                        <p>Editing..</p>
                    </div>
                ) : (
                    "Edit Food"
                )}
            </Button>
        </form>
    );
};

export default EditFoodForm;
