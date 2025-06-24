"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import ChangePasswordForm from "../_components/ChangePasswordForm";
import { useSession } from "next-auth/react";

const Page = () => {
  const session = useSession();
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex items-center gap-x-3">
        <Link href={"/dashboard/profile"}>
          <ChevronLeft className="size-9 opacity-80 p-1 rounded-full hover:bg-neutral-300 transition" />
        </Link>
        <h2 className="text-[1.3rem] vsm:text-[1.5rem] font-bold opacity-80">
          Change Password
        </h2>
      </div>

      <ChangePasswordForm token={session?.data?.user?.access_token} />
    </div>
  );
};

export default Page;
