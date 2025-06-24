import { LogOut } from "lucide-react";
import React from "react";
import DashboardMenu from "./DashboardRestMenu";
import { auth, signOut } from "@/auth";

const TopRestBar = async () => {
  const session = await auth();

  return (
    <div className="lg:ml-[15.65rem] py-4 px-4 md:px-10 shadow flex justify-between items-center">
      <div className="flex items-center gap-3">
        <DashboardMenu />
      </div>

      <div className="flex items-center gap-x-5">
        <div className="size-[40px] flex items-center justify-center rounded-full bg-gray-100  text-foreground text-lg font-semibold">
          {session?.user?.firstName?.charAt(0)}
        </div>
      </div>
    </div>
  );
};

export default TopRestBar;
