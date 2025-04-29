"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "./product-card"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface Product {
  id: number
  name: string
  image: string
  description: string
  price: string
  weight: string
  category: string
  slug: string
}

export default function ProductList() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

      try {
        const supabase = createClientComponentClient()

        // Get filter params
        const categoryParam = searchParams.get("category")
        const weightParam = searchParams.get("weight")

        let query = supabase.from("products").select("*")

        if (categoryParam) {
          const categories = categoryParam.split(",")
          query = query.in("category", categories)
        }

        if (weightParam) {
          const weights = weightParam.split(",")
          query = query.in("weight", weights)
        }

        const { data, error } = await query.order("created_at", { ascending: false })

        if (error) {
          throw error
        }

        setProducts(data || [])
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchParams])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg h-96 animate-pulse"></div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your filters or check back later for new products.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
