import Link from "next/link";
import EditForm from "../_components/EditForm";
import FoodTable from "../_components/FoodsTable";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PlusCircle } from "lucide-react";

type Props = {
  id: string;
};

type EditProps = {
  params: Props;
};

const page = ({ params: { id } }: EditProps) => {
  return (
    <section className="max-w-[1502px] mb-20 flex flex-col gap-y-10">
      <div className="flex xvsm:flex-row flex-col gap-y-1 justify-between xvsm:items-center gap-x-5">
        <h1 className="text-[1.6rem] vsm:text-[2rem] font-bold opacity-70">
          Edit Menu
        </h1>
        <Link href={"/restaurantDashboard/menus"}>
          <Button
            className="flex items-center justify-start gap-x-1 text-background bg-primary hover:bg-primary/90"
            variant={"secondary"}
          >
            <ChevronLeft className="size-6" />
            <p className="pr-2 text-base">Back</p>
          </Button>
        </Link>
      </div>
      <EditForm id={id} />
      <div className="flex justify-between flex-col xvsm:flex-row gap-y-3">
        <h1 className="font-semibold text-3xl opacity-80">
          Menu Items
        </h1>
        <Link href={`/restaurantDashboard/menus/${id}/add_food`} className='xvsm:p-0 pb-6 m-0'>
          <Button className="px-5 py-2.5 my-auto text-[16px] bg-primary hover:bg-primary/80 font-medium text-white rounded-md  border-r-0">
            <PlusCircle className="size-5" />
            &nbsp; Add Food
          </Button>
        </Link>
      </div>
      <FoodTable />
    </section>
  );
};

export default page;
