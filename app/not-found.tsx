"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Home } from "lucide-react"

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Decorative elements that follow mouse */}
      <motion.div
        className="absolute h-80 w-80 rounded-full bg-primary-100 dark:bg-primary-900/20 blur-3xl opacity-50"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 50 }}
      />

      <div className="text-center relative z-10">
        <motion.h1
          className="text-9xl font-bold text-primary-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button size="lg" asChild>
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Homepage
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Decorative wheat pattern */}
      <div className="absolute bottom-0 left-0 w-full h-32 geometric-pattern opacity-10" />
    </div>
  )
}
