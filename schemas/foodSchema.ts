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
    .string({ required_error: "Food Spice Level is required" })
    .min(1, { message: "Food Spice Level is required" }),
  price: z
    .string({ required_error: "Food Price is required" })
    .min(1, { message: "Food Price is required" }),
});

export type TFood = z.infer<typeof FoodSchema>;
