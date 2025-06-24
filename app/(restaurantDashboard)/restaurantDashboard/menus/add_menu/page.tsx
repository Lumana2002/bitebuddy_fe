import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from "lucide-react";
import MenuForm from '../_components/MenuForm';

const page = () => {
    return (
        <div className='mb-2'>
            <div className="flex justify-between flex-col xvsm:flex-row gap-y-3">
                <h1 className="font-semibold text-3xl xvsm:pb-10 opacity-80">
                    Add Menu
                </h1>
                <Link href={"/restaurantDashboard/menus"}>
                    <Button
                        className="flex items-center justify-start gap-x-1 text-background bg-primary hover:bg-primary/80"
                        variant={"secondary"}
                    >
                        <ChevronLeft className="size-6" />
                        <p className="pr-2 text-base">Back</p>
                    </Button>
                </Link>
            </div>
            <MenuForm />
        </div>
    )
}

export default page