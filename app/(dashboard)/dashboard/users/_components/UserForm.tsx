"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputBox from "@/components/InputBox";
import { Button } from "@/components/ui/button";
import ImageUpload from "./ImageUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "@/apicalls/users";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerRestaurantSchema, TRegisterRestaurant } from "@/schemas/authSchema";


const UserForm = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const session = useSession();


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<TRegisterRestaurant>({
        resolver: zodResolver(registerRestaurantSchema),
        mode: "onChange",
    });

    const { mutate, isPending } = useMutation({
        mutationFn: registerUser,
        onSettled(apiData: any) {
            console.log(apiData)
            if (apiData?.status === 200) {
                queryClient.invalidateQueries({ queryKey: ["users"] });
                toast.success("User Created Successfully");
                reset();
                router.push("/dashboard/users");
            }
            if (apiData.response.status === 422) {
                toast.error("Please fill all the required Fields");
            }
        },
    });


    const onSubmit = (data: TRegisterRestaurant) => {
        const { confirm_password, ...modifiedData } = data;
        console.log(modifiedData)
        mutate(modifiedData);
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-8 py-10 px-5 vsm:px-14 rounded-lg border border-input shadow"
        >
            {/* Required Fields  */}
            <InputBox<TRegisterRestaurant>
                name="firstName"
                id="firstName"
                placeholder="Enter First Name..."
                register={register}
                error={(errors && errors?.firstName?.message?.toString()) || ""}
                desc="enter the first name of user"
                label="User's First Name "
            />

            <InputBox<TRegisterRestaurant>
                name="lastName"
                id="lastName"
                placeholder="Enter Last Name..."
                register={register}
                error={(errors && errors?.lastName?.message?.toString()) || ""}
                desc="enter the last name of user"
                label="User's Last Name "
            />

            <InputBox<TRegisterRestaurant>
                name="email"
                id="email"
                placeholder="Enter Email..."
                register={register}
                error={(errors && errors?.email?.message?.toString()) || ""}
                desc="enter the email of user"
                label="User's Email *"
            />

            <InputBox<TRegisterRestaurant>
                name="password"
                id="password"
                type="password"
                placeholder="Enter Password..."
                register={register}
                error={(errors && errors?.password?.message?.toString()) || ""}
                desc="enter the password of user"
                label="User's Password *"
            />
            <InputBox<TRegisterRestaurant>
                name="confirm_password"
                id="confirm_password"
                type="password"
                placeholder="Confirm Password..."
                register={register}
                error={(errors && errors?.confirm_password?.message?.toString()) || ""}
                desc="Confirm Password"
                label="Confirm Password *"
            />
            <InputBox<TRegisterRestaurant>
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

            <InputBox<TRegisterRestaurant>
                name="role"
                id="role"
                placeholder="USER, ADMIN, RESTAURANT"
                register={register}
                error={(errors && errors?.role?.message?.toString()) || ""}
                desc="enter the role of user"
                label="User's role *"
            />


            {/* Form Submission */}
            <Button type="submit" className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium  rounded-md  border-r-0 ">
                {isPending ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="size-5 animate-spin" />
                        <p>Creating..</p>
                    </div>
                ) : (
                    "Create User"
                )}
            </Button>
        </form>
    );
};

export default UserForm;
