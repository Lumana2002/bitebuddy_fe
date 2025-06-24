import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "../list/sidebarLinks";
import FilterItem from "./FilterItem";
import logo from "@/public/assets/logo.png";
import { Button } from "@/components/ui/button";


const Filter = async () => {

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
            <FilterItem key={index} item={sideItem} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filter;