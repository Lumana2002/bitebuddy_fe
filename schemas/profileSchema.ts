import { z } from "zod";

export const UserSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(1, { message: "First Name is required" }).optional(),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(1, { message: "Last Name is required" }).optional(),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" }),
  role: z
    .string({ required_error: "Role is required" })
    .min(1, { message: "Role is required" }).optional(),
  contact: z.string().optional(),
  image: z.string().optional(),
  createdAt: z.string().optional(),
});

export type TUser = z.infer<typeof UserSchema>;

export const changePassSchema = z.object({
  password: z
    .string({ required_error: "Required ***" })
    .min(1, { message: "Required ***" })
    .min(8, { message: "Passwod of 8 characters required" }),
  current_password: z
    .string({ required_error: "Required ***" })
    .min(1, { message: "Required ***" }),
});

export type TChangePass = z.infer<typeof changePassSchema>;
