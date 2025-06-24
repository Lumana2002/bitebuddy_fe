"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Loader2, Trash } from "lucide-react";
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
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useGetAllMenuFoods } from "@/hooks/foodQueries";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFood } from "@/apicalls/food";
import Pagination from "@/components/Pagination";


const FoodsTable = () => {
    const queryClient = useQueryClient();
    const session = useSession();
    const [page, setPage] = useState<number>(1);
    const { id: id } = useParams();

    console.log(id)
    const { data: foodData, isPending } = useGetAllMenuFoods(Number(id), page);


    const { mutate, isPending: Deleting } = useMutation({
        mutationFn: deleteFood,
        onSuccess() {
            toast.success("User Deleted Successfully");
            queryClient.invalidateQueries({ queryKey: ["foods", page] });
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
        { length: foodData?.totalPages ?? 1 }, // page should be last_page
        (_, index) => index + 1
    );


    console.log(foodData)

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
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Spice Level
                            </th>
                            <th scope="col" className="pl-6 py-3 pr-14 text-end">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="w-full opacity-80">
                        {foodData?.content?.map(
                            ({ foodId, name, category, price,spiceLevel }: any) => (
                                <tr
                                    key={foodId}
                                    className={cn(
                                        "text-sm border-b odd:bg-white even:bg-gray-50"
                                    )}
                                >
                                    <td
                                        scope="row"
                                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                    >
                                        {foodId}
                                    </td>
                                    <td
                                        scope="row"
                                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                    >
                                        {name}
                                    </td>
                                    <td
                                        scope="row"
                                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                    >
                                        {category}
                                    </td>
                                    <td
                                        scope="row"
                                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                    >
                                        {price}
                                    </td>
                                    <td
                                        scope="row"
                                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                    >
                                        {spiceLevel}
                                    </td>
                                    <td
                                        scope="row"
                                        className="flex justify-end whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white gap-2"
                                    >

                                        <Link href={`/restaurantDashboard/menus/${id}/foods/${foodId}`}>
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
                                                        onClick={() => handleDelete(foodId)}
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

            {!foodData && !isPending && (
                <h3 className="w-full text-destructive font-bold text-center py-4">
                    Something went wrong.
                </h3>
            )}

            {foodData?.content?.length === 0 && (
                <h3 className="w-full text-destructive font-bold text-center py-4">
                    Currently, no menu items found.
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
                <Button onClick={nextPage} disabled={page === foodData?.totalPages}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default FoodsTable;
