"use client";

import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { logoutUser } from "@/lib/actions";
import { Button } from "@/components/ui/button";

const LogoutBtnNav = () => {
    const session = useSession();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await logoutUser();
        if (data) {
            window.location.reload();
        }
    };

    if (session?.data?.user) {
        return (
            <form className="" onSubmit={handleSubmit}>
                <Button className="flex justify-start items-center font-semibold text-black text-sm bg-transparent hover:bg-transparent border-none w-full h-6">
                    <LogOut className="mr-2 size-4" strokeWidth={3} />
                    <span>Logout</span>
                </Button>
            </form>
        );
    }

    return;
};

export default LogoutBtnNav;
