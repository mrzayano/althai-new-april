"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Featured products data
const featuredProducts = [
  {
    id: 1,
    name: "Premium Wheat Flour",
    description: "Our highest quality flour for professional baking.",
    image: "/images/product-1.jpg",
    color: "#FFE8E8",
  },
  {
    id: 2,
    name: "Chakki Fresh Atta",
    description: "Traditional stone-ground whole wheat flour.",
    image: "/images/product-2.jpg",
    color: "#FFF5E8",
  },
  {
    id: 3,
    name: "Specialty Pastry Flour",
    description: "Fine-textured flour ideal for pastries and cakes.",
    image: "/images/product-3.jpg",
    color: "#E8F0FF",
  },
]

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div style={{ x }} className="flex gap-8 pl-[40%]">
        {featuredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </motion.div>
    </div>
  )
}

interface ProductCardProps {
  product: {
    id: number
    name: string
    description: string
    image: string
    color: string
  }
  index: number
}

function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex-shrink-0 w-[500px] h-[600px] rounded-3xl overflow-hidden relative group"
      style={{ backgroundColor: product.color }}
    >
      <div className="relative h-[400px] w-full">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-700 mb-6">{product.description}</p>
        <Button
          variant="outline"
          className="group border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
          asChild
        >
          <Link href={`/products/${product.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}
