import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "./list/sidebarLinks";
import SidebarItem from "./SidebarItem";
import logo from "@/public/assets/logo.png";
import { Role } from "@/next-auth";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";
import { LogOut } from "lucide-react";
import LogoutBtn from "@/components/LogoutBtn";

const Sidebar = async () => {
  const session = await auth();
  const userRole = session?.user?.role;

  return (
    <aside className="custom-scrollbar hidden py-10 fixed left-0 top-0 h-screen overflow-y-auto w-[250px] bg-gray-100 text-background lg:flex flex-col items-start gap-y-14 border-r border-r-primary">
      <Link href={"/"} className="px-8">
        <Image
          src={logo}
          width={200}
          height={200}
          alt="BiteBuddy Logo"
          className="my-auto w-[80px]"
        />
      </Link>
      <div className="w-full flex flex-col gap-y-5 flex-grow">
        <div className="w-full flex flex-col gap-1">
          {sidebarLinks.map((sideItem, index) => (
            <SidebarItem key={index} item={sideItem} />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center px-4">
        <LogoutBtn />
      </div>
    </aside>
  );
};

export default Sidebar;
