import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import AdminRoute from '../_components/AdminRoute'
import UsersTable from './_components/UsersTable'

const page = () => {
  return (
    <div>
      <div className="flex justify-between flex-col xvsm:flex-row gap-y-3">
        <h1 className="font-semibold text-3xl xvsm:pb-10 opacity-80">
          Users
        </h1>
        <Link href={"/dashboard/users/add_user"} className='xvsm:p-0 pb-6 m-0'>
          <Button className="px-5 py-2.5 my-auto text-[16px] bg-primary hover:bg-primary/80 font-medium text-white rounded-md  border-r-0">
            <PlusCircle className="size-5" />
            &nbsp; Add User
          </Button>
        </Link>
      </div>
      <UsersTable />
    </div>
  )
}

export default page