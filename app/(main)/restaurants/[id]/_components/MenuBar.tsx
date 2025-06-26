"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useGetRestaurantMenus } from "@/hooks/menusQueries"
import { useParams } from "next/navigation"
import { Loader2, Search, Menu, ChefHat } from "lucide-react"

interface MenuBarProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string) => void
}

const MenuBar: React.FC<MenuBarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  const { id: restaurantId } = useParams()
  const [page, setPage] = useState<number>(1)
  const { data: menuData, isPending: isLoading } = useGetRestaurantMenus(Number(restaurantId), page)

  useEffect(() => {
    if (menuData && menuData.content?.length > 0 && selectedCategory === null) {
      onSelectCategory(menuData.content[0].name)
    }
  }, [menuData, selectedCategory, onSelectCategory])

  if (isLoading) {
    return (
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-6 py-8 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
            <span className="text-gray-600 font-medium">Loading menu...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-20">
      <div className="container mx-auto px-6 py-6">
        {/* Top Section */}
        <div className="flex items-center justify-between mb-6">
          {/* Menu Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full">
              <ChefHat className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Categories and Search */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Menu Categories */}
          <div className="flex-1">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {menuData &&
                menuData.content?.map((menu, index) => (
                  <button
                    key={index}
                    onClick={() => onSelectCategory(menu.name)}
                    className={`relative px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === menu.name
                        ? "bg-amber-500 text-white shadow-lg transform scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700 hover:scale-105"
                    }`}
                  >
                    {menu.name}
                    {selectedCategory === menu.name && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-full"></div>
                    )}
                  </button>
                ))}
            </div>
          </div>

          {/* Search Bar */}
          {/* <div className="relative md:w-80">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search in ${selectedCategory || "restaurant"}`}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 hover:bg-white"
              />
            </div>
          </div> */}
        </div>

      </div>

      
    </nav>
  )
}

export default MenuBar
