import Link from "next/link";
import EditForm from "../../_components/EditForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

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
          Edit Restaurant
        </h1>
        <Link href={"/dashboard/restaurants"}>
          <Button
            className="flex items-center justify-start gap-x-1 text-background bg-primary hover:bg-primary/80"
            variant={"secondary"}
          >
            <ChevronLeft className="size-6" />
            <p className="pr-2 text-base">Back</p>
          </Button>
        </Link>
      </div>

      <EditForm id={id} />
    </section>
  );
};

export default page;
