"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown, Check, Star, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProductShowcase from "@/components/product-showcase"
import TestimonialSlider from "@/components/testimonial-slider"
import EnquiryForm from "@/components/enquiry-form"

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
      {/* Hero Section - Clean, Modern Design */}
      <div ref={targetRef} className="h-screen relative bg-white dark:bg-gray-900">
        <motion.div
          style={{ opacity, scale, position }}
          className="w-full h-screen flex items-center justify-center top-0 left-0 z-10"
        >
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-primary-600 font-medium mb-2 flex items-center">
                <span className="mr-2">
                  <Star className="h-4 w-4 fill-primary-600 text-primary-600" />
                </span>
                Premium Quality Since 1995
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Elevate Your <span className="text-primary-600">Baking</span> Experience
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Premium flour solutions crafted for perfection, trusted by leading bakeries across the UAE. Experience
                the difference quality ingredients make.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg h-14 px-8" asChild>
                  <Link href="/products">
                    Explore Products <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-14 px-8" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block relative"
            >
              <div className="relative h-[500px]">
                <Image
                  src="/images/hero-flour.png"
                  alt="Premium flour products"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute top-20 right-0 bg-secondary/80 backdrop-blur-sm p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-primary-600 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm font-medium">ISO Certified Quality</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-20 left-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-primary-600 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm font-medium">Premium Grade Wheat</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={scrollToContent}
          >
            <ChevronDown className="h-10 w-10 text-primary-600 animate-bounce" />
          </motion.div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div id="content-section" className="bg-white dark:bg-gray-900 pt-20 pb-20">
        {/* About Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden"
            >
              <Image src="/images/mill-facility.jpg" alt="Al Thai Foods mill facility" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-8 left-8 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
                <p className="text-lg font-semibold">Established 1995</p>
                <p className="text-gray-600 dark:text-gray-400">Ajman, UAE</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">About Al Thai Foods</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                Founded in 1995, Al Thai Foods began as a small family-owned flour mill with a simple mission: to
                provide the highest quality flour products to local bakeries in Ajman.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                Over the decades, we've grown into one of the UAE's most trusted flour suppliers, serving major
                hypermarkets, bakeries, and food manufacturers across the region.
              </p>
              <Button size="lg" className="text-lg" asChild>
                <Link href="/about">
                  Our Story <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-secondary/30 dark:bg-gray-800 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Our Flour
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                Experience the difference that premium quality ingredients make in your baking results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Premium Quality",
                  description: "Sourced from the finest wheat varieties for consistent baking results.",
                  icon: "🌾",
                },
                {
                  title: "Consistent Performance",
                  description: "Reliable flour that performs the same way, every time you bake.",
                  icon: "✅",
                },
                {
                  title: "Nutritional Value",
                  description: "Preserves essential nutrients for healthier baked goods.",
                  icon: "🥗",
                },
                {
                  title: "Expert Support",
                  description: "Technical baking advice from our experienced team.",
                  icon: "👨‍🍳",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Product Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Discover our range of premium flour products designed for various baking needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Premium Wheat Flour",
                description: "All-purpose flour perfect for everyday baking needs.",
                image: "/images/product-1.jpg",
              },
              {
                name: "Whole Wheat Flour",
                description: "Nutritious flour with the goodness of whole wheat.",
                image: "/images/product-2.jpg",
              },
              {
                name: "Specialty Flour",
                description: "Specialized flour varieties for specific baking requirements.",
                image: "/images/product-3.jpg",
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="overflow-hidden h-full border-none shadow-md">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{category.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
                    <Button variant="outline" className="group" asChild>
                      <Link href={`/products`}>
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-32">
          <div className="container mx-auto px-4 mb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Featured Products</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl">
                  Discover our range of premium flour products designed for professional baking and food production.
                </p>
              </div>
              <Button variant="outline" className="text-gray-900 dark:text-white group" asChild>
                <Link href="/products" className="flex items-center gap-2">
                  View All Products
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <ProductShowcase />
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Trusted by leading bakeries and food manufacturers across the UAE.
            </p>
          </div>

          <TestimonialSlider />
        </section>

        {/* Contact Form Section */}
        <section className="container mx-auto px-4 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                Have questions about our products or need a custom flour solution? Our team is ready to help you find
                the perfect flour for your baking needs.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-primary-100 dark:bg-gray-800 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">+971 65673141</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary-100 dark:bg-gray-800 p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">althai.uae@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              <EnquiryForm />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-3xl p-12 md:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Elevate Your Baking?</h2>
                <p className="text-xl text-white/90 mb-8">
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
