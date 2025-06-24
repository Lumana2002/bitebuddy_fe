"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useGetRestaurantMenus } from "@/hooks/menusQueries";
import { useGetRestaurantUser } from "@/hooks/restaurantsQueries";


const MenusTable = () => {
  const session = useSession();
  const [page, setPage] = useState<number>(1);

  const { data: restaurantData, isPending: Loading } = useGetRestaurantUser(session?.data?.user.id, session?.data?.user?.access_token);
  console.log(restaurantData)
  const { data: menuData, isPending } = useGetRestaurantMenus(restaurantData?.restaurantId, page);


  return (
    <div className="w-full relative overflow-hidden rounded-md shadow border border-input mb-10">
      <div className="w-full table-wrapper overflow-x-auto">
        <table className="min-w-[700px] relative w-full text-left">
          <thead className="border-b bg-gray-50 uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="pl-6 py-3 pr-14 text-end">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="w-full opacity-80">
            {menuData?.content?.map(
              ({ menuId, name }: any) => (
                <tr
                  key={menuId}
                  className={cn(
                    "text-sm border-b odd:bg-white even:bg-gray-50"
                  )}
                >
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {menuId}
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {name}
                  </td>
                  <td
                    scope="row"
                    className="flex justify-end whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white gap-2"
                  >

                    <Link href={`/restaurantDashboard/menus/${menuId}`}>
                      <Button
                        variant={"secondary"}
                        size={"icon"}
                        className="text-background"
                      >
                        <Edit className="size-5" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {isPending && (
        <div className="mb-3 mt-6 w-full flex items-center justify-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      )}

      {!menuData && !isPending && (
        <h3 className="w-full text-destructive font-bold text-center py-4">
          Something went wrong.
        </h3>
      )}

      {menuData?.content?.length === 0 && (
        <h3 className="w-full text-destructive font-bold text-center py-4">
          Currently, no menus found.
        </h3>
      )}
    </div>
  );
};

export default MenusTable;
