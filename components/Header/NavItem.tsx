"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItemProps {
  href: string
  name: string
}

const NavItem = ({ href, name }: NavItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-amber-400 to-amber-500  text-white shadow-md"
          : "text-amber-500 hover:text-amber-600"
      }`}
    >
      {name}
    </Link>
  )
}

export default NavItem
