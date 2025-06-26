"use client"

import InputBox from "@/components/InputBox"
import { Button } from "@/components/ui/button"
import { useGetUserDetails } from "@/hooks/usersQueries"
import { type TUser, UserSchema } from "@/schemas/profileSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, User, Key, Save } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { updateUserDetails } from "@/apicalls/users"
import Link from "next/link"
import toast from "react-hot-toast"

type Props = {
  id: number
  token: string
}

const UserForm = ({ id, token }: Props) => {
  const { data, isPending } = useGetUserDetails(id, token)
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
      role: data?.role,
    },
  })

  useEffect(() => {
    if (data) {
      setValue("firstName", data?.firstName)
      setValue("lastName", data?.lastName)
      setValue("email", data?.email)
      setValue("contact", data?.contact || "")
      setValue("role", data?.role)
    }
  }, [data, setValue])

  const { mutate, isPending: Updating } = useMutation({
    mutationFn: updateUserDetails,

    onSettled(data: any) {
      if (data.status === 200) {
        toast.success("User Detail Updated Successfully.")
      }

      if (data.response.status === 422) {
        toast.error("Invalid input please check again.")
      } else {
        toast.error("Something went wront, Try again later.")
      }
    },
  })

  const onSubmit = (data: TUser) => {
    console.log(data)
    const modifiedData = {
      data,
      id,
      token,
    }
    mutate(modifiedData)
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full">
            <User className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-600 mt-1">Update user information</p>
          </div>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"></div>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden w-full"
      >
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2"></div>

        <div className="flex flex-col gap-y-8 py-10 px-5 vsm:px-14">
          <InputBox<TUser>
            name="firstName"
            id="firstName"
            placeholder="Enter First Name..."
            register={register}
            error={(errors && errors?.firstName?.message?.toString()) || ""}
            desc="enter the first name."
            label="First Name"
          />

          <InputBox<TUser>
            name="lastName"
            id="lastName"
            placeholder="Enter Last Name..."
            register={register}
            error={(errors && errors?.lastName?.message?.toString()) || ""}
            desc="enter the last name."
            label="Last Name"
          />

          <InputBox<TUser>
            name="email"
            id="email"
            placeholder="Enter Email..."
            register={register}
            error={(errors && errors?.email?.message?.toString()) || ""}
            desc="enter the email."
            label="Email"
          />

          <InputBox<TUser>
            name="contact"
            id="contact"
            placeholder="Enter Contact..."
            register={register}
            error={(errors && errors?.contact?.message?.toString()) || ""}
            desc="enter the contact."
            label="Contact"
          />

          <div className="flex flex-col vvsm:flex-row gap-10">
            <Link
              href={"/profile/change-password"}
              className="text-primary transition underline underline-offset-2 font-semibold"
            >
              <Button
                type="button"
                className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium rounded-md border-r-0 bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-300"
              >
                <Key className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </Link>

            <Button
              type="submit"
              className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium rounded-md border-r-0 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
            >
              {Updating ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  <p>Updating..</p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  <span>Update User Details</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserForm
