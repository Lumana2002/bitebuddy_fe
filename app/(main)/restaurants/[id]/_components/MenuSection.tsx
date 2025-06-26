"use client"

import type React from "react"
import { ChefHat, Utensils } from "lucide-react"
import FoodItem from "./Food"
import type { Food } from "../_types/food"

interface MenuSectionProps {
  selectedCategory: string
  foodItems: Food[]
}

const MenuSection: React.FC<MenuSectionProps> = ({ selectedCategory, foodItems }) => {
  return (
    <div className="relative">
      {/* Section Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full">
            <Utensils className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{selectedCategory}</h2>
            <p className="text-gray-600 mt-1">
              {foodItems.length} {foodItems.length === 1 ? "item" : "items"} available
            </p>
          </div>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full mt-4"></div>
      </div>

      {/* Food Items Grid */}
      <div className="px-6 pb-12">
        {foodItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {foodItems.map((item, index) => (
              <div key={item.foodId || index} className="transform transition-all duration-300 hover:scale-[1.02]">
                <FoodItem food={item} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6">
              <ChefHat className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No items available</h3>
            <p className="text-gray-500">
              Sorry, there are no items in the {selectedCategory.toLowerCase()} category at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-50 to-yellow-50 rounded-full translate-y-12 -translate-x-12 opacity-30"></div>
    </div>
  )
}

export default MenuSection
