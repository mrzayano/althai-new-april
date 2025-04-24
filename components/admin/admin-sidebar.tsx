"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Pencil, Package, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

const sidebarLinks = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/admin/blog",
    label: "Blog Posts",
    icon: Pencil,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 fixed left-0 top-0 overflow-y-auto">
      <div className="py-6 px-4 border-b">
        <Link href="/admin/dashboard" className="flex items-center justify-center">
          <Image src="/images/logo.svg" alt="Al Thai Foods" width={130} height={50} className="h-12 w-auto" />
        </Link>
      </div>

      <div className="p-4">
        <div className="px-2 py-2 mb-6">
          <h3 className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400 tracking-wider">Main</h3>
        </div>

        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left font-normal gap-3",
                    isActive
                      ? "bg-gray-100 dark:bg-gray-800 text-primary-600 font-medium"
                      : "text-gray-600 dark:text-gray-300",
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-left font-normal gap-3 text-gray-600 dark:text-gray-300"
          onClick={() => (window.location.href = "/")}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
