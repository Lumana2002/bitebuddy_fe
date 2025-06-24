"use client"
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "./list/sidebarLinks";
import SidebarItem from "./SidebarRestItem";
import logo from "@/public/assets/logo.png";
import { auth } from "@/auth";
import LogoutBtn from "@/components/LogoutBtn";
import { useSession } from "next-auth/react";
import { useGetRestaurantUser } from "@/hooks/restaurantsQueries";

const SidebarRest = () => {
  const session = useSession();
  const { data, isPending } = useGetRestaurantUser(session?.data?.user.id, session?.data?.user?.access_token);

  return (
    <aside className="custom-scrollbar hidden py-10 fixed left-0 top-0 h-screen overflow-y-auto w-[250px] bg-gray-100 text-background lg:flex flex-col items-start gap-y-14 border-r border-r-primary">
      <Link href={"/"} className="px-8">
        <Image
          src={data?.image || logo}
          width={200}
          height={200}
          alt="Restaurant Logo"
          className="my-auto rounded-full w-[120px] h-[120px] object-cover"
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

export default SidebarRest;
