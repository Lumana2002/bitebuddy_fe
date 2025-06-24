import Sidebar from "./_components/Sidebar";
import TopBar from "./_components/TopBar";
import AdminRoute from "./_components/AdminRoute";
import "@/app/globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRoute>
      <section className="flex overflow-x-hidden">
        <Sidebar />
        <div className="w-full flex flex-col gap-y-6 xvsm:gap-y-11">
          <TopBar />
          <div className="mx-[1rem] lg:ml-[19rem]">
            {/* <BreadCrumbs /> */}

            {children}
          </div>
        </div>
      </section>
    </AdminRoute>
  );
}