import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search } from "lucide-react"
import BlogPostCard from "@/components/blog-post-card"
import BlogCategoriesList from "@/components/blog-categories-list"
import { Skeleton } from "@/components/ui/skeleton"

const recentBlogPosts = [
  {
    id: 1,
    title: "The Art of Perfect Bread Making",
    excerpt:
      "Learn the secrets to baking the perfect loaf with our premium flour. We dive into the techniques used by professional bakers to achieve that perfect crust and soft interior.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 10, 2023",
    author: "Sarah Ahmed",
    category: "Recipes",
  },
  {
    id: 2,
    title: "From Farm to Table: Our Flour Journey",
    excerpt:
      "Discover how we source the finest wheat to create our premium flour products. We follow the journey from the wheat fields to your table, ensuring quality at every step.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 22, 2023",
    author: "Mohammed Al Farsi",
    category: "Company News",
  },
  {
    id: 3,
    title: "Health Benefits of Whole Wheat Flour",
    excerpt:
      "Explore the nutritional advantages of incorporating whole wheat flour in your diet. Learn about the essential nutrients and how they contribute to overall well-being.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 5, 2023",
    author: "Dr. Layla Mahmoud",
    category: "Nutrition",
  },
  {
    id: 4,
    title: "10 Creative Recipes Using Specialty Flour",
    excerpt:
      "Get inspired with ten innovative recipes that showcase the versatility of our specialty flour. From savory dishes to sweet treats, there's something for everyone.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 18, 2023",
    author: "Chef Ahmad Kazim",
    category: "Recipes",
  },
  {
    id: 5,
    title: "The Science Behind Gluten Development",
    excerpt:
      "Understand the fascinating science of gluten development and how it affects your baking results. Learn why protein content matters and how to achieve different textures.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 3, 2023",
    author: "Prof. Fatima Al-Khouri",
    category: "Education",
  },
  {
    id: 6,
    title: "Al Thai Foods Expands Distribution Network",
    excerpt:
      "We're excited to announce the expansion of our distribution network to better serve our customers across the UAE and beyond with faster deliveries.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 15, 2023",
    author: "Abdullah Malik",
    category: "Company News",
  },
]

export const metadata = {
  title: "Blog | Al Thai Foods",
  description: "Discover baking tips, flour insights, recipes, and company updates from our expert team.",
}

export default function BlogPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Discover baking tips, flour insights, and company updates from our expert team.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Main Content */}
            <div className="w-full md:w-2/3">
              <div className="mb-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search articles..." className="pl-10" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <Suspense fallback={<BlogPostsSkeleton />}>
                  {recentBlogPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} variant="horizontal" />
                  ))}
                </Suspense>
              </div>

              <div className="mt-12 flex justify-center">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-1/3 space-y-8">
              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <BlogCategoriesList />
              </div>

              {/* Featured Post */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Featured Post</h3>
                <div className="space-y-4">
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="The Art of Perfect Bread Making"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-lg">The Art of Perfect Bread Making</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Learn the secrets to baking the perfect loaf with our premium flour.
                  </p>
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href="/blog/1">
                      Read more <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-primary-50 dark:bg-gray-800 rounded-lg border border-primary-100 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Get the latest updates, recipes, and baking tips directly to your inbox.
                </p>
                <div className="space-y-4">
                  <Input placeholder="Your email address" />
                  <Button className="w-full">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function BlogPostsSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
          <div className="w-full md:w-2/3 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </>
  )
}
