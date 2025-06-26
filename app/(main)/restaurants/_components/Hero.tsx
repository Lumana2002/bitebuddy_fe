"use client"
import hero from "@/public/assets/hero.jpg"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Filter, Star, Clock } from "lucide-react"
import SearchBar from "./Search"

const Hero = ({ onSearch }: any) => {
  return (
    <section
      className="relative bg-cover bg-center h-[70vh] min-h-[500px]"
      style={{ backgroundImage: `url(${hero.src})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  Discover Amazing
                  <span className="block text-amber-400">Restaurants</span>
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed">
                  Find your favorite restaurants and explore new cuisines from the comfort of your home.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
