import Navbar from "@/components/Header/Navbar";
import "../globals.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="text-b">
      <Navbar />
      {children}
    </section>
  );
}
