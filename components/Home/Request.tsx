"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Store, Users, TrendingUp, CheckCircle, ArrowRight, Sparkles } from "lucide-react"

const Request = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
          

            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight">
            Looking to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-600"> register </span> your Restaurant?
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              <span className="block mt-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                Let's grow together! 🚀
              </span>
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Reach More Customers</h3>
              <p className="text-gray-600 text-sm">Connect with thousands of food lovers in your area</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Boost Your Sales</h3>
              <p className="text-gray-600 text-sm">Increase revenue with our proven delivery platform</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Easy Management</h3>
              <p className="text-gray-600 text-sm">Simple dashboard to manage orders and track performance</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-amber-300 to-amber-500 rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-white font-semibold mb-6 text-lg">
                Join our platform today and start reaching more customers tomorrow!
              </p>

              <Link href="/contact">
                <button className=" bg-slate-50 text-amber-500 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Send Request
                  {/* <ArrowRight className="ml-2 h-5 w-5  group-hover:translate-x-1 transition-transform duration-200" /> */}
                </button>
      
              </Link>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  )
}

export default Request
