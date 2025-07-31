import InputBox from "@/components/InputBox";
import { Button } from "@/components/ui/button";
import { TChangePass, changePassSchema } from "@/schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/apicalls/users";
import toast from "react-hot-toast";

type Props = {
  token: string | undefined;
};

const ChangePasswordForm = ({ token }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TChangePass>({
    resolver: zodResolver(changePassSchema),
  });

  const { mutate, isPending: Updating } = useMutation({
    mutationFn: changePassword,
    onSettled(data: any) {
      if (data.status === 200) {
        toast.success("Password Changed Successfully");
      }

      if (data.response.status === 422) {
        if (data.response.data.message === "Incorrect/Invalid password") {
          toast.error("Invalid Password.");
        } else {
          toast.error("Invalid input please check again.");
        }
      } else {
        toast.error("Something went wrong, Try again later.");
      }
    },
  });

  const onSubmit = (data: TChangePass) => {
    const modifiedData = {
      data: {
        ...data,
      },
      token,
    };
    mutate(modifiedData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Change Password</h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your account password
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <div className="space-y-4">
          <InputBox<TChangePass>
            name="current_password"
            id="current_password"
            placeholder="••••••••"
            type="password"
            register={register}
            error={errors?.current_password?.message?.toString() || ""}
            label="Current Password"
            className="bg-gray-50 border-gray-200 focus:border-gray-400"
          />

          <InputBox<TChangePass>
            name="password"
            id="password"
            placeholder="••••••••"
            type="password"
            register={register}
            error={errors?.password?.message?.toString() || ""}
            label="New Password"
            className="bg-gray-50 border-gray-200 focus:border-gray-400"
          />
        </div>

        <div className="flex justify-end pt-2">
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
              'Update Password'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
