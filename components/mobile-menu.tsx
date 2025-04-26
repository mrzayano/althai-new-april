"use client"

import { useEffect } from "react"
import { X, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: { href: string; label: string }[]
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) onClose()
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
            <Link href="/" onClick={onClose}>
              <Image src="/images/logo.svg" alt="Al Thai Foods" width={120} height={50} className="h-10 w-auto" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close mobile menu"
              className="text-gray-800 dark:text-white"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="flex flex-col p-6 space-y-6">
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-2xl font-medium transition-colors",
                    pathname === link.href ? "text-primary-600 font-semibold" : "text-gray-800 dark:text-white",
                  )}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="mt-auto p-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              <a href="tel:+9716567314" className="flex items-center text-gray-800 dark:text-white">
                <Phone className="h-5 w-5 mr-3" />
                +971 65673141
              </a>
              <a href="mailto:althai.uae@gmail.com" className="flex items-center text-gray-800 dark:text-white">
                <Mail className="h-5 w-5 mr-3" />
                althai.uae@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
