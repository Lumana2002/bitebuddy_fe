"use client";

import { useSession } from "next-auth/react";
import UserForm from "./_components/UserForm";
import { ChevronRight } from "lucide-react";

const Page = () => {
  const session = useSession();
  return (
    <section className="relative max-w-[1502px] flex flex-col gap-y-10 justify-start mb-20">
      <h2 className="text-[1.3rem] vsm:text-[1.5rem] font-semibold opacity-80 underline underline-offset-2">
        Welcome, {session?.data?.user?.firstName} {session?.data?.user?.lastName}
      </h2>

      <div className="flex flex-col gap-y-2">
        <h3 className="font-bold flex items-center gap-x-2 pl-2 opacity-80 text-lg">
          Account Details
        </h3>
        <UserForm
          id={session?.data?.user?.id || 0}
          token={session?.data?.user?.access_token || ""}
        />
      </div>
    </section>
  );
};

export default Page;
