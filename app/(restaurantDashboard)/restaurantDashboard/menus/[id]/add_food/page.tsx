"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from "lucide-react";
import FoodForm from '../../_components/FoodForm';
import { useParams } from 'next/navigation';

const page = () => {
    const { id: id } = useParams()

    return (
        <div className='mb-2'>
            <div className="flex justify-between flex-col xvsm:flex-row gap-y-3">
                <h1 className="font-semibold text-3xl xvsm:pb-10 opacity-80">
                    Add Food
                </h1>
                <Link href={`/restaurantDashboard/menus/${id}`}>
                    <Button
                        className="flex items-center justify-start gap-x-1 text-background bg-primary hover:bg-primary/80"
                        variant={"secondary"}
                    >
                        <ChevronLeft className="size-6" />
                        <p className="pr-2 text-base">Back</p>
                    </Button>
                </Link>
            </div>
            <FoodForm />
        </div>
    )
}

export default page