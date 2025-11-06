"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { addItem } from '@/store/slices/cartSlice';

interface Food {
  foodId: number
  name: string
  category: string
  price: number
  spiceLevel: number
  menuId: number
  image: string
}

interface Restaurant {
  restaurantId: number
  name: string
  image: string
}

interface RecommendationItem {
  food: Food
  restaurant: Restaurant
  score: number
}

export default function WeatherRecommendations({ recommendations }: { recommendations: RecommendationItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const dispatch = useDispatch()
  const itemsPerSlide = 3
  const totalSlides = Math.ceil(recommendations.length / itemsPerSlide)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1))
  }

  const getCurrentSlideItems = () => {
    const startIndex = currentIndex * itemsPerSlide
    return recommendations.slice(startIndex, startIndex + itemsPerSlide)
  }

  const handleAddToCart = (food: Food) => {
    // @ts-ignore
    dispatch(addItem(food))
  }

  const renderSpiceLevel = (level: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < level ? "text-red-500" : "text-gray-300"}>🌶️</span>
    ))
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {recommendations.length > 0 ? <div> <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Recommended for the weather</h2>
        <p className="text-gray-600">Handpicked restaurants just for you</p>
      </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentSlideItems().map((item, index) => (
                <Card
                  key={`${item.restaurant.restaurantId}-${index}`}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <Image
                      src={item.restaurant.image || "/placeholder.svg"}
                      alt={item.food.name}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(item.food.name)}`
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">4.{item.score}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 truncate">{item?.food?.name}</h2>
                        <p className="text-sm text-gray-600 truncate">{item?.restaurant?.name}</p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <span className="text-sm">Price: NPR {item?.food?.price?.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-600">Spice Level: </span>
                        {renderSpiceLevel(item?.food?.spiceLevel)}
                      </div>
                      <Button
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 text-sm font-medium"
                        size="sm"
                        onClick={() => handleAddToCart(item?.food)}
                      >
                        Order {item?.food?.name}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white z-10"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white z-10"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Dots Indicator */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentIndex ? "bg-amber-500" : "bg-gray-300"
                    }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}
        </div></div> : <div>No recommendations found</div>}
    </div>
  )
}