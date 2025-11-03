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
    <div className="bg-white border-b sticky top-0 z-20">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3 mb-3 justify-center">
          <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full">
            <ChefHat className="w-4 h-4 text-amber-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 just">Menu</h2>
        </div>
        
        <div className="flex gap-1.5 overflow-x-auto pb-1 justify-center">
          {menuData?.content?.map((menu, index) => (
            <button
              key={index}
              onClick={() => onSelectCategory(menu.name)}
              className={`px-3 py-1.5 text-base whitespace-nowrap rounded-md transition-colors ${
                selectedCategory === menu.name
                  ? "bg-amber-100 text-amber-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {menu.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MenuBar
