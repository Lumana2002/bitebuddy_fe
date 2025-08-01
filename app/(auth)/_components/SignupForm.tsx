"use client"

import { AtSign, CircleUserRound, KeyRound, Loader2, UserPlus, Map } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type TRegister, registerSchema } from "@/schemas/authSchema"
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { registerUser } from "@/apicalls/users"
import toast from "react-hot-toast"

export default function SignupForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSettled(data: any) {
      if (data.status === 200) {
        toast.success("Register Successful")
        router.push("/login")
      } else {
        toast.error("Something went wrong, Try again Later")
      }
    },
  })

  const onSubmit = (data: TRegister) => {
    const { confirm_password, ...modifiedData } = data
    mutate(modifiedData)
  }

  return (
    <div className="py-10 flex justify-center relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-400 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-t-3xl p-3 shadow-lg border border-amber-200">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-amber-800 mb-2">Register</h1>
          </div>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/90 backdrop-blur-sm rounded-b-3xl p-8 shadow-xl border-x border-b border-amber-200"
        >
          <div className="space-y-6">
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name Field */}
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-amber-800 font-semibold flex items-center gap-2">
                  <CircleUserRound className="w-4 h-4" />
                  First Name
                </Label>
                <div className="relative">
                  <Input
                    {...register("firstName")}
                    className={cn(
                      "pl-12 pr-4 py-4 text-lg bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-amber-400 focus:ring-amber-400 transition-all duration-200 shadow-sm",
                      {
                        "border-red-400 focus:border-red-400 focus:ring-red-400": errors?.firstName?.message,
                      },
                    )}
                    id="firstName"
                    type="text"
                    name="firstName"
                  />
                  {/* <CircleUserRound className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-amber-500" /> */}
                </div>
                {errors?.firstName?.message && (
                  <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
                    <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                    {errors?.firstName?.message}
                  </div>
                )}
              </div>

              {/* Last Name Field */}
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-amber-800 font-semibold flex items-center gap-2">
                  <AtSign className="w-4 h-4" />
                  Last Name
                </Label>
                <div className="relative">
                  <Input
                    {...register("lastName")}
                    className={cn(
                      "pl-12 pr-4 py-4 text-lg bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-amber-400 focus:ring-amber-400 transition-all duration-200 shadow-sm",
                      {
                        "border-red-400 focus:border-red-400 focus:ring-red-400": errors?.lastName?.message,
                      },
                    )}
                    id="lastName"
                    type="text"
                    name="lastName"
                  />
                  {/* <CircleUserRound className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-amber-500" /> */}
                </div>
                {errors?.lastName?.message && (
                  <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
                    <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                    {errors?.lastName?.message}
                  </div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-amber-800 font-semibold flex items-center gap-2">
                <AtSign className="w-4 h-4" />
                Email Address
              </Label>
              <div className="relative">
                <Input
                  {...register("email")}
                  className={cn(
                    "pl-12 pr-4 py-4 text-lg bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-amber-400 focus:ring-amber-400 transition-all duration-200 shadow-sm",
                    {
                      "border-red-400 focus:border-red-400 focus:ring-red-400": errors?.email?.message,
                    },
                  )}
                  id="email"
                  type="email"
                  name="email"
                />
                <AtSign className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-amber-500" />
              </div>
              {errors?.email?.message && (
                <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
                  <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                  {errors?.email?.message}
                </div>
              )}
            </div>
          <div className="space-y-2">
              <Label htmlFor="address" className="text-amber-800 font-semibold flex items-center gap-2">
                <Map className="w-4 h-4" />
                 Address
              </Label>
              <div className="relative">
                <Input
                  {...register("address")}
                  className={cn(
                    "pl-12 pr-4 py-4 text-lg bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-amber-400 focus:ring-amber-400 transition-all duration-200 shadow-sm",
                    {
                      "border-red-400 focus:border-red-400 focus:ring-red-400": errors?.address?.message,
                    },
                  )}
                  id="address"
                  type="text"
                  name="address"
                />
              </div>
              {errors?.address?.message && (
                <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
                  <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                  {errors?.address?.message}
                </div>
              )}
            </div>

            {/* Password Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-amber-800 font-semibold flex items-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    {...register("password")}
                    className={cn(
                      "pl-12 pr-4 py-4 text-lg bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-amber-400 focus:ring-amber-400 transition-all duration-200 shadow-sm",
                      {
                        "border-red-400 focus:border-red-400 focus:ring-red-400": errors?.password?.message,
                      },
                    )}
                    id="password"
                    type="password"
                    name="password"
                    minLength={6}
                  />
                  <KeyRound className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-amber-500" />
                </div>
                {errors?.password?.message && (
                  <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
                    <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                    {errors?.password?.message}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirm_password" className="text-amber-800 font-semibold flex items-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    {...register("confirm_password")}
                    className={cn(
                      "pl-12 pr-4 py-4 text-lg bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-amber-400 focus:ring-amber-400 transition-all duration-200 shadow-sm",
                      {
                        "border-red-400 focus:border-red-400 focus:ring-red-400": errors?.confirm_password?.message,
                      },
                    )}
                    id="confirm_password"
                    type="password"
                    name="confirm_password"
                    minLength={6}
                  />
                  <KeyRound className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-amber-500" />
                </div>
                {errors?.confirm_password?.message && (
                  <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
                    <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                    {errors?.confirm_password?.message}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full py-6 text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-3">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Create  Account
                </span>
              )}
            </Button>

            {/* Links Section */}
            <div className="space-y-4 pt-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-amber-700">
                  <div className="h-px bg-amber-300 flex-1"></div>
                  <span className="text-sm font-medium">or</span>
                  <div className="h-px bg-amber-300 flex-1"></div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-amber-700 font-medium">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-amber-600 hover:text-amber-800 font-bold hover:underline transition-all duration-200"
                  >
                    Login Instead
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
