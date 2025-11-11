"use client";
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
import Image from "next/image";


const FoodsTable = () => {
    const queryClient = useQueryClient();
    const session = useSession();
    const [page, setPage] = useState<number>(1);
    const { id: id } = useParams();

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
                            <th scope="col" className="px-4 py-3 text-left">
                                Price
                            </th>
                            <th scope="col" className="px-4 py-3 text-left">
                                Category
                            </th>
                            <th scope="col" className="px-4 py-3 text-left">
                                Spice Level
                            </th>
                            <th scope="col" className="px-4 py-3 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white/80 divide-y divide-gray-100">
                        {foodData?.content?.map(({ image, foodId, name, price, category, spiceLevel }: any) => (
                            <tr key={foodId} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {image ? (
                                        <div className="relative flex size-[50px] flex-col  rounded-full">
                                            <Image
                                                src={image}
                                                fill
                                                alt=""
                                                className=" object-cover rounded-full border border-input"
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative flex size-[50px] flex-col rounded-full">
                                            <Image
                                                src="/assets/img-placeholder.png"
                                                alt={name}
                                                width={50}
                                                height={50}
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {foodId}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {name}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    ${price?.toFixed(2)}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {category}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {spiceLevel}
                                </td>
                                <td className="px-4 py-3 text-right text-sm">
                                    <div className="flex justify-end space-x-2">
                                        <Link href={`/restaurantDashboard/menus/${id}/foods/${foodId}`}>
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
                                                    className="text-gray-500 hover:text-amber-600"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you sure you want to delete this food item?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the food item.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDelete(foodId)}
                                                        className="bg-amber-600 hover:bg-amber-700"
                                                    >
                                                        {Deleting ? (
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        ) : null}
                                                        Delete
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

            {!foodData && !isPending && (
                <h3 className="w-full text-amber-600 font-bold text-center py-4">
                    Something went wrong.
                </h3>
            )}

            {foodData?.content?.length === 0 && (
                <h3 className="w-full text-amber-600 font-bold text-center py-4">
                    Currently, no foods found.
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
