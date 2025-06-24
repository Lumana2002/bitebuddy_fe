import { DefaultSession } from "next-auth";
import { JWT, Session, User } from "next-auth/next";

type Role = Admin | Restaurant | User;

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: number;
    
    } & DefaultSession["user"];
  }
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    access_token: string;
    role: Role;
  }
  interface JWT {
    access_token: string;
  }
}
