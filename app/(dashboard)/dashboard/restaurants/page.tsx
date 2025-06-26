"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import RestaurantsTable from "./_components/RestaurantsTable"

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - No Box */}
        <div className="flex justify-between flex-col xvsm:flex-row gap-y-3 mb-8">
          <h1 className="font-bold text-4xl xvsm:pb-10 text-gray-800">Restaurants</h1>
          <Link href={"/dashboard/restaurants/add_restaurant"} className="xvsm:p-0 pb-6 m-0">
            <Button className="px-8 py-4 my-auto text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 font-semibold text-white rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 border-0">
              <PlusCircle className="size-6" />
              &nbsp; Add Restaurant
            </Button>
          </Link>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2"></div>
          <div className="p-6">
            <RestaurantsTable />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-yellow-200/30 to-amber-300/30 rounded-full blur-2xl -z-10"></div>
      </div>

      {/* Global Styles for Pagination Buttons */}
      <style jsx global>{`
        button[aria-label*="previous"],
        button[aria-label*="Previous"],
        button[aria-label*="next"],
        button[aria-label*="Next"],
        .pagination button,
        [data-testid*="pagination"] button {
          background: linear-gradient(to right, #f59e0b, #ea580c) !important;
          color: white !important;
          border: none !important;
        }
        
        button[aria-label*="previous"]:hover,
        button[aria-label*="Previous"]:hover,
        button[aria-label*="next"]:hover,
        button[aria-label*="Next"]:hover,
        .pagination button:hover,
        [data-testid*="pagination"] button:hover {
          background: linear-gradient(to right, #d97706, #c2410c) !important;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  )
}

export default page
