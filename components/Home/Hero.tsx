"use client"

import hero from "@/public/assets/hero.jpg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[75vh] min-h-[550px] overflow-hidden"
      style={{ backgroundImage: `url(${hero.src})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="space-y-12">
              <div className="space-y-8">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent leading-tight tracking-tight"
                >
                  Hungry?
                  <span className="block bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">We've got you covered</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mb-8"
                >
                  Your next meal is just a click away. Discover the best restaurants in your area and order your favorite dishes with ease.
                </motion.p>
                <Link href="/restaurants">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-8"
                  >
                    <Button 
                      className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white text-lg font-medium rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Explore Restaurants
                    </Button>
                  </motion.div>
                </Link>

              {/* Search Section */}
              {/* <div className="bg-white rounded-lg p-4 shadow-xl">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your delivery address"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Search for restaurants or dishes"
                    />
                  </div>
                  <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg">
                    Find Food
                  </Button>
                </div>
              </div>

              {/* Features */}
              {/* <div className="flex flex-wrap gap-6 text-white">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium">30 min delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium">Track your order</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">✓</span>
                  </div>
                  <span className="text-sm font-medium">Safe & contactless</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
     </section>
  )
}

export default Hero
