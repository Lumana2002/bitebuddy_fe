"use client"
import UserForm from './_components/UserForm';
import { useSession } from 'next-auth/react';
import React from 'react'

const page = () => {
    const session = useSession();
    return (

        <section className="mt-20 mx-[20px] md:mx-[40px] 2xl:mx-[80px] max-md:flex-wrap flex flex-col gap-y-10 justify-start mb-20">
            <h2 className="text-[1.3rem] vsm:text-[1.5rem] font-semibold opacity-80 underline underline-offset-2">
                Welcome, {session?.data?.user?.firstName} {session?.data?.user?.lastName}
            </h2>

            <div className="flex flex-col gap-y-2">
                <h3 className="font-bold flex items-center gap-x-2 pl-2 opacity-80 text-lg">
                    User Details
                </h3>
                <UserForm
                    id={session?.data?.user?.id || 0}
                    token={session?.data?.user?.access_token || ""}
                />
            </div>
        </section>
    );
};
export default page