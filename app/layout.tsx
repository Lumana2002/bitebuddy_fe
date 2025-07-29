
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
  title: "FoodHub",
  description:
    "FoodHub, your personalized food ordering platform that helps you pick and order your favorite dishes.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
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
        <NextAuthSessionProvider>
          <QueryProvider>
            <ReduxProvider>
              {children}
            </ReduxProvider>
          </QueryProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
