import { z } from "zod";

export const RestaurantSchema = z.object({
  //<------- Required Fields ------->
  name: z
    .string({ required_error: "Restaurant Name is required" })
    .min(1, { message: "Restaurant Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email(),
  cuisine: z
    .string({ required_error: "Cuisine is required" })
    .min(1, { message: "Cuisine is required" }),

  //<------- Optional Fields ------->
  contact: z.string().optional(),
  image: z.string().optional(),
  description:  z.string().optional(),
  status:  z.string().optional(),
  address:  z.string().optional(),
});

export type TRestaurant = z.infer<typeof RestaurantSchema>;
