"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, Clock, Wheat, BarChart, Truck } from "lucide-react"
import TeamMember from "@/components/team-member"
import { cn } from "@/lib/utils"

export default function AboutPage() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center bg-white">
        <div className="absolute inset-0 z-0">
          <Image src="/images/about-hero.jpg" alt="Al Thai Foods facility" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Story</h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              From humble beginnings to becoming the UAE's leading flour supplier, discover the journey that shaped Al
              Thai Foods.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our History */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <p className="text-gray-700 text-lg mb-6">
                Founded in 1995, Al Thai Foods began as a small family-owned flour mill with a simple mission: to
                provide the highest quality flour products to local bakeries in Ajman.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                Over the decades, we've grown into one of the UAE's most trusted flour suppliers, serving major
                hypermarkets, bakeries, and food manufacturers across the region.
              </p>
              <p className="text-gray-700 text-lg">
                Today, we combine traditional milling expertise with modern technology to deliver premium flour products
                that meet the highest international standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image src="/images/mill-facility.jpg" alt="Al Thai Foods mill facility" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Our Timeline</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Key milestones in our journey to becoming the UAE's premier flour supplier.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200" />

            {/* Timeline items */}
            {[
              {
                year: "1995",
                title: "Foundation",
                description: "Al Thai Foods was established as a small family-owned flour mill in Ajman, UAE.",
                align: "right",
              },
              {
                year: "2002",
                title: "Expansion",
                description: "Expanded operations with new milling equipment and increased production capacity.",
                align: "left",
              },
              {
                year: "2008",
                title: "Quality Certification",
                description: "Received ISO 9001 certification for quality management systems.",
                align: "right",
              },
              {
                year: "2013",
                title: "Product Diversification",
                description:
                  "Introduced specialty flour products and organic flour lines to meet growing market demands.",
                align: "left",
              },
              {
                year: "2018",
                title: "Regional Distribution",
                description: "Expanded distribution network to cover all emirates and neighboring GCC countries.",
                align: "right",
              },
              {
                year: "2023",
                title: "Modern Facility",
                description:
                  "Opened state-of-the-art milling facility with advanced technology and increased capacity.",
                align: "left",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "relative mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
                  item.align === "left" ? "md:text-right" : "md:text-left",
                )}
              >
                <div className={item.align === "left" ? "md:order-1" : "md:order-2"}>
                  <div className="bg-white p-8 rounded-2xl shadow-md">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex justify-center md:justify-center items-center",
                    item.align === "left" ? "md:order-2" : "md:order-1",
                  )}
                >
                  <div className="bg-primary-600 text-white text-xl font-bold w-16 h-16 rounded-full flex items-center justify-center z-10 shadow-lg">
                    {item.year}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do at Al Thai Foods.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Quality Excellence",
                description:
                  "We are committed to delivering the highest quality flour products that exceed industry standards.",
              },
              {
                icon: Users,
                title: "Customer Focus",
                description:
                  "Our customers' success is our success. We work closely with them to understand and meet their specific needs.",
              },
              {
                icon: Wheat,
                title: "Sustainable Sourcing",
                description:
                  "We carefully select our wheat from sustainable sources to ensure both quality and environmental responsibility.",
              },
              {
                icon: BarChart,
                title: "Continuous Improvement",
                description:
                  "We constantly innovate and improve our processes, products, and services to stay ahead of market demands.",
              },
              {
                icon: Truck,
                title: "Reliable Service",
                description:
                  "We pride ourselves on dependable delivery and consistent product quality that our customers can count on.",
              },
              {
                icon: Clock,
                title: "Timely Delivery",
                description:
                  "We understand the importance of timely delivery in the food industry and make it a priority in our operations.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
              >
                <div className="h-12 w-12 bg-primary-50 rounded-lg flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Our Leadership</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Meet the team driving Al Thai Foods' vision and success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmed Al Thani",
                position: "Founder & CEO",
                image: "/images/team-1.jpg",
                bio: "With over 30 years in the flour industry, Ahmed founded Al Thai Foods with a vision to provide premium quality flour products across the UAE.",
              },
              {
                name: "Fatima Qasim",
                position: "Chief Operations Officer",
                image: "/images/team-2.jpg",
                bio: "Fatima oversees all operational aspects of Al Thai Foods, ensuring efficient production and delivery processes.",
              },
              {
                name: "Mohammed Al Farsi",
                position: "Head of Quality Control",
                image: "/images/team-3.jpg",
                bio: "Mohammed leads our quality assurance team, implementing rigorous testing protocols to maintain our high standards.",
              },
              {
                name: "Sarah Ahmed",
                position: "Marketing Director",
                image: "/images/team-4.jpg",
                bio: "Sarah drives our brand strategy and marketing initiatives, helping us connect with customers across the region.",
              },
              {
                name: "Khalid Rahman",
                position: "Supply Chain Manager",
                image: "/images/team-5.jpg",
                bio: "Khalid ensures the smooth flow of raw materials and finished products throughout our supply chain.",
              },
              {
                name: "Layla Mahmoud",
                position: "R&D Specialist",
                image: "/images/team-6.jpg",
                bio: "Layla leads our product development efforts, creating innovative flour solutions to meet evolving market needs.",
              },
            ].map((member, index) => (
              <TeamMember key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Our Facilities</h2>
              <p className="text-gray-700 text-lg mb-6">
                Our state-of-the-art milling facility in Ajman combines traditional expertise with modern technology to
                produce the finest flour products.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                With a production capacity of over 500 tons per day, we can meet the demands of businesses of all sizes,
                from small local bakeries to major hypermarkets and food manufacturers.
              </p>
              <p className="text-gray-700 text-lg mb-8">
                Our facility is equipped with advanced quality control laboratories, ensuring that every batch of flour
                meets our rigorous standards before reaching our customers.
              </p>
              <Button size="lg" className="text-lg" asChild>
                <Link href="/contact">
                  Schedule a Visit <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-64 rounded-xl overflow-hidden shadow-md"
              >
                <Image src="/images/facility-1.jpg" alt="Milling equipment" fill className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative h-64 rounded-xl overflow-hidden shadow-md"
              >
                <Image src="/images/facility-2.jpg" alt="Quality control lab" fill className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative h-64 rounded-xl overflow-hidden shadow-md"
              >
                <Image src="/images/facility-3.jpg" alt="Packaging line" fill className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative h-64 rounded-xl overflow-hidden shadow-md"
              >
                <Image src="/images/facility-4.jpg" alt="Warehouse" fill className="object-cover" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-3xl p-12 md:p-20 text-center shadow-xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Experience Premium Quality?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join the hundreds of businesses across the UAE that trust Al Thai Foods for their flour needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary-900 hover:bg-gray-100 text-lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg" asChild>
                <Link href="/products">Explore Products</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
