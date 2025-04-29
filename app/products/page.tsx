import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductFilters from "@/components/product-filters"
import ProductList from "@/components/product-list"
import ProductsSkeleton from "@/components/products-skeleton"

export const metadata = {
  title: "Products | Al Thai Foods",
  description: "Explore our range of premium flour products for retailers, hypermarkets, and bakeries.",
}

export default function ProductsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center bg-white">
        <div className="absolute inset-0 z-0">
          <Image src="/images/products-hero.jpg" alt="Al Thai Foods products" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Products</h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Discover our premium range of flour products, designed to meet the highest quality standards for
              professional baking and food production.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Suspense fallback={<div className="h-96 bg-gray-100 rounded-2xl animate-pulse"></div>}>
                <ProductFilters />
              </Suspense>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <Suspense fallback={<ProductsSkeleton />}>
                <ProductList />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-3xl p-12 md:p-20 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Need Bulk Orders?</h2>
                <p className="text-xl text-white/90 mb-8">
                  Contact our sales team for volume pricing and special delivery options for bulk orders. We offer
                  competitive rates for businesses of all sizes.
                </p>
                <Button size="lg" className="text-lg bg-white text-primary-900 hover:bg-gray-100" asChild>
                  <Link href="/contact">Contact Sales Team</Link>
                </Button>
              </div>
              <div className="relative h-80 lg:h-full">
                <Image
                  src="/images/bulk-flour.jpg"
                  alt="Bulk flour orders"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
