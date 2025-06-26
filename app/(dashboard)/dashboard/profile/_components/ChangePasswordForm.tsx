"use client"

import InputBox from "@/components/InputBox"
import { Button } from "@/components/ui/button"
import { type TChangePass, changePassSchema } from "@/schemas/profileSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Lock, Shield } from "lucide-react"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { changePassword } from "@/apicalls/users"
import toast from "react-hot-toast"

type Props = {
  token: string | undefined
}

const ChangePasswordForm = ({ token }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TChangePass>({
    resolver: zodResolver(changePassSchema),
  })

  const { mutate, isPending: Updating } = useMutation({
    mutationFn: changePassword,
    onSettled(data: any) {
      if (data.status === 200) {
        toast.success("Password Changed Successfully")
      }

      if (data.response.status === 422) {
        if (data.response.data.message === "Incorrect/Invalid password") {
          toast.error("Invalid Password.")
        } else {
          toast.error("Invalid input please check again.")
        }
      } else {
        toast.error("Something went wrong, Try again later.")
      }
    },
  })

  const onSubmit = (data: TChangePass) => {
    const modifiedData = {
      data: {
        ...data,
      },
      token,
    }
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
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">Security Information</span>
            </div>
          </div>

          <InputBox<TChangePass>
            name="current_password"
            id="current_password"
            placeholder="Enter Current Password..."
            type="password"
            register={register}
            error={(errors && errors?.current_password?.message?.toString()) || ""}
            desc="enter the current password."
            label="Current Password"
          />

          <InputBox<TChangePass>
            name="password"
            id="password"
            placeholder="Enter New Password..."
            type="password"
            register={register}
            error={(errors && errors?.password?.message?.toString()) || ""}
            desc="enter the new password."
            label="New Password"
          />

          {/* Security Tips */}
          {/* <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h4 className="font-semibold text-amber-800 mb-2">Password Security Tips:</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Use at least 8 characters</li>
              <li>• Include uppercase and lowercase letters</li>
              <li>• Add numbers and special characters</li>
              <li>• Avoid using personal information</li>
            </ul>
          </div> */}

          {/* Form Submission */}
          <div className="border-t border-gray-100 pt-8">
            <Button
              type="submit"
              disabled={Updating}
              className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium rounded-md border-r-0 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {Updating ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  <p>Changing Password..</p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Change Password</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChangePasswordForm
