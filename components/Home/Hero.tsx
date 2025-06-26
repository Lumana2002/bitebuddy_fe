import hero from "@/public/assets/hero.jpg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Clock } from "lucide-react"

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[70vh] min-h-[500px]"
      style={{ backgroundImage: `url(${hero.src})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  Hungry?
                  <span className="block text-amber-400">We've got you covered</span>
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed">
                  Your next meal is just a click away
                </p>
                <Button className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white text-lg font-medium rounded-full px-6 py-6 shadow-lg">
  Explore Restaurants
</Button>
              </div>

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
      {/* </div> */}
     </section>
  )
}

export default Hero
