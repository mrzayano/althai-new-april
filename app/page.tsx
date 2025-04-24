"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductShowcase from "@/components/product-showcase"
import TestimonialSlider from "@/components/testimonial-slider"

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const position = useTransform(scrollYProgress, (pos) => {
    return pos === 1 ? "relative" : "fixed"
  })

  // Scroll to content section
  const scrollToContent = () => {
    const contentSection = document.getElementById("content-section")
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Hero Section - Full Screen with Parallax */}
      <div ref={targetRef} className="h-screen relative">
        <motion.div
          style={{ opacity, scale, position }}
          className="w-full h-screen flex items-center justify-center top-0 left-0 z-10"
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image src="/images/hero-bg.jpg" alt="Premium flour" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                Elevate Your <span className="text-primary-600">Baking</span> Experience
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Premium flour solutions crafted for perfection, trusted by leading bakeries across the UAE.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg h-14 px-8" asChild>
                  <Link href="/products">
                    Explore Products <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg h-14 px-8 text-white border-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/about">Our Story</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={scrollToContent}
          >
            <ChevronDown className="h-10 w-10 text-white animate-bounce" />
          </motion.div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div id="content-section" className="bg-black pt-20 pb-20">
        {/* Brand Statement */}
        <section className="container mx-auto px-4 mb-32">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white mb-16 leading-tight text-center"
            >
              Crafting premium flour solutions since <span className="text-primary-600">1995</span>, setting the
              standard for <span className="text-primary-600">quality</span> and
              <span className="text-primary-600"> excellence</span>.
            </motion.h2>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-32">
          <div className="container mx-auto px-4 mb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Premium Products</h2>
                <p className="text-gray-400 text-lg max-w-xl">
                  Discover our range of premium flour products designed for professional baking and food production.
                </p>
              </div>
              <Button variant="ghost" className="text-white group" asChild>
                <Link href="/products" className="flex items-center gap-2">
                  View All Products
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <ProductShowcase />
        </section>

        {/* Quality Statement with Parallax */}
        <section className="relative h-[70vh] mb-32 overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/wheat-field.jpg" alt="Wheat field" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Quality in Every <span className="text-primary-600">Grain</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                We source only the finest wheat varieties, carefully selected and processed to ensure consistent quality
                and exceptional performance in every bag.
              </p>
              <Button size="lg" className="text-lg" asChild>
                <Link href="/about">
                  Our Process <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What Our Clients Say</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Trusted by leading bakeries and food manufacturers across the UAE.
            </p>
          </div>

          <TestimonialSlider />
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl p-12 md:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Elevate Your Baking?</h2>
                <p className="text-xl text-gray-200 mb-8">
                  Contact us today to discuss your flour requirements. We offer competitive pricing and flexible
                  delivery options.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-primary-900 hover:bg-gray-100 text-lg" asChild>
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white/10 text-lg"
                    asChild
                  >
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-80 lg:h-full">
                <Image src="/images/flour-bag.png" alt="Premium flour product" fill className="object-contain" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
