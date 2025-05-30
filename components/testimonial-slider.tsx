"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    content:
      "Al Thai flour has been a game-changer for our bakery. The consistent quality helps us deliver perfect bread and pastries to our customers every single day.",
    author: "Ahmed Al-Mansour",
    position: "Head Baker, Sweet Dreams Bakery",
    avatar: "/images/testimonials/avatar-1.jpg",
  },
  {
    id: 2,
    content:
      "As a major hypermarket chain, we need reliable suppliers who can meet our high volume demands. Al Thai Foods has never let us down with their premium flour and excellent service.",
    author: "Fatima Qasim",
    position: "Procurement Manager, UAE Mart",
    avatar: "/images/testimonials/avatar-2.jpg",
  },
  {
    id: 3,
    content:
      "The specialty flours from Al Thai have allowed us to expand our product range and offer artisanal breads that our customers love. Their team is always responsive and helpful.",
    author: "Michael Rodriguez",
    position: "Owner, Artisan Bread Co.",
    avatar: "/images/testimonials/avatar-3.jpg",
  },
]

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((current) => (current === testimonials.length - 1 ? 0 : current + 1))
  }, [])

  const prev = useCallback(() => {
    setCurrent((current) => (current === 0 ? testimonials.length - 1 : current - 1))
  }, [])

  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(next, 5000)
      return () => clearTimeout(timer)
    }
  }, [current, isPaused, next])

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-12 md:p-16 relative shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <Quote className="h-20 w-20 text-primary-100 dark:text-gray-700 absolute top-8 left-8" />
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-8">
                "{testimonials[current].content}"
              </p>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage
                    src={testimonials[current].avatar || "/placeholder.svg"}
                    alt={testimonials[current].author}
                  />
                  <AvatarFallback className="bg-primary-100 text-primary-600">
                    {testimonials[current].author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 dark:text-white text-lg">
                    {testimonials[current].author}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">{testimonials[current].position}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          className="rounded-full border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 p-0 rounded-full ${current === index ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-700"}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={next}
          className="rounded-full border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
