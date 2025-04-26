"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import ThemeSwitcher from "./theme-switcher"
import MobileMenu from "./mobile-menu"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Main Navigation */}
      <div
        className={cn(
          "transition-all duration-300 backdrop-blur-md",
          isScrolled ? "bg-white/90 dark:bg-gray-900/90 py-3 shadow-sm" : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.svg" alt="Al Thai Foods" width={120} height={50} className="h-10 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary-600",
                    pathname === link.href ? "text-primary-600 font-semibold" : "text-gray-800 dark:text-white",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Contact Info & Theme Switcher */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="tel:+9716567314"
                className="flex items-center text-sm text-gray-800 dark:text-white hover:text-primary-600 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                +971 65673141
              </a>
              <ThemeSwitcher />
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeSwitcher />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile menu"
                className="text-gray-800 dark:text-white"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} links={navLinks} />
    </header>
  )
}

export default Header
