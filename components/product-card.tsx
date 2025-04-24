"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface ProductCardProps {
  product: {
    id: number
    name: string
    image: string
    description: string
    price: string
    weight: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full overflow-hidden bg-gray-900 border-gray-800 transition-all duration-200 hover:shadow-lg hover:shadow-primary-900/20">
        <div className="aspect-square relative bg-gray-800">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3>
          <p className="text-gray-400 mb-4">{product.description}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-white">{product.price}</span>
            <span className="text-sm text-gray-500">{product.weight}</span>
          </div>
          <Button variant="outline" className="w-full group border-gray-700 text-white hover:bg-primary-600" asChild>
            <Link href={`/products/${product.id}`}>
              View Details
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
