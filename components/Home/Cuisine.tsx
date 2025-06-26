"use client"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { cuisineItems } from "./list/cuisineItems"
import { Globe, Star, MapPin } from "lucide-react"

const Cuisine = () => {
  return (
    <section className="py-16 text-amber-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Types of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
              Cuisines
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          by Italian, Indian, Japanese, and many more
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3500,
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
              {cuisineItems.map((cuisine, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                >
                  <div className="group cursor-pointer">
                    <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                      {/* Background Pattern */}
                      {/* <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full -translate-y-10 translate-x-10"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-amber-400 to-amber-500 rounded-full translate-y-8 -translate-x-8"></div>
                      </div> */}

                      {/* Cuisine Image */}
                      <div className="relative mb-4">
                        
                        <div className="relative">
                          <Image
                            src={cuisine.image || "/placeholder.svg"}
                            alt={cuisine.name}
                            width={120}
                            height={120}
                            className="relative w-full h-24 sm:h-28 md:h-32 object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                          />
                          
                        </div>
                      </div>

                      {/* Cuisine Info */}
                      <div className="text-center relative z-10">
                        <h3 className="font-bold text-gray-900 text-sm md:text-base group-hover:text-amber-600 transition-colors duration-200 mb-1">
                          {cuisine.name}
                        </h3>
                        
                        <div className="mt-2 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <div className="hidden md:block">
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-2  hover:bg-amber-50 hover:border-amber-300 text-amber-700 shadow-lg" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-2  hover:bg-amber-50 hover:border-amber-300 text-amber-700 shadow-lg" />
            </div>
          </Carousel>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Ready to explore new flavors?</p>
          <button className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            Discover All Cuisines
          </button>
        </div>
      </div>
    </section>
  )
}

export default Cuisine
