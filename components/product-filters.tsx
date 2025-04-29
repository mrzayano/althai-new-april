"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const categories = [
  { id: "all-purpose", name: "All-Purpose Flour" },
  { id: "bread", name: "Bread Flour" },
  { id: "cake", name: "Cake Flour" },
  { id: "pastry", name: "Pastry Flour" },
  { id: "whole-wheat", name: "Whole Wheat Flour" },
  { id: "specialty", name: "Specialty Flour" },
]

const weights = [
  { id: "1kg", name: "1 kg" },
  { id: "5kg", name: "5 kg" },
  { id: "10kg", name: "10 kg" },
  { id: "25kg", name: "25 kg" },
  { id: "50kg", name: "50 kg" },
]

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedWeights, setSelectedWeights] = useState<string[]>([])

  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const weightParam = searchParams.get("weight")

    if (categoryParam) {
      setSelectedCategories(categoryParam.split(","))
    }

    if (weightParam) {
      setSelectedWeights(weightParam.split(","))
    }
  }, [searchParams])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  const handleWeightChange = (weightId: string) => {
    setSelectedWeights((prev) => {
      if (prev.includes(weightId)) {
        return prev.filter((id) => id !== weightId)
      } else {
        return [...prev, weightId]
      }
    })
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","))
    } else {
      params.delete("category")
    }

    if (selectedWeights.length > 0) {
      params.set("weight", selectedWeights.join(","))
    } else {
      params.delete("weight")
    }

    router.push(`/products?${params.toString()}`)
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedWeights([])
    router.push("/products")
  }

  return (
    <Card className="sticky top-24 border-0 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible defaultValue="categories">
          <AccordionItem value="categories" className="border-b-0">
            <AccordionTrigger className="py-3 text-base font-medium">Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-1">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                    />
                    <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="weights" className="border-b-0">
            <AccordionTrigger className="py-3 text-base font-medium">Weights</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-1">
                {weights.map((weight) => (
                  <div key={weight.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`weight-${weight.id}`}
                      checked={selectedWeights.includes(weight.id)}
                      onCheckedChange={() => handleWeightChange(weight.id)}
                    />
                    <Label htmlFor={`weight-${weight.id}`} className="text-sm cursor-pointer">
                      {weight.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={resetFilters} className="w-full">
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
