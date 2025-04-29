import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient({ cookies })

  const { data: product } = await supabase.from("products").select("*").eq("slug", params.slug).single()

  if (!product) {
    return {
      title: "Product Not Found | Al Thai Foods",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: `${product.name} | Al Thai Foods`,
    description: product.meta_description || product.description,
  }
}

async function getProduct(slug: string) {
  const supabase = createServerComponentClient({ cookies })

  const { data: product, error } = await supabase.from("products").select("*").eq("slug", slug).single()

  if (error || !product) {
    return null
  }

  return product
}

async function getRelatedProducts(category: string, currentSlug: string) {
  const supabase = createServerComponentClient({ cookies })

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("slug", currentSlug)
    .limit(3)

  return products || []
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category, params.slug)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link href="/products" className="text-gray-600 hover:text-primary-600 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="object-contain max-h-[500px]"
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-primary-600 mr-4">{product.price}</span>
                <span className="text-gray-500">{product.weight}</span>
              </div>

              <div className="prose prose-lg max-w-none mb-8 text-gray-700">
                <p>{product.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2 text-gray-900">Product Details</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <span className="font-medium">Category:</span> {product.category}
                  </li>
                  <li>
                    <span className="font-medium">Weight:</span> {product.weight}
                  </li>
                  <li>
                    <span className="font-medium">Stock:</span> {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Related Products</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="aspect-square relative bg-gray-100">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">{relatedProduct.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{relatedProduct.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary-600 font-medium">{relatedProduct.price}</span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/products/${relatedProduct.slug}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
