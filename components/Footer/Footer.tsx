import Image from "next/image"
import Link from "next/link"
import { footerLists } from "./list/footerLists"
import { socialLinks } from "./list/socialLinks"
import { MapPin, Phone, Mail, Heart, Star, Users, Clock } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-400 rounded-full blur-2xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">B</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-amber-800">BiteBuddy</h2>
                  <p className="text-amber-600 font-medium">Your Food Companion</p>
                </div>
              </div>

              <p className="text-amber-700 leading-relaxed mb-8 text-lg">
                Discover your favorite meals and order from the best restaurants around you. We bring convenience and
                flavor to your doorstep with a seamless food ordering experience.
              </p>

              {/* Social Links */}
              <div className="space-y-6">
                <h4 className="text-amber-800 font-bold text-lg">Connect With Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((item, index) => (
                    <Link
                      key={index}
                      href={item.link}
                      className="group w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 hover:from-orange-500 hover:to-red-500 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl shadow-lg"
                    >
                      <Image
                        src={item.src || "/placeholder.svg"}
                        width={24}
                        height={24}
                        alt={`Our ${item.name}`}
                        className="group-hover:scale-110 transition-transform duration-200 filter brightness-0 invert"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200 h-full">
              <h3 className="text-2xl font-bold text-amber-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full mr-3"></div>
                Quick Links
              </h3>
              <nav className="space-y-4">
                {footerLists.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className="group flex items-center space-x-3 text-amber-700 hover:text-amber-800 transition-all duration-200 p-2 rounded-lg hover:bg-amber-100/50"
                  >
                    <div className="w-2 h-2 bg-amber-400 rounded-full group-hover:scale-150 transition-transform duration-200"></div>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200 h-full">
              <h3 className="text-2xl font-bold text-amber-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full mr-3"></div>
                Get in Touch
              </h3>
              <div className="space-y-6">
                {/* Address */}
                <div className="group flex items-start space-x-4 p-3 rounded-xl hover:bg-amber-100/50 transition-all duration-200">
                 <div className="w-12 h-12 bg-white border border-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200">
                     <MapPin className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                  <p className="text-amber-800 font-bold">Address</p>
                  <p className="text-amber-600">Mhepi, Kathmandu</p>
                </div>
              </div>


                {/* Phone */}
                <div className="group flex items-start space-x-4 p-3 rounded-xl hover:bg-amber-100/50 transition-all duration-200">
                  <div className="w-12 h-12 bg-white border border-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200">
                    <Phone className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-amber-800 font-bold">Phone</p>
                    <a
                      href="tel:+9779768785179"
                      className="text-amber-600 hover:text-amber-800 transition-colors font-medium"
                    >
                      (977) 9768785179
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="group flex items-start space-x-4 p-3 rounded-xl hover:bg-amber-100/50 transition-all duration-200">
                  <div className="w-12 h-12 bg-white border border-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200">
                    <Mail className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-amber-800 font-bold">Email</p>
                    <a
                      href="mailto:info@bitebuddy.com.np"
                      className="text-amber-600 hover:text-amber-800 transition-colors font-medium break-all"
                    >
                      info@bitebuddy.com.np
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 bg-gradient-to-r from-amber-800 to-orange-800 border-t-4 border-amber-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-amber-100 text-center md:text-left font-medium">
              © 2024 BiteBuddy. All rights reserved.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
              <nav className="flex items-center space-x-6">
                <Link href="#privacy" className="text-amber-200 hover:text-white transition-colors font-medium">
                  Privacy Policy
                </Link>
                <span className="text-amber-400">•</span>
                <Link href="#terms" className="text-amber-200 hover:text-white transition-colors font-medium">
                  Terms & Conditions
                </Link>
              </nav>

              <div className="flex items-center space-x-2 text-amber-200">
                <span>Made with</span>
                <Heart className="w-5 h-5 text-red-400 fill-current animate-pulse" />
                <span>by</span>
                <span className="font-bold text-white">Lumana</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
