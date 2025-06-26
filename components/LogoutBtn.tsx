"use client";

import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { logoutUser } from "@/lib/actions";
import { Button } from "@/components/ui/button";

const LogoutBtn = () => {
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
        <Button className="bg-amber-500 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 hover:bg-amber-600 hover:shadow-xl">
          <LogOut className="size-6" strokeWidth={3} />
          &nbsp; Logout
        </Button>
      </form>
    );
  }

  return;
};

export default LogoutBtn;
