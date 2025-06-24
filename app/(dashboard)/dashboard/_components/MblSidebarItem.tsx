"use client";

import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type MblSidebarItemProps = {
  link: string;
  name: string;
};

const MblSidebarItem = ({ link, name }: MblSidebarItemProps) => {
  const pathname = usePathname();
  return (
    <SheetClose asChild>
      <Link
        href={link}
        className={cn(
          "flex items-center gap-x-1 text-foreground transition duration-150 ease-in-out hover:bg-primary/20 w-full font-medium opacity-80 text-lg py-4 pl-8",
          {
            "text-primary  font-bold opacity-100 ":
              pathname === link || (link !== '/dashboard' && pathname.startsWith(link)),
          }
        )}
      >
        {name}
      </Link>
    </SheetClose>
  );
};

export default MblSidebarItem;
