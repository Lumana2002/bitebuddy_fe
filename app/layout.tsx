
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextAuthSessionProvider from "@/components/SessionProvider";
import QueryProvider from "@/components/QueryProvider";
import ReduxProvider from "@/components/ReduxProvider";


const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BiteBuddy",
  description:
    "BiteBuddy, your personalized food ordering platform for you that helps you pick and order your favorite dishes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Toaster position="top-center" reverseOrder={true} />
        <ReduxProvider>
          <NextAuthSessionProvider>
            <QueryProvider>
              {children}
            </QueryProvider>
          </NextAuthSessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
