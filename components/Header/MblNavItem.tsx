"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MblNavItemProps = {
  name: string;
  href: string;
};

const MblNavItem = ({ name, href }: MblNavItemProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center py-3 text-foreground xl:text-[1rem] opacity-80 hover:opacity-100 transition duration-150",
        {
          "text-red-600 opacity-100 font-semibold": pathname === href,
        }
      )}
    >
      {name}
    </Link>
  );
};

export default MblNavItem;
