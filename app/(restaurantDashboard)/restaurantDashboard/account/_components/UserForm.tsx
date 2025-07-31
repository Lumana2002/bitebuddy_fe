"use client";

import InputBox from "@/components/InputBox";
import { Button } from "@/components/ui/button";
import { useGetUserDetails } from "@/hooks/usersQueries";
import { TUser, UserSchema } from "@/schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updateUserDetails } from "@/apicalls/users";
import Link from "next/link";
import toast from "react-hot-toast";

type Props = {
  id: number;
  token: string;
};

const UserForm = ({ id, token }: Props) => {
  const { data, isPending } = useGetUserDetails(id, token);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TUser>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      contact: data?.contact || "",
      role: data?.role
    },
  });

  useEffect(() => {
    if (data) {
      setValue("firstName", data?.firstName);
      setValue("lastName", data?.lastName);
      setValue("email", data?.email);
      setValue("contact", data?.contact || "");
      setValue("role", data?.role)
    }
  }, [data, setValue]);

  const { mutate, isPending: Updating } = useMutation({
    mutationFn: updateUserDetails,

    onSettled(data: any) {
      if (data.status === 200) {
        toast.success("User Detail Updated Successfully.");
      }

      if (data.response.status === 422) {
        toast.error("Invalid input please check again.");
      } else {
        toast.error("Something went wront, Try again later.");
      }
    },
  });

  const onSubmit = (data: TUser) => {
    console.log(data)
    const modifiedData = {
      data,
      id,
      token,
    };
    mutate(modifiedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <InputBox<TUser>
          name="firstName"
          id="firstName"
          placeholder="John"
          register={register}
          error={errors?.firstName?.message?.toString() || ""}
          label="First Name"
          className="bg-gray-50 border-gray-200 focus:border-gray-400"
        />

        <InputBox<TUser>
          name="lastName"
          id="lastName"
          placeholder="Doe"
          register={register}
          error={errors?.lastName?.message?.toString() || ""}
          label="Last Name"
          className="bg-gray-50 border-gray-200 focus:border-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <InputBox<TUser>
          name="email"
          id="email"
          type="email"
          placeholder="john@example.com"
          register={register}
          error={errors?.email?.message?.toString() || ""}
          label="Email Address"
          className="bg-gray-50 border-gray-200 focus:border-gray-400"
        />

        <InputBox<TUser>
          name="contact"
          id="contact"
          placeholder="+1 (555) 000-0000"
          register={register}
          error={errors?.contact?.message?.toString() || ""}
          label="Phone Number"
          className="bg-gray-50 border-gray-200 focus:border-gray-400"
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          className="w-full sm:w-auto px-6"
          disabled={Updating}
        >
          {Updating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
