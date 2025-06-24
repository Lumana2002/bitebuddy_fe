import clsx from "clsx";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Textarea } from "./ui/textarea";

interface TextAreaBoxProps<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  id: string;
  register: UseFormRegister<T>;
  desc?: string;
  error?: string;
  label?: string;
}

function TextAreaBox<T extends FieldValues>({
  name,
  placeholder,
  id,
  register,
  desc,
  error,
  label,
}: TextAreaBoxProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Label htmlFor={name as string} className="pl-1">
          {label}
        </Label>
      )}
      <Textarea
        {...register(name)}
        id={id}
        placeholder={placeholder}
        className={clsx("border-content py-6", {
          "border-[2px] border-destructive placeholder:text-destructive":
            error !== "",
        })}
      />
      {error && (
        <span className="pl-3 text-sm font-semibold text-destructive">
          ** {error}
        </span>
      )}
    </div>
  );
}

export default TextAreaBox;
