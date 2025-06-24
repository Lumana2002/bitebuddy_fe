"use client";

import Loading from "@/components/Loading";
import InputBox from "@/components/InputBox";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useGetMenuDetail } from "@/hooks/menusQueries";
import { TMenu, MenuSchema } from "@/schemas/menuSchema";
import { updateMenu } from "@/apicalls/menu";

type EditProps = {
    id: string;
};

const EditForm: React.FC<EditProps> = ({ id }) => {
    const router = useRouter();
    const session = useSession();
    const queryClient = useQueryClient();

    const { data: menuData, isPending } = useGetMenuDetail(Number(id), session?.data?.user?.access_token);

    console.log(menuData)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<TMenu>({
        resolver: zodResolver(MenuSchema),
        defaultValues: {
            name: menuData?.name,
        },
    });


    useEffect(() => {
        if (menuData) {
            setValue("name", menuData?.name || "");
        }
    }, [menuData, setValue]);

    // const { mutate, isPending: Updating } = useMutation({
    //     mutationFn: updateMenu,
    //     onSettled(data: any) {
    //         if (data.status === 200) {
    //                 toast.success("Menu Details Updated Successfully");
    //                 queryClient.invalidateQueries({ queryKey: ["menu"] });
    //                 queryClient.invalidateQueries({ queryKey: ["menus", id] });
    //             }
    //         if (data.response.status === 422) {
    //             toast.error("Please fill the required field.");
    //         } else {
    //             toast.error("Failed to update Menu, Something went wrong.");
    //         }
    //     },
    // });

    // const onSubmit = (data: TMenu) => {
    //     const modifiedData = {
    //         id: Number(id),
    //         data: {
    //             ...data,
    //         },
    //         token: session?.data?.user?.access_token,
    //     };

    //     mutate(modifiedData);
    // };

    if (isPending) {
        return <Loading />;
    }

    return (
        <form
            // onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-8 py-10 px-5 vsm:px-14 rounded-lg border border-input shadow"
        >
            {/* Required Fields  */}
            <InputBox<TMenu>
                name="name"
                id="name"
                placeholder="Enter Menu Name..."
                register={register}
                error={(errors && errors?.name?.message?.toString()) || ""}
                desc="enter the name of Menu"
                label="Menu's Name *"
            />


            <Button type="submit" className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium  rounded-md  border-r-0 ">
                {isPending ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="size-5 animate-spin" />
                        <p>Editing..</p>
                    </div>
                ) : (
                    "Edit Menu"
                )}
            </Button>
        </form>
    );
};

export default EditForm;
