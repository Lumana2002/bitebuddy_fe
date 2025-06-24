"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import { loginSchema, TLogin } from "@/schemas/authSchema";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { authenticate } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import { AtSign, CircleAlert, KeyRound, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";


const LoginForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
  });


  const onSubmit = async (data: TLogin) => {
    setLoading(true);
    try {
      const res = (await authenticate(data)) as any;
      console.log(res)
      if (res === process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL) {
        toast.success("Login Successful");
        window.location.reload();
        window.location.href = '/'
        // nextjs pushes to '/' automaticallly
      } else {
        setErrorMsg(res);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full flex flex-col gap-y-10 bg-gray-50 justify-center items-center max-w-sm rounded-lg p-10 border border-input"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl text-primary font-bold opacity-80 ">
        Please log in to continue.
      </h1>
      {errorMsg && (
        <div
          className="flex items-center justify-center bg-destructive/20 text-center py-3 rounded-lg gap-x-2 font-semibold"
          aria-live="polite"
          aria-atomic="true"
        >
          <CircleAlert strokeWidth={2} className="size-7 text-red-600" />
          <p className="text-sm text-red-600">{errorMsg}</p>
        </div>
      )}

      <div className="flex flex-col gap-y-5  justify-center items-center">
        <div className="relative flex flex-col gap-y-3">
          <Label htmlFor="email" className="opacity-80">Email</Label>
          <div className="relative flex flex-col gap-y-1">
            <Input
              {...register("email")}
              className={cn("pl-10 py-5", {
                "border-primary": errors?.email?.message,
              })}
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
            />
            <AtSign className="pointer-events-none absolute top-[0.7rem] left-3 size-5 text-gray-500 peer-focus:text-gray-900" />
            {errors?.email?.message && (
              <span className="text-destructive text-xs font-semibold">
                {errors?.email?.message}
              </span>
            )}
          </div>
        </div>

        <div className="relative flex flex-col gap-y-3">
          <Label htmlFor="password" className="opacity-80">Password</Label>
          <div className="relative flex flex-col gap-y-1">
            <Input
              {...register("password")}
              className={cn("pl-10 py-5", {
                "border-primary": errors?.password?.message,
              })}
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <KeyRound className="pointer-events-none absolute top-[0.7rem] left-3 size-5 text-gray-500 peer-focus:text-gray-900" />
            {errors?.password?.message && (
              <span className="text-destructive text-xs font-semibold">
                {errors?.password?.message}
              </span>
            )}
          </div>
        </div>
        <Button type="submit" className="w-full">
          {loading ? (
            <span className="flex items-center gap-x-2">
              <Loader2 className="size-5 animate-spin" />Logging In...{" "}
            </span>
          ) : (
            "Login"
          )}
        </Button>

        <div
          className="flex justify-center space-x-2 text-gray-600 text-sm"
          aria-live="polite"
          aria-atomic="true"
        >
          <p>{`Don't have an account?`}</p>
          <Link
            href={"/signup"}
            className="text-red-500 hover:underline transition"
          >
            Register Instead
          </Link>
        </div>
        <div className="flex justify-center text-sm">
          <Link href={'/forgot-password'}>
            <p className="text-red-500 hover:underline transition">Forgot Password?</p>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
