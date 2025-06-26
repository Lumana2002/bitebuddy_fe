"use client"

import Image from "next/image"
import restaurant from "@/public/assets/restaurant.png"
import { useGetAllRestaurants } from "@/hooks/restaurantsQueries"
import Loading from "../Loading"
import Link from "next/link"
import { Star, Clock, MapPin } from "lucide-react"

const Restaurants = () => {
  const { data: restaurantData, isPending } = useGetAllRestaurants(1)

  if (isPending) return <Loading />

  return (
    <section className="mt-16 md:mt-24 mx-4 md:mx-8 2xl:mx-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Featured Restaurants</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover the best dining experiences in your area</p>
        <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {restaurantData?.content.slice(0, 8).map((item, index) => (
          <Link
            href={`/restaurants/${item.restaurantId}`}
            key={index}
            className="group block transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={item?.image || restaurant}
                    alt={`${item.name} restaurant`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-200">
                  {item.name}
                </h3>

              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View More Section */}
      <div className="text-center mt-16">
        <Link href="/restaurants">
          <button className="bg-amber-500 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 hover:bg-amber-600 hover:shadow-xl">
            View All Restaurants
          </button>
        </Link>
      </div>
    </section>
  )
}

export default Restaurants
