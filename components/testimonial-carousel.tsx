"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    id: 1,
    content:
      "Al Thai flour has been a game-changer for our bakery. The consistent quality helps us deliver perfect bread and pastries to our customers every single day.",
    author: "Ahmed Al-Mansour",
    position: "Head Baker, Sweet Dreams Bakery",
  },
  {
    id: 2,
    content:
      "As a major hypermarket chain, we need reliable suppliers who can meet our high volume demands. Al Thai Foods has never let us down with their premium flour and excellent service.",
    author: "Fatima Qasim",
    position: "Procurement Manager, UAE Mart",
  },
  {
    id: 3,
    content:
      "The specialty flours from Al Thai have allowed us to expand our product range and offer artisanal breads that our customers love. Their team is always responsive and helpful.",
    author: "Michael Rodriguez",
    position: "Owner, Artisan Bread Co.",
  },
]

export default function TestimonialCarousel() {
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
    <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="overflow-hidden relative px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="px-8 md:px-16"
          >
            <Card className="bg-white dark:bg-gray-800 p-8 md:p-10 shadow-md relative">
              <Quote className="h-12 w-12 text-primary-100 dark:text-gray-700 absolute top-6 left-6" />
              <div className="relative">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-6 z-10 relative">
                  "{testimonials[current].content}"
                </p>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 dark:text-white">{testimonials[current].author}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{testimonials[current].position}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        <Button variant="outline" size="icon" onClick={prev} className="rounded-full" aria-label="Previous testimonial">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 p-0 rounded-full ${
              current === index ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-700"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}

        <Button variant="outline" size="icon" onClick={next} className="rounded-full" aria-label="Next testimonial">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
