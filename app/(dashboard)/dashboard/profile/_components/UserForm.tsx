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
    <div className="w-full max-w-3xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        <div className="border-b border-gray-100 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
          <p className="mt-1 text-sm text-gray-500">Update your account's profile information.</p>
        </div>

        <div className="space-y-6 p-6">
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

          <div className="flex items-center justify-between pt-2">
            <Button
              type="submit"
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
              disabled={Updating}
            >
              {Updating ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Save Changes
            </Button>

            <Link
              href="/dashboard/profile/change-password"
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline flex items-center gap-1.5"
            >
              Change Password
              <Key className="h-3.5 w-3.5 text-gray-400" />
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserForm