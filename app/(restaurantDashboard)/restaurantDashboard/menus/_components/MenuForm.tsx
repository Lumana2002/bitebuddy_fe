"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputBox from "@/components/InputBox";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMenu } from "@/apicalls/menu";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TMenu, MenuSchema } from "@/schemas/menuSchema";
import { useGetRestaurantUser } from "@/hooks/restaurantsQueries";


const MenuForm = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const session = useSession();

    const { data: restaurantData, isPending: Loading } = useGetRestaurantUser(session?.data?.user.id, session?.data?.user?.access_token);


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<TMenu>({
        resolver: zodResolver(MenuSchema),
        mode: "onChange",
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createMenu,
        onSettled(apiData: any) {
            console.log(apiData)
            if (apiData?.status === 201) {
                queryClient.invalidateQueries({ queryKey: ["menus"] });
                toast.success("Menu Created Successfully");
                reset();
                router.push("/restaurantDashboard/menus");
            }
            if (apiData.response.status === 422) {
                toast.error("Please fill all the required Fields");
            }
        },
    });

    const onSubmit = async (data: TMenu) => {
        const menuBody = {
            name: data.name,
            restaurant: {
                restaurantId: restaurantData?.restaurantId,
            }
        };

        const token = session?.data?.user?.access_token;

        const menuData = {
            restaurantId: restaurantData?.restaurantId,
            body: menuBody,
            token: token,
        };

        console.log(menuData);
        mutate(menuData);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-8 py-10 px-5 vsm:px-14 rounded-lg border border-input shadow"
        >
            {/* Required Fields  */}
            <InputBox<TMenu>
                name="name"
                id="name"
                placeholder="Enter Menu's Name..."
                register={register}
                error={(errors && errors?.name?.message?.toString()) || ""}
                desc="enter the menu's name"
                label="Menu's Name *"
            />

            {/* Form Submission */}
            <Button type="submit" className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium text-white rounded-md  border-r-0 ">
                {isPending ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="size-5 animate-spin" />
                        <p>Creating..</p>
                    </div>
                ) : (
                    "Create Menu"
                )}
            </Button>
        </form>
    );
};

export default MenuForm;
