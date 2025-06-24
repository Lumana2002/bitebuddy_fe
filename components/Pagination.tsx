import React from "react";
import { Button } from "./ui/button";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  pending: boolean;
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pages,
  currentPage,
  onPageChange,
  pending,
}) => {
  const MAX_PAGES_TO_SHOW = 3;

  let startPage = 1;
  let endPage = pages;

  if (pages > MAX_PAGES_TO_SHOW) {
    if (currentPage <= MAX_PAGES_TO_SHOW) {
      endPage = MAX_PAGES_TO_SHOW;
    } else if (currentPage + 1 >= pages) {
      startPage = pages - MAX_PAGES_TO_SHOW + 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={cn("w-fit flex items-center gap-x-2")}>
      {startPage > 1 && (
        <>
          <Button
            variant={"outline"}
            onClick={() => onPageChange(1)}
            className={cn("", {
              "border hover:border-secondary hover:bg-zinc-100":
                currentPage === 1,
            })}
          >
            1
          </Button>
          <span>...</span>
        </>
      )}
      {pageNumbers.map((page) => (
        <Button
          variant={"outline"}
          key={page}
          onClick={() => onPageChange(page)}
          className={cn("border hover:border-secondary hover:bg-zinc-200", {
            "border border-secondary  bg-zinc-100": currentPage === page,
          })}
        >
          {page}
        </Button>
      ))}

      {endPage < pages && (
        <>
          {currentPage !== pages - 2 && (
            <span className="flex items-center">
              <Dot className="size-5" />
              <Dot className="size-5" />
              <Dot className="size-5" />
            </span>
          )}
          <Button
            variant={"outline"}
            onClick={() => onPageChange(pages)}
            className={cn("border hover:border-primary hover:bg-zinc-300", {
              "border border-primary bg-zinc-300": currentPage === pages,
            })}
          >
            {pages}
          </Button>
        </>
      )}
    </div>
  );
};

export default Pagination;
