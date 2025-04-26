"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Package, FileText, Settings, LogOut, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { motion, AnimatePresence } from "framer-motion"

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
    subItems: [
      { href: "/admin/products", label: "All Products" },
      { href: "/admin/products/new", label: "Add New Product" },
    ],
  },
  {
    href: "/admin/blog",
    label: "Blog Posts",
    icon: FileText,
    subItems: [
      { href: "/admin/blog", label: "All Posts" },
      { href: "/admin/blog/new", label: "Add New Post" },
    ],
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null)

  const handleLogout = async () => {
    try {
      // Clear demo auth if it exists
      localStorage.removeItem("demoAuth")

      // Sign out from auth system
      await logout()

      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin panel.",
      })
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Logout failed",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleCollapsible = (href: string) => {
    if (openCollapsible === href) {
      setOpenCollapsible(null)
    } else {
      setOpenCollapsible(href)
    }
  }

  // Check if a path is active (exact match or starts with for parent routes)
  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === href
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  // Mobile sidebar
  const MobileSidebar = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <Link href="/admin/dashboard" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/images/logo.svg" alt="Al Thai Foods" width={120} height={50} className="h-8 w-auto" />
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4">
              <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar_url || ""} alt={user?.name || "Admin"} />
                  <AvatarFallback className="bg-primary-100 text-primary-600">{user?.name?.[0] || "A"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user?.name || "Admin User"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || "admin@althaifoods.com"}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {sidebarLinks.map((link) => {
                  const isActiveLink = isActive(link.href)

                  if (link.subItems) {
                    return (
                      <Collapsible
                        key={link.href}
                        open={openCollapsible === link.href || link.subItems.some((item) => isActive(item.href))}
                        onOpenChange={() => toggleCollapsible(link.href)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-between text-left font-normal",
                              isActiveLink
                                ? "bg-gray-100 dark:bg-gray-700 text-primary-600 font-medium"
                                : "text-gray-600 dark:text-gray-300",
                            )}
                          >
                            <span className="flex items-center gap-3">
                              <link.icon className="h-5 w-5" />
                              {link.label}
                            </span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform duration-200",
                                openCollapsible === link.href ? "transform rotate-180" : "",
                              )}
                            />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-10 space-y-1 mt-1">
                          {link.subItems.map((subItem) => (
                            <Link key={subItem.href} href={subItem.href} onClick={() => setIsMobileMenuOpen(false)}>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  isActive(subItem.href)
                                    ? "bg-gray-100 dark:bg-gray-700 text-primary-600 font-medium"
                                    : "text-gray-600 dark:text-gray-300",
                                )}
                              >
                                {subItem.label}
                              </Button>
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    )
                  }

                  return (
                    <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-left font-normal gap-3",
                          isActiveLink
                            ? "bg-gray-100 dark:bg-gray-700 text-primary-600 font-medium"
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

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                className="w-full justify-start text-left font-normal gap-3 text-gray-600 dark:text-gray-300"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile sidebar */}
      <MobileSidebar />

      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed left-0 top-0 overflow-y-auto">
        <div className="py-6 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/admin/dashboard" className="flex items-center justify-center">
            <Image src="/images/logo.svg" alt="Al Thai Foods" width={130} height={50} className="h-10 w-auto" />
          </Link>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar_url || ""} alt={user?.name || "Admin"} />
              <AvatarFallback className="bg-primary-100 text-primary-600">{user?.name?.[0] || "A"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{user?.name || "Admin User"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || "admin@althaifoods.com"}</p>
            </div>
          </div>

          <div className="px-2 py-2 mb-2">
            <h3 className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400 tracking-wider">Main</h3>
          </div>

          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActiveLink = isActive(link.href)

              if (link.subItems) {
                return (
                  <Collapsible
                    key={link.href}
                    open={openCollapsible === link.href || link.subItems.some((item) => isActive(item.href))}
                    onOpenChange={() => toggleCollapsible(link.href)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-between text-left font-normal",
                          isActiveLink
                            ? "bg-gray-100 dark:bg-gray-700 text-primary-600 font-medium"
                            : "text-gray-600 dark:text-gray-300",
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <link.icon className="h-5 w-5" />
                          {link.label}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            openCollapsible === link.href ? "transform rotate-180" : "",
                          )}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-10 space-y-1 mt-1">
                      {link.subItems.map((subItem) => (
                        <Link key={subItem.href} href={subItem.href}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              isActive(subItem.href)
                                ? "bg-gray-100 dark:bg-gray-700 text-primary-600 font-medium"
                                : "text-gray-600 dark:text-gray-300",
                            )}
                          >
                            {subItem.label}
                          </Button>
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )
              }

              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left font-normal gap-3",
                      isActiveLink
                        ? "bg-gray-100 dark:bg-gray-700 text-primary-600 font-medium"
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

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-left font-normal gap-3 text-gray-600 dark:text-gray-300"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </>
  )
}
