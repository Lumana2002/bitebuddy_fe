"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import MenuBar from "./_components/MenuBar"
import MenuSection from "./_components/MenuSection"
import { useParams } from "next/navigation"
import { useGetRestaurant } from "@/hooks/restaurantsQueries"
import { useGetRestaurantMenus } from "@/hooks/menusQueries"
import { useGetAllMenuFoods } from "@/hooks/foodQueries"
import { Star, Clock, MapPin, Phone, Truck, ShoppingBag } from "lucide-react"

const Page = () => {
  const { id } = useParams()
  const [page, setPage] = useState<number>(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data: restaurantData } = useGetRestaurant(Number(id))
  const { data: rawMenuData } = useGetRestaurantMenus(Number(id), page)
  const menuData = rawMenuData?.content || []

  const selectedMenuId = menuData.find((menu) => menu.name === selectedCategory)?.menuId
  const { data: foodData, isPending, refetch } = useGetAllMenuFoods(selectedMenuId, page)
  const filteredItems = foodData?.content || []

  // Set default category when menuData is loaded or updated
  useEffect(() => {
    if (menuData.length > 0 && !selectedCategory) {
      setSelectedCategory(menuData[0].name)
    }
  }, [menuData])

  // Refetch food data when selectedMenuId or page changes
  useEffect(() => {
    if (selectedMenuId) {
      refetch()
    }
  }, [selectedMenuId, page, refetch])

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[45vh] md:h-[55vh] overflow-hidden">
        <Image
          src={restaurantData?.image || "/assets/hero.jpg"}
          alt={restaurantData?.name || "Restaurant"}
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>

        {/* Content Container */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-12">
            <div className="max-w-4xl">

              {/* Restaurant Name */}
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{restaurantData?.name}</h1>

              {/* Restaurant Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-white/90">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-lg font-medium">{restaurantData?.cuisine}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span className="text-lg">{restaurantData?.address}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full blur-2xl"></div>
      </div>

      {/* Menu Bar Section */}
      <MenuBar
        categories={menuData.map((menu) => menu.name)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Menu Section */}
      {selectedCategory && (
        <MenuSection
          selectedCategory={selectedCategory}
          foodItems={filteredItems.map((item) => ({
            foodId: String(item.foodId),
            menuId: String(item.menuId),
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            price: Number(item.price),
            spiceLevel: Number(item.spiceLevel),
          }))}
        />
      )}
    </main>
  )
}

export default Page
