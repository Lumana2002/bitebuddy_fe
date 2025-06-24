import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string({ required_error: "First Name is required" })
      .min(1, { message: "First Name is required" }),
    lastName: z
      .string({ required_error: "Last Name is required" })
      .min(1, { message: "Last Name is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .min(1, { message: "Email is required" })
      .email(),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "Password is required" })
      .min(8, { message: "Passwod of 8 characters required" }),
    confirm_password: z
      .string({ required_error: "Confirm Password is required" })
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords doesn't match",
    path: ["confirm_password"],
  });

export type TRegister = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

export type TLogin = z.infer<typeof loginSchema>;

export const registerRestaurantSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z
      .string({ required_error: "Email is required" })
      .min(1, { message: "Email is required" })
      .email(),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "Password is required" })
      .min(8, { message: "Passwod of 8 characters required" }),
    confirm_password: z
      .string({ required_error: "Confirm Password is required" })
      .min(1, { message: "Confirm Password is required" }),
    role: z
      .string({ required_error: "Role is required" })
      .min(1, { message: "Role is required" }),
    contact: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords doesn't match",
    path: ["confirm_password"],
  });

export type TRegisterRestaurant = z.infer<typeof registerRestaurantSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
});

export type TResetPassword = z.infer<typeof resetPasswordSchema>;

export const newPasswordSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" })
    .min(8, { message: "Passwod of 8 characters required" }),
  confirm_password: z
    .string({ required_error: "Confirm Password is required" })
    .min(1, { message: "Confirm Password is required" }),
});

export type TNewPassword = z.infer<typeof newPasswordSchema>;
