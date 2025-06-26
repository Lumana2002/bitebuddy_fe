"use client"

import Image from "next/image"
import logo from "@/public/assets/logo.png"
import Link from "next/link"
import { navItems } from "./list/navItems"
import NavItem from "./NavItem"
import { Button } from "@/components/ui/button"
import MblNavbar from "./MblNavbar"
import { useSession } from "next-auth/react"
import { CircleUser, Truck, Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogoutBtnNav from "./LogoutBtnNav"
import Cart from "./Cart"

const Navbar = () => {
  const { data: session } = useSession()
  const userRole = session?.user?.role

  return (
    <header className="bg-gradient-to-r from-slate-50 to-gray-100 shadow-lg border-b-2 border-amber-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section - Enhanced */}
          <Link
            href="/"
            className="group flex items-center space-x-4 p-2 rounded-xl hover:bg-white/50 transition-all duration-300"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <Image
                src={logo || "/placeholder.svg"}
                width={48}
                height={48}
                alt="BiteBuddy Logo"
                className="relative rounded-xl shadow-md"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-amber-600 tracking-tight">BiteBuddy</h1>
            </div>
          </Link>

          {/* Center Navigation - Pill Style */}
          <nav className="hidden mmd:block">
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-amber-100">
              <div className="flex items-center space-x-1">
                {navItems.map((link, index) => (
                  <NavItem key={index} href={link.href} name={link.name} />
                ))}
              </div>
            </div>
          </nav>

          {/* Right Section - Card Style */}
          <div className="flex items-center space-x-3">
            {!session ? (
              <div className="hidden mmd:flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-amber-100 space-x-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-amber-500 hover:text-amber-600 hover:bg-amber-50 font-medium rounded-full px-4"
                  >
                    Login
                  </Button>
                </Link>
                <div className="w-px h-6 bg-amber-200"></div>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-medium rounded-full px-6 shadow-md"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {userRole === "ADMIN" || userRole === "RESTAURANT" ? (
                  <div className="hidden mmd:block">
                    <Link href={userRole === "RESTAURANT" ? "/restaurantDashboard" : "/dashboard"}>
                      <Button className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white font-medium px-8 py-3 rounded-full shadow-lg border-2 border-slate-700">
                        Dashboard
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="hidden mmd:flex items-center space-x-3">
                    {/* Notification Bell */}
                    <button className="relative p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-amber-100 hover:bg-white transition-all duration-200">
                      <Bell className="h-5 w-5 text-amber-700" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
                        3
                      </span>
                    </button>

                    {/* Cart */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-amber-100 p-1">
                      <Cart />
                    </div>

                    {/* User Profile */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full pl-4 pr-6 py-3 shadow-lg border border-amber-100 hover:bg-white transition-all duration-200 group">
                          <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-bold shadow-md">
                              {session?.user?.firstName?.charAt(0)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="hidden lg:block text-left">
                            <p className="text-sm font-medium text-gray-900 group-hover:text-amber-900 transition-colors">
                              {session?.user?.firstName}
                            </p>
                            <p className="text-xs text-gray-500">Online</p>
                          </div>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-56 bg-white/95 backdrop-blur-sm border border-amber-100 shadow-xl"
                        align="end"
                      >
                        <div className="p-3 border-b border-amber-100">
                          <p className="font-medium text-gray-900">
                            {session?.user?.firstName} {session?.user?.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{session?.user?.email}</p>
                        </div>
                        <DropdownMenuGroup className="p-1">
                          <Link href="/profile">
                            <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-amber-50 transition-colors">
                              <CircleUser className="mr-3 h-4 w-4 text-amber-600" />
                              <span className="font-medium">Profile</span>
                            </DropdownMenuItem>
                          </Link>
                          <Link href="/profile/orders">
                            <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-amber-50 transition-colors">
                              <Truck className="mr-3 h-4 w-4 text-amber-600" />
                              <span className="font-medium">Orders</span>
                            </DropdownMenuItem>
                          </Link>
                          <div className="border-t border-amber-100 my-1"></div>
                          <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-red-50 transition-colors">
                            <LogoutBtnNav />
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu */}
            <div className="mmd:hidden bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-amber-100">
              <MblNavbar />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
