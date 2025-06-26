import hero from "@/public/assets/hero.jpg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Phone, Mail, MapPin, Send } from "lucide-react"

const Hero = () => {
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
                  Get in Touch
                  <span className="block text-amber-400">With Us</span>
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed">
                  Have questions, feedback, or need support? We're here to help you!
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
