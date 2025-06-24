"use client";

import { AtSign, CircleUserRound, KeyRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRegister, registerSchema } from "@/schemas/authSchema";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/apicalls/users";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SignupForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TRegister>({
        resolver: zodResolver(registerSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: registerUser,
        onSettled(data: any) {
            if (data.status === 200) {
                toast.success("Register Successfull");
                router.push("/login");
            } else {
                toast.error("Something went wrong, Try again Later");
            }
        },
    });

    const onSubmit = (data: TRegister) => {
        const { confirm_password, ...modifiedData } = data;
        mutate(modifiedData);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative w-[500px] mx-auto flex flex-col justify-center gap-y-10 rounded-lg bg-gray-50 px-14 pb-4 pt-8 border border-input"
        >
            <h1 className="text-2xl text-primary font-bold opacity-80">
                Create An Account
            </h1>
            <div className="flex flex-col gap-y-4 w-full text-gray-500">
                <div>
                    <Label htmlFor="name">First Name</Label>
                    <div className="relative flex flex-col gap-y-1">
                        <Input
                            {...register("firstName")}
                            className={cn("pl-10 py-5", {
                                "border-primary": errors?.firstName?.message,
                            })}
                            id="firstName"
                            type="text"
                            name="firstName"
                            placeholder="Enter your First name"
                        />
                        <CircleUserRound className="pointer-events-none absolute top-[0.7rem] left-3 size-5 text-gray-500 peer-focus:text-gray-900" />
                        {errors?.firstName?.message && (
                            <span className="text-destructive text-xs font-semibold">
                                {errors?.firstName?.message}
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <Label htmlFor="name">Last Name</Label>
                    <div className="relative flex flex-col gap-y-1">
                        <Input
                            {...register("lastName")}
                            className={cn("pl-10 py-5", {
                                "border-primary": errors?.lastName?.message,
                            })}
                            id="lastName"
                            type="text"
                            name="lastName"
                            placeholder="Enter your Last name"
                        />
                        <CircleUserRound className="pointer-events-none absolute top-[0.7rem] left-3 size-5 text-gray-500 peer-focus:text-gray-900" />
                        {errors?.lastName?.message && (
                            <span className="text-destructive text-xs font-semibold">
                                {errors?.lastName?.message}
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative flex flex-col gap-y-1">
                        <Input
                            {...register("email")}
                            className={cn("pl-10 py-5", {
                                "border-primary": errors?.email?.message,
                            })}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                        />
                        <AtSign className="pointer-events-none absolute top-[0.7rem] left-3 size-5 text-gray-500 peer-focus:text-gray-900" />
                        {errors?.email?.message && (
                            <span className="text-destructive text-xs font-semibold">
                                {errors?.email?.message}
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative flex flex-col gap-y-1">
                        <Input
                            {...register("password")}
                            className={cn("pl-10 py-5", {
                                "border-primary": errors?.password?.message,
                            })}
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            minLength={6}
                        />
                        <KeyRound className="pointer-events-none absolute top-[0.7rem] left-3 size-5 text-gray-500 peer-focus:text-gray-900" />
                        {errors?.password?.message && (
                            <span className="text-destructive text-xs font-semibold">
                                {errors?.password?.message}
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <Label htmlFor="confirm_password">Confirm Password</Label>
                    <div className="relative flex flex-col gap-y-1">
                        <Input
                            {...register("confirm_password")}
                            className={cn("pl-10 py-5", {
                                "border-primary": errors?.confirm_password?.message,
                            })}
                            id="confirm_password"
                            type="password"
                            name="confirm_password"
                            placeholder="Enter password again"
                            minLength={6}
                        />
                        <KeyRound className="pointer-events-none absolute top-[0.7rem] left-3 size-5 text-gray-500 peer-focus:text-gray-900" />
                        {errors?.confirm_password?.message && (
                            <span className="text-destructive text-xs font-semibold">
                                {errors?.confirm_password?.message}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <Button type="submit">
                {isPending ? (
                    <span className="flex items-center gap-x-2">
                        <Loader2 className="size-5 animate-spin" /> Registering...
                    </span>
                ) : (
                    "Register"
                )}
            </Button>

            <div
                className="flex justify-center space-x-2 text-gray-600 text-sm"
                aria-live="polite"
                aria-atomic="true"
            >
                <p>Already have an account?</p>
                <Link
                    href={"/login"}
                    className="text-red-500 hover:underline transition"
                >
                    Login Instead
                </Link>
            </div>
        </form>
    );
}
