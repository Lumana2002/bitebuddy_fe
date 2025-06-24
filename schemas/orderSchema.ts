import { z } from "zod";

export const OrderSchema = z.object({
  //<------- Required Fields ------->
  deliveryAddress: z
    .string({ required_error: "Delivery Address is required" })
    .min(1, { message: "Restaurant Name is required" }),

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
