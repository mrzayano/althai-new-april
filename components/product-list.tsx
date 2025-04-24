"use client"

import { useState, useEffect, useCallback } from "react"
import ProductCard from "@/components/product-card"
import { Icons } from "@/components/icons"
import { ClientSearchParams } from "@/components/client-search-params"

// Mock data - this would normally come from an API
const allProducts = [
  {
    id: 1,
    name: "Premium Wheat Flour",
    image: "/images/product-1.jpg",
    description: "All-purpose premium wheat flour for professional baking.",
    price: "AED 25.00",
    weight: "25kg",
    category: "wheat",
  },
  {
    id: 2,
    name: "Chakki Fresh Atta",
    image: "/images/product-2.jpg",
    description: "Traditional stone-ground whole wheat flour.",
    price: "AED 22.00",
    weight: "25kg",
    category: "whole-wheat",
  },
  {
    id: 3,
    name: "Specialty Pastry Flour",
    image: "/images/product-3.jpg",
    description: "Fine-textured flour ideal for pastries and cakes.",
    price: "AED 30.00",
    weight: "25kg",
    category: "specialty",
  },
  {
    id: 4,
    name: "Organic Whole Wheat Flour",
    image: "/images/product-4.jpg",
    description: "Certified organic whole wheat flour for health-conscious baking.",
    price: "AED 35.00",
    weight: "25kg",
    category: "organic,whole-wheat",
  },
  {
    id: 5,
    name: "Bread Flour",
    image: "/images/product-5.jpg",
    description: "High-protein flour perfect for artisanal bread making.",
    price: "AED 28.00",
    weight: "25kg",
    category: "wheat,specialty",
  },
  {
    id: 6,
    name: "Maida Flour",
    image: "/images/product-6.jpg",
    description: "Refined wheat flour ideal for making flatbreads and pastries.",
    price: "AED 24.00",
    weight: "25kg",
    category: "wheat",
  },
  {
    id: 7,
    name: "Gluten-Free Flour Blend",
    image: "/images/product-7.jpg",
    description: "Special blend for gluten-free baking needs.",
    price: "AED 40.00",
    weight: "20kg",
    category: "specialty",
  },
  {
    id: 8,
    name: "Organic Rye Flour",
    image: "/images/product-8.jpg",
    description: "Organic rye flour for rustic breads and baking.",
    price: "AED 38.00",
    weight: "20kg",
    category: "organic,specialty",
  },
  {
    id: 9,
    name: "Multigrain Flour Mix",
    image: "/images/product-9.jpg",
    description: "Nutritious blend of multiple grains for healthy baking.",
    price: "AED 32.00",
    weight: "25kg",
    category: "specialty,whole-wheat",
  },
]

export default function ProductList() {
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search))

  const filterProducts = useCallback(() => {
    // Simulate data loading
    setIsLoading(true)

    // Parse filter parameters
    const minPrice = Number(searchParams.get("minPrice") || 0)
    const maxPrice = Number(searchParams.get("maxPrice") || 100)
    const categories = searchParams.getAll("category")
    const sort = searchParams.get("sort") || "featured"

    // Filter products based on criteria
    let filtered = [...allProducts]

    // Price filter
    filtered = filtered.filter((product) => {
      const price = Number.parseFloat(product.price.replace("AED ", ""))
      return price >= minPrice && price <= maxPrice
    })

    // Category filter
    if (categories.length > 0) {
      filtered = filtered.filter((product) => {
        const productCategories = product.category.split(",")
        return categories.some((cat) => productCategories.includes(cat))
      })
    }

    // Sort products
    if (sort === "price-asc") {
      filtered.sort(
        (a, b) => Number.parseFloat(a.price.replace("AED ", "")) - Number.parseFloat(b.price.replace("AED ", "")),
      )
    } else if (sort === "price-desc") {
      filtered.sort(
        (a, b) => Number.parseFloat(b.price.replace("AED ", "")) - Number.parseFloat(a.price.replace("AED ", "")),
      )
    } else if (sort === "newest") {
      // In a real app, you would sort by date
      filtered.sort((a, b) => b.id - a.id)
    }

    // Update state with filtered products
    setTimeout(() => {
      setFilteredProducts(filtered)
      setIsLoading(false)
    }, 500) // Simulate network delay
  }, [searchParams])

  useEffect(() => {
    filterProducts()
  }, [filterProducts])

  return (
    <ClientSearchParams>
      {(sp) => {
        useEffect(() => {
          setSearchParams(sp)
        }, [sp])

        if (isLoading) {
          return <ProductsSkeleton />
        }

        if (filteredProducts.length === 0) {
          return (
            <div className="text-center py-12 bg-gray-900 rounded-2xl">
              <Icons.emptyBox className="h-16 w-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-lg font-medium mb-2 text-white">No Products Found</h3>
              <p className="text-gray-400">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )
        }

        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )
      }}
    </ClientSearchParams>
  )
}

// Skeleton loader component
export function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-gray-900 rounded-2xl overflow-hidden">
          <div className="h-64 bg-gray-800 animate-pulse" />
          <div className="p-6 space-y-3">
            <div className="h-6 bg-gray-800 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-800 rounded animate-pulse" />
            <div className="h-4 bg-gray-800 rounded animate-pulse w-1/2" />
            <div className="flex justify-between">
              <div className="h-6 bg-gray-800 rounded animate-pulse w-1/4" />
              <div className="h-6 bg-gray-800 rounded animate-pulse w-1/4" />
            </div>
            <div className="h-10 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}
