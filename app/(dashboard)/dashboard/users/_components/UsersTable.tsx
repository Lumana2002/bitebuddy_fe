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
    <div className="w-full relative overflow-hidden border border-gray-200 rounded-lg mb-10 bg-gray-50/30">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
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
                Role
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white/80 divide-y divide-gray-100">
            {userData?.content?.map(({ id, firstName, lastName, email, contact, role }: any) => (
                <tr key={id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {firstName} {lastName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {contact || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      role === 'ADMIN' ? 'bg-blue-100 text-blue-800' : 
                      role === 'USER' ? 'bg-green-100 text-green-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/dashboard/users/edit_user/${id}`}>
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
                      <AlertDialogContent className="sm:max-w-[425px]">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete user?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete {firstName} {lastName}'s account and all associated data. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {Deleting ? (
                              <div className="flex items-center gap-x-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Deleting...
                              </div>
                            ) : (
                              'Delete'
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
