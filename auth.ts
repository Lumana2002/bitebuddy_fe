import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { LoginResponseData } from "@/lib/definitions";
import { PostRequest } from "./lib/axios/server/axios";

async function loginWithEmailAndPassword(
  email: string,
  password: string
): Promise<LoginResponseData | undefined> {
  try {
    const res = await PostRequest(`/api/auth/login`, { email, password }, {});

    return res.data;
  } catch (error) {
    console.log("Login failed:",error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  trustHost: true,
  basePath: "/api/auth",
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);
      
        if (!parsedCredentials.success) throw new Error("Invalid Credentials");
        
        const { email, password } = parsedCredentials.data;
        const res = await loginWithEmailAndPassword(email, password);
      
        if (!res) {
          throw new Error("Invalid Credentials");
        }
      
        const UserData = {
          id: Number(res.user.id),  // Convert string to number
          access_token: res.token,
          firstName: res.user.firstName,
          lastName: res.user.lastName,
          email: res.user.email,
          role: res.user.role,
        };
        
        return UserData;
      }
    }),
  ],
});
