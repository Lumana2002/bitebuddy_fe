import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import MenusTable from './_components/MenusTable'

const page = () => {
  return (
    <div>
      <div className="flex justify-between flex-col xvsm:flex-row gap-y-3">
        <h1 className="font-semibold text-3xl xvsm:pb-10 opacity-80">
          Menus and Foods
        </h1>
        <Link href={"/restaurantDashboard/menus/add_menu"} className='xvsm:p-0 pb-6 m-0'>
          <Button className="px-5 py-2.5 my-auto text-[16px] bg-primary hover:bg-primary/80 font-medium text-white rounded-md  border-r-0">
            <PlusCircle className="size-5" />
            &nbsp; Add Menu 
          </Button>
        </Link>
      </div>
      <MenusTable />
    </div>
  )
}

export default page