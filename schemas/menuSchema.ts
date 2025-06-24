import { z } from "zod";

export const MenuSchema = z.object({
  //<------- Required Fields ------->
  name: z
    .string({ required_error: "Menu Name is required" })
    .min(1, { message: "Menu Name is required" })
});

export type TMenu = z.infer<typeof MenuSchema>;
