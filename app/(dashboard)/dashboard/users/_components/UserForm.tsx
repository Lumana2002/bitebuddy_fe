"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import InputBox from "@/components/InputBox"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { registerUser } from "@/apicalls/users"
import { Loader2, UserPlus, User, Mail, Lock, Shield } from "lucide-react"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { registerRestaurantSchema, type TRegisterRestaurant } from "@/schemas/authSchema"

const UserForm = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const session = useSession()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TRegisterRestaurant>({
    resolver: zodResolver(registerRestaurantSchema),
    mode: "onChange",
  })

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSettled(apiData: any) {
      console.log(apiData)
      if (apiData?.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["users"] })
        toast.success("User Created Successfully")
        reset()
        router.push("/dashboard/users")
      }
      if (apiData.response.status === 422) {
        toast.error("Please fill all the required Fields")
      }
    },
  })

  const onSubmit = (data: TRegisterRestaurant) => {
    const { confirm_password, ...modifiedData } = data
    console.log(modifiedData)
    mutate(modifiedData)
  }

  return (
    <div className="w-full">

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden w-full"
      >
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2"></div>

        <div className="flex flex-col gap-y-8 py-10 px-5 vsm:px-14">
          {/* Personal Information Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-amber-500" />
              <span className="text-lg font-semibold text-gray-700">Personal Information</span>
            </div>
          </div>

          <InputBox<TRegisterRestaurant>
            name="firstName"
            id="firstName"
            placeholder="Enter First Name..."
            register={register}
            error={(errors && errors?.firstName?.message?.toString()) || ""}
            desc="enter the first name of user"
            label="User's First Name "
          />

          <InputBox<TRegisterRestaurant>
            name="lastName"
            id="lastName"
            placeholder="Enter Last Name..."
            register={register}
            error={(errors && errors?.lastName?.message?.toString()) || ""}
            desc="enter the last name of user"
            label="User's Last Name "
          />

          {/* Contact Information Section */}
          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-5 h-5 text-amber-500" />
              <span className="text-lg font-semibold text-gray-700">Contact Information</span>
            </div>
          </div>

          <InputBox<TRegisterRestaurant>
            name="email"
            id="email"
            placeholder="Enter Email..."
            register={register}
            error={(errors && errors?.email?.message?.toString()) || ""}
            desc="enter the email of user"
            label="User's Email *"
          />

          <InputBox<TRegisterRestaurant>
            name="contact"
            id="contact"
            placeholder="Enter Contact Information..."
            register={register}
            error={(errors && errors?.contact?.message?.toString()) || ""}
            desc="enter the contact of user"
            label="User's Contact *"
          />

          {/* Security Information Section */}
          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-amber-500" />
              <span className="text-lg font-semibold text-gray-700">Security Information</span>
            </div>
          </div>

          <InputBox<TRegisterRestaurant>
            name="password"
            id="password"
            type="password"
            placeholder="Enter Password..."
            register={register}
            error={(errors && errors?.password?.message?.toString()) || ""}
            desc="enter the password of user"
            label="User's Password *"
          />

          <InputBox<TRegisterRestaurant>
            name="confirm_password"
            id="confirm_password"
            type="password"
            placeholder="Confirm Password..."
            register={register}
            error={(errors && errors?.confirm_password?.message?.toString()) || ""}
            desc="Confirm Password"
            label="Confirm Password *"
          />

          {/* Role Information Section */}
          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-amber-500" />
              <span className="text-lg font-semibold text-gray-700">Role & Permissions</span>
            </div>
          </div>

          <InputBox<TRegisterRestaurant>
            name="role"
            id="role"
            placeholder="USER, RESTAURANT"
            register={register}
            error={(errors && errors?.role?.message?.toString()) || ""}
            desc="enter the role of user"
            label="User's role *"
          />

          {/* Role Information */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h4 className="font-semibold text-amber-800 mb-2">Available Roles:</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>
                • <strong>USER</strong> - Regular user with basic permissions
              </li>
              <li>
                • <strong>RESTAURANT</strong> - Restaurant owner/manager
              </li>
            </ul>
          </div>

          {/* Form Submission */}
          <div className="border-t border-gray-100 pt-8">
            <Button
              type="submit"
              disabled={isPending}
              className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium rounded-md border-r-0 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  <p>Creating..</p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Create User</span>
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
