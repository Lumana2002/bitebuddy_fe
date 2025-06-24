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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-8 py-10 px-5 vsm:px-14 rounded-lg border border-input shadow"
    >
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

      {/* Form Submission */}
      <Button type="submit" className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium rounded-md border-r-0 ">
        {Updating ? (
          <div className="flex items-center gap-2">
            <Loader2 className="size-5 animate-spin" />
            <p>Changing Password..</p>
          </div>
        ) : (
          "Change Password"
        )}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
