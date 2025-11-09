import { z } from "zod";

export const FoodSchema = z.object({
  //<------- Required Fields ------->
  name: z
    .string({ required_error: "Food Name is required" })
    .min(1, { message: "Food Name is required" }),
  category: z
    .string({ required_error: "Food Category is required" })
    .min(1, { message: "Food Category is required" }),
  spiceLevel: z
    .coerce.number({ required_error: "Food Spice Level is required" })
    .min(1, { message: "Minimum Spice Level is 1" })
    .max(5, { message: "Maximum Spice Level is 5" }),
  price: z
    .coerce.number({ required_error: "Food Price is required" })
    .min(1, { message: "Minimum Food Price is 1" }),
  image: z
    .string().optional(),
});

export type TFood = z.infer<typeof FoodSchema>;
