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
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-medium text-amber-500 mb-2">Featured Restaurants</h2>
        <p className="text-gray-600">Discover quality dining experiences</p>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {restaurantData?.content.slice(0, 8).map((item, index) => (
          <Link
            href={`/restaurants/${item.restaurantId}`}
            key={index}
            className="group block"
          >
            <div className="bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow h-full">
              {/* Image */}
              <div className="aspect-[4/3] relative">
                <Image
                  src={item?.image || restaurant}
                  alt={`${item.name} restaurant`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-medium text-gray-800">
                  {item.name}
                </h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  {/* <span>{item.location || 'Kathmandu'}</span> */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View More Section */}
      <div className="text-center mt-12">
        <Link href="/restaurants">
          <button className="bg-amber-500 text-white px-6 py-2.5 rounded-lg font-medium text-base hover:bg-amber-600 transition-colors">
            View All Restaurants
          </button>
        </Link>
      </div>
    </section>
  )
}

export default Restaurants
