"use client";

import { cn } from "@/lib/utils";
import { useGetAllRestaurants } from "@/hooks/restaurantsQueries";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Loader2, Trash, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRestaurant } from "@/apicalls/restaurant";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Pagination from "@/components/Pagination";

const RestaurantsTable = () => {
  const queryClient = useQueryClient();
  const session = useSession();
  const [page, setPage] = useState<number>(1);

  const { data: restaurantData, isPending } = useGetAllRestaurants(page);

  const { mutate, isPending: Deleting } = useMutation({
    mutationFn: deleteRestaurant,
    onSuccess() {
      toast.success("Restaurant Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["restaurants", page] });
    },
    onError() {
      toast.error("Something went wrong, Try again Later");
    },
  });

  const handleDelete = (id: number) => {
    const data = { id, token: session?.data?.user?.access_token };
    mutate(data);
  };

  const prevPage = () => setPage(page! - 1);
  const nextPage = () => setPage(page! + 1);
  const pagesArray = Array.from(
    { length: restaurantData?.totalPages ?? 1 }, // page should be last_page
    (_, index) => index + 1
  );

  return (
    <div className="w-full relative overflow-hidden border border-gray-200 rounded-lg mb-10">
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
              <th scope="col" className="px-4 py-3 text-left">
                Email
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Contact
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Cuisine
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {restaurantData?.content?.map(
              ({ restaurantId, name, email, contact, cuisine, address, status }: any) => (
                <tr key={restaurantId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {restaurantId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {contact}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {cuisine}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                      status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/dashboard/restaurants/edit_restaurant/${restaurantId}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the Intructor.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="hover:text-background">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(restaurantId)}
                            className="bg-red-400 hover:bg-red-500 "
                          >
                            {Deleting ? (
                              <div className="flex items-center gap-x-2">
                                <Loader2 className="size-5 animate-spin" />{" "}
                                Deleting...
                              </div>
                            ) : (
                              "Delete"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    </div>
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

      {!restaurantData && !isPending && (
        <h3 className="w-full text-destructive font-bold text-center py-4">
          Something went wrong.
        </h3>
      )}

      {restaurantData?.content?.length === 0 && (
        <h3 className="w-full text-destructive font-bold text-center py-4">
          Currently, no restaurants found.
        </h3>
      )}

      <div className="mt-5 w-full flex items-center gap-x-2 justify-end p-4 place-self-end justify-self-end">
        <Button
          onClick={prevPage}
          disabled={page === 1}
        >
          Prev
        </Button>
        <Pagination
          pages={pagesArray.length}
          currentPage={page}
          onPageChange={(pg) => setPage(pg)}
          pending={isPending}
        />
        <Button
          onClick={nextPage}
          disabled={page === restaurantData?.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RestaurantsTable;
