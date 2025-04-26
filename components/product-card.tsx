"use client"

import { useState } from "react"
import Image from "next/image"
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
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
        <Card className="h-full overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg">
          <div
            className="aspect-square relative bg-gray-100 dark:bg-gray-700 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
          </div>
          <div className="p-6">
            <h3
              className="text-xl font-semibold mb-2 text-gray-900 dark:text-white cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              {product.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900 dark:text-white">{product.price}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{product.weight}</span>
            </div>
            <Button
              variant="outline"
              className="w-full group border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600"
              onClick={() => setIsModalOpen(true)}
            >
              View Details
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </Card>
      </motion.div>

      <ProductDetailModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
