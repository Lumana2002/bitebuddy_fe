"use client"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { cuisineItems } from "./list/cuisineItems"

const Cuisine = () => {
  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-medium text-gray-800 mb-2">Cuisines</h2>
        <p className="text-gray-600">Explore different types of food from around the world</p>
      </div>

      {/* Carousel Section */}
      <div className="relative">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
            }),
          ]}
          opts={{
            loop: true,
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {cuisineItems.map((cuisine, index) => (
              <CarouselItem
                key={index}
                className="pl-2 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
              >
                <div className="group cursor-default">
                  <div className="bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 border border-gray-100">
                    <div className="relative aspect-square mb-3">
                      <Image
                        src={cuisine.image || "/placeholder.svg"}
                        alt={cuisine.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-sm text-gray-800 text-center font-medium">
                      {cuisine.name}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <div className="hidden md:block">
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white border border-gray-200 hover:bg-gray-50" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white border border-gray-200 hover:bg-gray-50" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}

export default Cuisine
