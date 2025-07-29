"use client"

import Link from "next/link"
import { Users, TrendingUp, Sparkles } from "lucide-react"

const Request = () => {
  return (
    <section className="pt-8 pb-10 bg-gray-50/30 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 z-[-1] opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29-22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23fef3c7' fillOpacity='0.4' fillRule='evenodd'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          zIndex: 0,
        }}
      />
      <div className="container mx-auto sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-medium text-amber-500 mb-4">Register Your Restaurant</h2>
          <p className="text-gray-600 mb-12">Join our platform and connect with food lovers in your area</p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-4">
              <div className="bg-amber-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Reach More Customers</h3>
              <p className="text-gray-500 text-sm">Connect with food lovers in your area</p>
            </div>
            <div className="p-4">
              <div className="bg-amber-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Boost Sales</h3>
              <p className="text-gray-500 text-sm">Grow your business with our platform</p>
            </div>
            <div className="p-4">
              <div className="bg-amber-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-gray-500 text-sm">Simple tools to manage your business</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-amber-300 to-amber-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="font-semibold mb-6 text-lg">
                Join our platform today and start reaching more customers tomorrow!
              </p>
              <Link href="/contact">
                <button className="bg-slate-50 text-amber-500 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Send Request
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
