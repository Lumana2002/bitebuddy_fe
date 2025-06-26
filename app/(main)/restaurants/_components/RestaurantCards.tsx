"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import restaurantImage from "@/public/assets/restaurant.png"
import { useGetAllRestaurants } from "@/hooks/restaurantsQueries"
import Loading from "@/components/Loading"
import { ChefHat, MapPin, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Remove the local interface and use the one from your API types
// Or update it to match your API response
interface Restaurant {
  restaurantId: number // Changed from string to number
  name: string
  address: string
  cuisine: string
  image?: string
}

const RestaurantCards = ({ searchTerm }: any) => {
  const [page, setPage] = useState<number>(1)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const { data, isPending } = useGetAllRestaurants(page)

  useEffect(() => {
    if (data) {
      setRestaurants((prevRestaurants: Restaurant[]) => [...prevRestaurants, ...data.content])
    }
  }, [data])

  const handleViewMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const isLastPage = data?.totalPages && page >= data.totalPages

  // Filter restaurants based on search term
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isPending) {
    return <Loading />
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured
            <span className="block text-amber-600">Restaurants</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover amazing restaurants in your area</p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map((restaurant, index) => (
            <div key={restaurant.restaurantId} className="group cursor-pointer">
              <Card className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                <CardHeader className="p-0 relative">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-t-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>

                  <div className="relative">
                    <Image
                      src={restaurant?.image || restaurantImage}
                      alt={restaurant.name}
                      width={400}
                      height={250}
                      className="relative w-full h-64 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-2xl"></div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-200 mb-2">
                      {restaurant.name}
                    </CardTitle>

                    {/* Restaurant Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center">
                          <MapPin className="h-3 w-3 text-amber-600" />
                        </div>
                        <span className="text-sm font-medium">{restaurant.address || "Kathmandu"}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">
                          <ChefHat className="h-3 w-3 text-orange-600" />
                        </div>
                        <span className="text-sm font-medium">{restaurant.cuisine}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Link href={`/restaurants/${restaurant.restaurantId}`} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                      <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                      View Restaurant
                    </Button>
                  </Link>
                </CardFooter>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
              </Card>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {!isLastPage && (
          <div className="text-center mt-12">
            <Button
              onClick={handleViewMore}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Load More Restaurants
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredRestaurants.length === 0 && !isPending && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-600">Try adjusting your search terms or browse all restaurants</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default RestaurantCards
