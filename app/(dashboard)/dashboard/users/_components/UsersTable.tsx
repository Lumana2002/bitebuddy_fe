"use client";

import { cn } from "@/lib/utils";
import { useGetAllUsers } from "@/hooks/usersQueries";
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
import { deleteUser } from "@/apicalls/users";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Pagination from "@/components/Pagination";

const UsersTable = () => {
  const queryClient = useQueryClient();
  const session = useSession();
  const [page, setPage] = useState<number>(1);

  const { data: userData, isPending } = useGetAllUsers(
    page,
    session?.data?.user?.access_token
  );

  const { mutate, isPending: Deleting } = useMutation({
    mutationFn: deleteUser,
    onSuccess() {
      toast.success("User Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["users", page] });
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
    { length: userData?.totalPages ?? 1 }, // page should be last_page
    (_, index) => index + 1
  );

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
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>

              <th scope="col" className="pl-6 py-3 pr-8 text-end">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="w-full opacity-80">
            {userData?.content?.map(
              ({
                id,
                firstName,
                lastName,
                email,
                contact,
                role,
              }: any) => (
                <tr
                  key={id}
                  className={cn(
                    "text-sm border-b odd:bg-white even:bg-gray-50"
                  )}
                >
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {id}
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {firstName} {lastName}
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {email}
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {contact ? contact : '-'}
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {role}
                  </td>
                  <td
                    scope="row"
                    className="flex justify-end whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white gap-2"
                  >
                    <Link href={`/dashboard/users/edit_user/${id}`}>
                      <Button
                        variant={"secondary"}
                        size={"icon"}
                        className="text-background"
                      >
                        <Edit className="size-5" />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button size={"icon"} className="bg-destructive text-white hover:bg-destructive/80">
                          <Trash className="size-5" />
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
                            onClick={() => handleDelete(id)}
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

      {!userData && !isPending && (
        <h3 className="w-full text-destructive font-bold text-center py-4">
          Something went wrong.
        </h3>
      )}

      {userData?.content?.length === 0 && (
        <h3 className="w-full text-destructive font-bold text-center py-4">
          Currently, no users found.
        </h3>
      )}

      <div className="mt-5 w-full flex items-center gap-x-2 justify-end p-4 place-self-end justify-self-end">
        <Button onClick={prevPage} disabled={page === 1}>
          Prev
        </Button>
        <Pagination
          pages={pagesArray.length}
          currentPage={page}
          onPageChange={(pg) => setPage(pg)}
          pending={isPending}
        />
        <Button onClick={nextPage} disabled={page === userData?.totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default UsersTable;
