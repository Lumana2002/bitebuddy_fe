"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import MblNavItem from "./MblNavItem"
import Image from "next/image"
import { navItems } from "./list/navItems"
import logo from "@/public/assets/logo.png"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import LogoutBtn from "../LogoutBtn"
import { useState } from "react"

const MblNavbar = () => {
  const { data: session } = useSession()
  const userRole = session?.user?.role
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-6 w-6 text-gray-700" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center p-6 border-b border-gray-100">
            <Link href="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
              <Image
                src={logo || "/placeholder.svg"}
                width={40}
                height={40}
                alt="BiteBuddy Logo"
                className="rounded-lg"
              />
              <h1 className="text-xl font-bold text-amber-950">BiteBuddy</h1>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-6">
            <nav className="space-y-1 px-3">
              {navItems.map((link, index) => (
                <MblNavItem key={index} href={link.href} name={link.name} onClose={() => setIsOpen(false)} />
              ))}
            </nav>
          </div>

          {/* Auth Section */}
          <div className="border-t border-gray-100 p-6 space-y-4">
            {!session ? (
              <div className="space-y-3">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-center border-amber-200 text-amber-500 hover:bg-amber-50 hover:border-amber-300 font-medium"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full justify-center bg-amber-500 hover:bg-amber-600 text-white font-medium shadow-sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userRole === "ADMIN" || userRole === "RESTAURANT" ? (
                  <Link
                    href={userRole === "RESTAURANT" ? "/restaurantDashboard" : "/dashboard"}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button className="w-full justify-center bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-sm">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <div className="space-y-3">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                        {session?.user?.firstName?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {session?.user?.firstName} {session?.user?.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{session?.user?.email}</p>
                      </div>
                    </div>

                    {/* User Actions */}
                    <div className="space-y-2">
                      <Link href="/profile" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
                          Profile
                        </Button>
                      </Link>
                      <Link href="/profile/orders" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
                          Orders
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Logout Button */}
                <div className="pt-3 border-t border-gray-100">
                  <LogoutBtn />
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MblNavbar
