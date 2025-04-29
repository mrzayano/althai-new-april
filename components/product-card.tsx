"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import ProductDetailModal from "./product-detail-modal"

interface ProductCardProps {
  product: {
    id: number
    name: string
    image: string
    description: string
    price: string
    weight: string
    category: string
    slug: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
        <Card className="h-full overflow-hidden bg-white border-gray-200 transition-all duration-200 hover:shadow-lg">
          <div className="aspect-square relative bg-gray-50 cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
          </div>
          <div className="p-6">
            <h3
              className="text-xl font-semibold mb-2 text-gray-900 cursor-pointer hover:text-primary-600 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              {product.name}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900">{product.price}</span>
              <span className="text-sm text-gray-500">{product.weight}</span>
            </div>
            <Button
              variant="outline"
              className="w-full group border-gray-300 text-gray-900 hover:bg-primary-600 hover:text-white hover:border-primary-600"
              asChild
            >
              <Link href={`/products/${product.slug}`}>
                View Details
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Card>
      </motion.div>

      <ProductDetailModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
