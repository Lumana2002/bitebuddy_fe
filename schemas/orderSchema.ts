import { z } from "zod";

export const OrderSchema = z.object({
  //<------- Required Fields ------->
  deliveryAddress: z
    .string({ required_error: "Delivery Address is required" })
    .min(1, { message: "Restaurant Name is required" }),
  menuId: z.string({ required_error: "Menu ID is required" }),
  userId: z.string({ required_error: "User ID is required" }),
  items: z.array(z.object({
    foodId: z.string(),
    quantity: z.number(),
    price: z.number()
  })),
  subtotal: z.number(),
  deliveryCharge: z.number(),
  total: z.number(),

  // <------- Optional Fields ------->
  totalPrice: z.string().optional(),
  orderStatus: z.string().optional(),
  paymentStatus: z.string().optional(),
  deliveryDate: z.string().optional(),
  deliveryTime: z.string().optional(),
  specialInstructions: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export type TOrder = z.infer<typeof OrderSchema>;
