"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", name: "All Categories", count: 18 },
  { id: "recipes", name: "Recipes", count: 7 },
  { id: "company-news", name: "Company News", count: 3 },
  { id: "nutrition", name: "Nutrition", count: 4 },
  { id: "education", name: "Education", count: 2 },
  { id: "tips", name: "Baking Tips", count: 2 },
]

export default function BlogCategoriesList() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={category.id === "all" ? "/blog" : `/blog/category/${category.id}`}
          onClick={() => setActiveCategory(category.id)}
          className={cn(
            "flex justify-between items-center py-2 px-3 rounded-md transition-colors",
            activeCategory === category.id
              ? "bg-primary-50 text-primary-600 dark:bg-gray-700 dark:text-primary-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300",
          )}
        >
          <span>{category.name}</span>
          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
            {category.count}
          </span>
        </Link>
      ))}
    </div>
  )
}
