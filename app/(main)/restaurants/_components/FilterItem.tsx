"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = {
  link: string;
  name: string;
};

type FilterItemProps = {
  item: Item;
};

const FilterItem = ({ item: { link, name } }: FilterItemProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={link}
      className={cn(
        "flex items-center gap-x-1 text-foreground transition duration-150 ease-in-out hover:bg-primary/20 w-full font-medium opacity-80 text-lg py-4 pl-8",
        {
          "text-primary  font-bold opacity-100 border-r-[4px] border-r-primary/80":
            pathname === link || (link !== '/dashboard' && pathname.startsWith(link)),
        }
      )}
    >
      {name}
    </Link>
  );
};

export default FilterItem;
