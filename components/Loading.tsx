import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  noMargin?: boolean;
};

const Loading = ({ noMargin = false }: Props) => {
  return (
    <div
      className={cn("mb-3 w-full flex items-center justify-center", {
        "mt-52": !noMargin,
        "mt-5": noMargin,
      })}
    >
      <Loader2 className="size-24 text-secondary animate-spin" />
    </div>
  );
};

export default Loading;
