import "@/app/globals.css";
import RestaurantRoute from "./_components/RestaurantRoute";
import SidebarRest from "./_components/SidebarRest";
import TopRestBar from "./_components/TopRestBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RestaurantRoute>
      <section className="flex overflow-x-hidden">
        <SidebarRest />
        <div className="w-full flex flex-col gap-y-6 xvsm:gap-y-11">
          <TopRestBar />
          <div className="mx-[1rem] lg:ml-[19rem]">
            {/* <BreadCrumbs /> */}
            {children}
          </div>
        </div>
      </section>
    </RestaurantRoute>
  );
}