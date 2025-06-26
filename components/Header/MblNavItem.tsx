"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface MblNavItemProps {
  href: string
  name: string
  onClose: () => void
}

const MblNavItem = ({ href, name, onClose }: MblNavItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClose}
      className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
        isActive
          ? "bg-blue-50 text-amber-500 border-l-4 border-amber-200"
          : "text-amber-900 hover:bg-gray-50 hover:text-amber-800"
      }`}
    >
      {name}
    </Link>
  )
}

export default MblNavItem
