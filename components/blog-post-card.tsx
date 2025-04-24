"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface BlogPostCardProps {
  post: {
    id: number
    title: string
    excerpt: string
    image: string
    date: string
    author: string
    category: string
  }
  variant?: "default" | "horizontal"
}

export default function BlogPostCard({ post, variant = "default" }: BlogPostCardProps) {
  if (variant === "horizontal") {
    return (
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
        <Card className="overflow-hidden border-gray-200 dark:border-gray-800 transition-all duration-200 hover:shadow-md">
          <div className="flex flex-col md:flex-row">
            <div
              className={cn(
                "md:w-1/3 relative",
                variant === "horizontal" ? "aspect-video md:aspect-auto" : "aspect-video",
              )}
            >
              <Link href={`/blog/${post.id}`} className="block h-full">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>
            <CardContent className="flex-1 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">
                  {post.category}
                </Badge>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  {post.date}
                </div>
              </div>
              <Link href={`/blog/${post.id}`} className="block group">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
              <div className="flex items-center">
                <span className="text-sm font-medium">By {post.author}</span>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full overflow-hidden border-gray-200 dark:border-gray-800 transition-all duration-200 hover:shadow-md">
        <Link href={`/blog/${post.id}`} className="block">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
              <CalendarIcon className="h-3 w-3 mr-1" />
              {post.date}
            </div>
          </div>
          <Link href={`/blog/${post.id}`} className="block group">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">{post.title}</h3>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center">
            <span className="text-sm font-medium">By {post.author}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
