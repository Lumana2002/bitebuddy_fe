"use client"

import Image from "next/image"
import restaurantImage from "@/public/assets/restaurant.png"
import Link from "next/link"
import { Button } from "../ui/button"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ChevronRight, Star } from "lucide-react"
import { useGetAllRestaurants } from "@/hooks/restaurantsQueries"
import { useSession } from "next-auth/react"
import { useGetAllOrders } from "@/hooks/orderQueries"
import { useGetRestaurantRecommendation } from "@/hooks/restaurantsQueries"
import Loading from "../Loading"

const Recommendations = () => {
  const session = useSession()
  const userId = session.data?.user?.id

  // Fetch orders
  const orders = useGetAllOrders(userId, 1)
  const { data: restaurantData } = useGetAllRestaurants(2)

  // Fetch recommendations using custom hook
  const { data: recommendations, isLoading: isRecommendationsLoading } = useGetRestaurantRecommendation({
    userOrders: orders.data?.content,
    token: session?.data?.user?.access_token,
  })

  // Loading state
  if (isRecommendationsLoading) {
    return <Loading />
  }

  const displayData = (recommendations?.length ?? 0) > 0 ? recommendations : restaurantData?.content?.slice(0, 5)

  if (!displayData || displayData.length === 0) {
    return (
      <section className="mt-16 md:mt-24 mx-4 md:mx-8 2xl:mx-16">
        <div className="text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">No Recommendations Found</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Sorry, we couldn't find any recommendations for you at the moment. Please try again later.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="mt-16 md:mt-24 mx-4 md:mx-8 2xl:mx-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Top Picks for You</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover amazing restaurants curated just for your taste
        </p>
      </div>

      <Carousel
        plugins={[Autoplay({ delay: 4000, stopOnMouseEnter: true })]}
        opts={{ loop: true }}
        className="max-w-5xl mx-auto"
      >
        <CarouselContent>
          {displayData.map((restaurant, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-4 my-8">
                <div className="flex flex-col lg:flex-row">
                  {/* Image Section */}
                  <div className="lg:w-1/3 relative">
                    <div className="aspect-[4/3] lg:aspect-[3/4] relative overflow-hidden">
                      <Image
                        src={restaurant?.image || restaurantImage}
                        fill
                        className="object-cover"
                        alt={`${restaurant.name} restaurant`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="space-y-6">
                      {/* Restaurant Name */}
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">{restaurant.name}</h3>


                      {/* Description */}
                      <p className="text-lg text-gray-600 leading-relaxed line-clamp-3">{restaurant.description}</p>

                      {/* Order Button */}
                      <div className="pt-4">
                        <Link href={`/restaurants/${restaurant.restaurantId}`}>
                        {/* <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            View All Categories
          </button> */}
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                          >
                            Order Now
                            <ChevronRight className="ml-2 w-5 h-5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <div className="hidden md:block">
          <CarouselPrevious className="left-4 bg-white/90 border-gray-200 text-gray-700 shadow-lg" />
          <CarouselNext className="right-4 bg-white/90 border-gray-200 text-gray-700 shadow-lg" />
        </div>
      </Carousel>
    </section>
  )
}

export default Recommendations
