import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import clsx from "clsx";
import { Label } from "@/components/ui/label";

interface SelectBoxProps<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  map?: { label: string; value: string }[];
  placeholder: string;
  label?: string;
  error: string;
  extra?: string;
}

const SelectBox = <T extends FieldValues>({
  control,
  name,
  label,
  error,
  placeholder,
  extra,
  map
}: SelectBoxProps<T>) => {
  const placeholderText = extra ? `${extra}` : placeholder;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Label
          htmlFor={name as string}
          className="pl-1 font-semibold text-[0.9rem] opacity-80"
        >
          {label}
        </Label>
      )}
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            onValueChange={(selectedValue) => {
              console.log("Selected value:", selectedValue); // Log selected value
              onChange(selectedValue); // Update the value in the form state
            }}
            value={value}
          >
            <SelectTrigger
              className={clsx(
                "w-full border-content text-[0.9rem] font-semibold text-content",
                {
                  "border-[2px] border-destructive placeholder:text-destructive":
                    error !== "", // Error styling
                }
              )}
            >
              <SelectValue placeholder={value ? map?.find(item => item.value === value)?.label : placeholderText} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {map?.map(({ label, value }: { label: string; value: string }) => (
                  <SelectItem
                    className="cursor-pointer text-base"
                    value={value}
                    key={value}
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {error && (
        <span className="pl-3 text-sm font-semibold text-destructive">
          ** {error}
        </span>
      )}
    </div>
  );
};

export default SelectBox;
