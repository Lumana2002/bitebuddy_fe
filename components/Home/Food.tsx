"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
// import WeatherRecommend from "./WeatherRecommend"
import { Sparkles } from "lucide-react"
import { foodItems } from "./list/foodItems"

const Food = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-medium text-amber-500 mb-2">
            Food Categories
          </h2>
          <p className="text-gray-600">
            Browse our selection of delicious options
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnMouseEnter: true,
                stopOnInteraction: false,
              }),
            ]}
            opts={{
              loop: true,
              align: "center",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {foodItems.map((food, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/7"
                >
                  <div className="px-1">
                    <div className="bg-white p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow h-full">
                      <div className="flex flex-col items-center h-full">
                        <div className="relative aspect-square mb-3 w-full">
                          <Image
                            src={food.image || "/placeholder.svg"}
                            alt={food.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <h3 className="text-sm font-medium text-gray-800">
                          {food.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <div className="hidden md:block">
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border hover:bg-gray-50 text-gray-700" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border hover:bg-gray-50 text-gray-700" />
            </div>
          </Carousel>
        </div>

        {/* Weather-Based Recommendations */}
        {/* <WeatherRecommend /> */}
      </div>
    </section>
  )
}

export default Food
