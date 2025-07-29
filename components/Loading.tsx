import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  noMargin?: boolean;
};

const Loading = ({ noMargin = false }: Props) => {
  return (
    <div
      className={cn("w-full flex items-center justify-center", {
        "mt-52 mb-3": !noMargin,
        "my-5": noMargin,
      })}
    >
      <div className="flex gap-2 justify-center items-center">
        <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default Loading;
