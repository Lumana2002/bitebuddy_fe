"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputBox from "@/components/InputBox";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRestaurant } from "@/apicalls/restaurant";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TRestaurant, RestaurantSchema } from "@/schemas/restaurantSchema";
import msgIcon from "@/public/assets/msg.png"
import Image from "next/image";
import TextAreaBox from "@/components/TextAreaBox";

const RestaurantForm = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const session = useSession();


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<TRestaurant>({
        resolver: zodResolver(RestaurantSchema),
        mode: "onChange",
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createRestaurant,
        onSettled(apiData: any) {
            console.log(apiData)
            if (apiData?.status === 201) {
                queryClient.invalidateQueries({ queryKey: ["restaurants"] });
                toast.success("Your request has been sent");
                reset();
                router.push("/contact");
            }
            if (apiData.response.status === 422) {
                toast.error("Please fill all the required Fields");
            }
        },
    });


    const onSubmit = async (data: TRestaurant) => {
        const { status, ...resData } = data
        console.log(data)
        const restaurantData = {
            data: { ...resData, status: "inactive" },
            token: session?.data?.user?.access_token
        };
        mutate(restaurantData);
    }


    return (
        <div className="rounded-lg border border-input shadow">
            <div className="flex items-center gap-3 bg-zinc-50 p-4 md:p-8  rounded-lg">
                <Image src={msgIcon} width={44} height={64} alt="message us" />
                <p className="text-sm font-semibold">
                    Write us a few words about your restaurant and we’ll get back
                    to you within 24 hours
                </p>
            </div>
            <h3 className="font-semibold text-lg pl-2 mx-5 my-6">
                Required Information
            </h3>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-8 pb-10 px-5 vsm:px-14 "
            >

                <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                    {/* Required Fields  */}
                    <InputBox<TRestaurant>
                        name="name"
                        id="name"
                        placeholder="Restaurant's Name*"
                        register={register}
                        error={(errors && errors?.name?.message?.toString()) || ""}
                        desc="enter the restaurant's name"
                    />
                    <InputBox<TRestaurant>
                        name="email"
                        id="email"
                        placeholder="Restaurant's Email*"
                        register={register}
                        error={(errors && errors?.email?.message?.toString()) || ""}
                        desc="enter the restaurant's email"
                    />
                </div>
                <div className="gap-8 grid-cols-1 grid md:grid-cols-2">
                    <InputBox<TRestaurant>
                        name="contact"
                        id="contact"
                        placeholder="Restaurant's Contact*"
                        register={register}
                        error={(errors && errors?.contact?.message?.toString()) || ""}
                        desc="enter the restaurant's contact"
                    />

                    <InputBox<TRestaurant>
                        name="cuisine"
                        id="cuisine"
                        placeholder="Restaurant's Cuisine*"
                        register={register}
                        error={(errors && errors?.cuisine?.message?.toString()) || ""}
                        desc="enter the restaurant's cuisine"

                    />
                </div>
                <TextAreaBox<TRestaurant>
                    name="description"
                    id="description"
                    placeholder="Restaurant's Description*"
                    register={register}
                    error={(errors && errors?.description?.message?.toString()) || ""}
                    desc="enter the restaurant's description"

                />
                {/* Form Submission */}
                <Button type="submit" className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium  rounded-md  border-r-0 ">
                    {isPending ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="size-5 animate-spin" />
                            <p>Sending Request..</p>
                        </div>
                    ) : (
                        "Send Request"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default RestaurantForm;
