"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Plus } from "lucide-react"
import RestaurantForm from "../_components/RestaurantForm"

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between flex-col xvsm:flex-row gap-y-3 mb-6">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="font-bold text-4xl xvsm:pb-10 text-gray-800">Add Restaurant</h1>
              </div>
            </div>
            <Link href={"/dashboard/restaurants"}>
              <Button
                className="flex items-center justify-start gap-x-1 text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 px-6 py-3"
                variant={"secondary"}
              >
                <ChevronLeft className="size-6" />
                <p className="pr-2 text-base">Back</p>
              </Button>
            </Link>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden w-full mb-2">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2"></div>
          <div className="p-8">
            <RestaurantForm />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-yellow-200/30 to-amber-300/30 rounded-full blur-2xl -z-10"></div>
      </div>
    </div>
  )
}

export default page
