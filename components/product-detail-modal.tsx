"use client"

import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ExternalLink } from "lucide-react"

interface ProductDetailModalProps {
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
  isOpen: boolean
  onClose: () => void
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-50 p-6 flex items-center justify-center">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="object-contain max-h-[300px]"
            />
          </div>
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">{product.name}</DialogTitle>
              <DialogDescription className="text-gray-500">{product.category}</DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary-600">{product.price}</span>
                <span className="text-gray-500">{product.weight}</span>
              </div>

              <p className="text-gray-700">{product.description}</p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button className="flex-1">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link href={`/products/${product.slug}`}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Full Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
