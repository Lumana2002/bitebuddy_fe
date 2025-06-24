import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Image as ImgIcon, X } from "lucide-react";
import { TRestaurant } from "@/schemas/restaurantSchema";
import { uploadImage } from "@/apicalls/imageUpload";

// Define the API URL
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

type ImageUploadProps = {
  control: Control<TRestaurant>;
  errors?: FieldErrors<TRestaurant>;
  defImg?: string;
  token?: string; // Added token prop for authentication
};

const ImageUpload = ({ control, errors, defImg, token }: ImageUploadProps) => {
  const [file, setFile] = useState<File | undefined>();
  const [defaultImage, setDefaultImage] = useState<string | undefined>(defImg);
  const imgRef = useRef<HTMLInputElement>(null);

  const typefile = file?.type.split("/")[0];

  useEffect(() => {
    setDefaultImage(defImg);
  }, [defImg]);

  // Function to handle file upload
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any // Add field parameter to this function
  ) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        // Upload the image
        const response = await uploadImage({
          data: formData,
          token: token,
        });
        console.log(response)
        // Assuming response contains the URL or path of the uploaded image
        const imageUrl = response.data.image; // Adjust this based on your backend response

        // Update the form field with the image URL or path
        field.onChange(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      // Clear the field if no file is selected
      field.onChange(undefined);
    }
  };

  // Handle image deletion
  const handleDeleteImage = (field: any) => {
    setFile(undefined);
    setDefaultImage(undefined);
    field.onChange(undefined);
    setDefaultImage(undefined);
  };

  return (
    <div className="flex flex-col">
      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <div>
            <input
              type="file"
              name="image"
              onChange={(e) => handleFileChange(e, field)} // Pass field here
              hidden
              ref={imgRef}
              accept="image/jpg, image/jpeg, image/png, image/webp"
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
                    src={`${defaultImage}`}
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
                    onClick={() => handleDeleteImage(field)}
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
                    onClick={() => handleDeleteImage(field)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-primary/90 text-background size-8"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      />
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
