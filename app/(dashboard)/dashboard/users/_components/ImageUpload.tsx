"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Image as ImgIcon, X } from "lucide-react";
import { TUser } from "@/schemas/profileSchema";

type ImageUploadProps = {
  control: Control<TUser>;
  errors?: FieldErrors<TUser>;
  defImg?: string;
};

const ImageUpload = ({ control, errors, defImg }: ImageUploadProps) => {
  const [file, setFile] = useState<File | undefined>();
  const [defaultImage, setDefaultImage] = useState<string | undefined>(defImg);
  const imgRef = useRef<HTMLInputElement>(null);

  const typefile = file?.type.split("/")[0];

  useEffect(() => {
    setDefaultImage(defImg);
  }, [defImg]);

  const handleDeleteImage = () => {
    setFile(undefined);
    setDefaultImage(undefined);
  };

  return (
    <div className="flex flex-col">
      {/* Image Upload  */}
      <Controller
        name="image"
        control={control}
        render={({ field }) => {
          return (
            <div>
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  field.onChange(e.target.files?.[0]);
                  setFile(e.target.files?.[0]);
                }}
                hidden
                ref={imgRef}
                accept="image/jpg, image/jpeg, image/png, image/webp"
              />
            </div>
          );
        }}
      />

      <div className="flex vsm:flex-row flex-col gap-y-2 vsm:items-center gap-x-10">
        <Button
          onClick={() => imgRef?.current?.click()}
          type="button"
          className="text-background w-fit bg-gray-900 hover:bg-gray-700"
        >
          <ImgIcon className="size-6" /> &nbsp;&nbsp;Select Image
        </Button>

        {defaultImage && !file && (
          <div className="relative mt-3 flex size-[100px] cursor-pointer flex-col gap-2 rounded-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_APP_URL}/storage/${defaultImage}`}
              fill
              alt=""
              className={cn(
                "cursor-pointer object-cover rounded-full border border-input",
                {
                  "border-[3px] border-red-500":
                    errors?.image?.message &&
                    typeof errors?.image?.message === "string",
                }
              )}
            />
            <X
              onClick={handleDeleteImage}
              className="absolute top-1 right-1 p-1 rounded-full bg-primary/90 text-background size-8"
            />
          </div>
        )}

        {file && typefile === "image" && (
          <div className="relative mt-3 flex size-[100px] cursor-pointer flex-col gap-2 rounded-full">
            <Image
              src={URL.createObjectURL(file)}
              fill
              alt=""
              className={cn(
                "cursor-pointer object-cover rounded-full border border-input",
                {
                  "border-[3px] border-red-500":
                    errors?.image?.message &&
                    typeof errors?.image?.message === "string",
                }
              )}
            />
            <X
              onClick={handleDeleteImage}
              className="absolute top-1 right-1 p-1 rounded-full bg-primary/90 text-background size-8"
            />
          </div>
        )}
      </div>

      {errors?.image?.message ? (
        <span className="pl-3 text-sm font-semibold text-destructive">
          {typeof errors?.image?.message === "string"
            ? errors?.image?.message
            : null}
        </span>
      ) : null}
    </div>
  );
};

export default ImageUpload;
