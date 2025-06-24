import type { NextAuthConfig } from "next-auth";
import type { Session } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL}`;
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          user.id = account.providerAccountId;
        }
        token.user = user;
        token.accessToken = user.access_token;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: any }) {
      session.user = token.user;
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET || "d28ae118886929bcb27dd92b35d2efbb",
  providers: [],
} satisfies NextAuthConfig;
