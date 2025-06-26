"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link"

import { loginSchema, type TLogin } from "@/schemas/authSchema"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { authenticate } from "@/lib/actions"

import { Button } from "@/components/ui/button"
import { AtSign, CircleAlert, KeyRound, Loader2, Sparkles, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"

const LoginForm = () => {
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: TLogin) => {
    setLoading(true)
    try {
      const res = (await authenticate(data)) as any
      console.log(res)
      if (res === process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL) {
        toast.success("Login Successful")
        window.location.reload()
        window.location.href = "/"
        // nextjs pushes to '/' automaticallly
      } else {
        setErrorMsg(res)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-400 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-t-3xl p-8 shadow-lg border border-amber-200">
          <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            
            <h1 className="text-2xl font-bold text-amber-800">Login</h1>
      
          </div>
            <p className="text-amber-600 font-medium">Please log in to continue your journey</p>
          </div>
        </div>

        {/* Form Card */}
        <form
          className="bg-white/90 backdrop-blur-sm rounded-b-3xl p-8 shadow-xl border-x border-b border-amber-200"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Error Message */}
          {errorMsg && (
            <div
              className="flex items-center justify-center bg-red-50 border border-red-200 text-center py-4 rounded-2xl gap-x-3 font-semibold mb-6 shadow-sm"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <CircleAlert className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-sm text-red-600">{errorMsg}</p>
            </div>
          )}

          <div className="space-y-6">
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
                    "pl-12 pr-4 py-6 text-lg bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-amber-400 focus:ring-amber-400 transition-all duration-200 shadow-sm",
                    {
                      "border-red-400 focus:border-red-400 focus:ring-red-400": errors?.email?.message,
                    },
                  )}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
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
                    "pl-12 pr-4 py-6 text-lg bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-amber-400 focus:ring-amber-400 transition-all duration-200 shadow-sm",
                    {
                      "border-red-400 focus:border-red-400 focus:ring-red-400": errors?.password?.message,
                    },
                  )}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Logging In...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5" />
                  Login
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
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-amber-600 hover:text-amber-800 font-bold hover:underline transition-all duration-200"
                  >
                    Register Instead
                  </Link>
                </p>
              </div>

              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 font-semibold hover:underline transition-all duration-200"
                >
                  <KeyRound className="w-4 h-4" />
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
