import { LogOut } from "lucide-react";
import React from "react";
import DashboardMenu from "./DashboardMenu";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

const TopBar = async () => {
  const session = await auth();
  const userInitial = session?.user?.firstName?.charAt(0) || 'U';
  
  return (
    <div className="lg:ml-[15.65rem] py-3 px-4 md:px-8 border-b border-amber-100 bg-white/80 backdrop-blur-sm flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <DashboardMenu />
      </div>

      <div className="flex items-center gap-x-3">
        <div className="size-9 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 text-base font-medium">
          {userInitial}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
