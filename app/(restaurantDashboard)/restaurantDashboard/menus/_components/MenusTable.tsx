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
    <div className="w-full relative overflow-hidden border border-gray-200 rounded-lg mb-10 bg-gray-50/30">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-sm text-gray-500">
              <th scope="col" className="px-4 py-3 text-left">
                ID
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Name
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white/80 divide-y divide-gray-100">
            {menuData?.content?.map(({ menuId, name }: any) => (
              <tr key={menuId} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-700">
                  {menuId}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {name}
                </td>
                <td className="px-4 py-3 text-right text-sm">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/restaurant-dashboard/menus/${menuId}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPending && (
        <div className="mb-3 mt-6 w-full flex items-center justify-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      )}

      {!menuData && !isPending && (
        <h3 className="w-full text-amber-600 font-bold text-center py-4">
          Something went wrong.
        </h3>
      )}

      {menuData?.content?.length === 0 && (
        <h3 className="w-full text-amber-600 font-bold text-center py-4">
          Currently, no menus found.
        </h3>
      )}
    </div>
  );
};

export default MenusTable;
