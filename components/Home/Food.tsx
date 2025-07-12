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
    <section className="py-16 bg-gradient-to-b from-amber-50/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-700 mb-4">
            Find your favorite
          </h2>
          <div className="flex justify-center items-center gap-2 text-amber-500 font-semibold mb-4">
            <Sparkles className="h-6 w-6 text-amber-600" />
            <span className="text-4xl md:text-5xl">Bites</span>
            <Sparkles className="h-6 w-6 text-amber-500" />
          </div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore foods by categories and discover your next favorite meal
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
                  className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                >
                  <div className="">
                    <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-600/10 to-transparent opacity-0 rounded-2xl pointer-events-none z-10"></div>
                      {/* Food Image */}
                      <div className="relative mb-4">
                        <div className="absolute inset-0  rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <Image
                          src={food.image || "/placeholder.svg"}
                          alt={food.name}
                          width={120}
                          height={120}
                          className="relative w-full h-24 sm:h-28 md:h-32 object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Food Name */}
                      <div className="text-center">
                        <h3 className="font-bold text-gray-900 text-sm md:text-base group-hover:text-amber-600 transition-colors duration-200">
                          {food.name}
                        </h3>
                        <div className="mt-2 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <div className="hidden md:block">
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-2 hover:bg-amber-50 hover:border-amber-300 text-amber-700 shadow-lg" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-2  hover:bg-amber-50 hover:border-amber-300 text-amber-700 shadow-lg" />
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
