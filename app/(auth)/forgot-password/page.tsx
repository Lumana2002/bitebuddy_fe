"use client"

import { requestResetPassword, resetPassword } from '@/apicalls/users';
import InputBox from '@/components/InputBox';
import { Button } from '@/components/ui/button';
import { TResetPassword, resetPasswordSchema } from '@/schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2, LockKeyhole } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const page = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TResetPassword>({
        resolver: zodResolver(resetPasswordSchema),
    });


    const onSubmit = async (data: TResetPassword) => {
        try {
            setLoading(true);
            await requestResetPassword(data);
            console.log(data);
            toast.success("Reset link sent to your email!");

            setTimeout(() => {
                window.location.href = '/';
            }, 3000); 
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="w-full flex items-center justify-center mt-24">
            <form
                className="w-full flex flex-col gap-y-8 bg-gray-50 justify-center items-center max-w-sm rounded-lg p-10 border border-input"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex justify-center items-center border-black border-2">
                    <LockKeyhole className="text-black w-8 h-8" />
                </div>
                <div className='flex flex-col gap-y-4 justify-center items-center'>
                    <h2 className='text-lg '>Trouble logging in?</h2>
                    <p className='text-clip text-sm opacity-80 px-2'>Enter your email and we'll send you a link <br /><span className='flex justify-center'>to get back into your account.</span></p>
                </div>
                <InputBox<TResetPassword>
                    className="w-64"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    register={register}
                    error={(errors && errors?.email?.message?.toString()) || ""}
                />

                <Button type="submit" className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium text-white rounded-md  border-r-0 ">
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="size-5 animate-spin" />
                            <p>Sending to mail...</p>
                        </div>
                    ) : (
                        "Send login link"
                    )}
                </Button>
            </form>
        </section>
    )
}

export default page