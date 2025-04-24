"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Filter, X } from "lucide-react"
import { ClientSearchParams } from "@/components/client-search-params"

export default function ProductFilters() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 100])
  const [categories, setCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")

  const toggleFilter = () => setIsOpen(!isOpen)

  const categoryOptions = [
    { id: "wheat", label: "Wheat Flour" },
    { id: "whole-wheat", label: "Whole Wheat" },
    { id: "specialty", label: "Specialty" },
    { id: "organic", label: "Organic" },
  ]

  const applyFilters = (searchParams: URLSearchParams) => {
    // Build the query string
    const params = new URLSearchParams(searchParams)

    // Add price range
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    // Add categories
    params.delete("category")
    categories.forEach((cat) => {
      params.append("category", cat)
    })

    // Add sort
    params.set("sort", sortBy)

    // Update URL
    router.push(`/products?${params.toString()}`)
  }

  const resetFilters = () => {
    setPriceRange([0, 100])
    setCategories([])
    setSortBy("featured")
    router.push("/products")
  }

  return (
    <ClientSearchParams>
      {(searchParams) => (
        <>
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6 flex justify-between items-center">
            <Button variant="outline" onClick={toggleFilter} className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <div>
              <Label>Sort By:</Label>
              <select
                className="ml-2 p-2 border rounded-md text-sm bg-gray-900 text-white border-gray-700"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  const params = new URLSearchParams(searchParams)
                  params.set("sort", e.target.value)
                  router.push(`/products?${params.toString()}`)
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          <div
            className={`lg:hidden fixed inset-0 bg-black z-50 transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-white">Filters</h3>
              <Button variant="ghost" size="icon" onClick={toggleFilter} className="text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 overflow-auto h-[calc(100vh-70px)]">
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3 text-white">Price Range</h4>
                  <Slider
                    defaultValue={priceRange}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>AED {priceRange[0]}</span>
                    <span>AED {priceRange[1]}</span>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-3 text-white">Categories</h4>
                  <div className="space-y-2">
                    {categoryOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-category-${option.id}`}
                          checked={categories.includes(option.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setCategories([...categories, option.id])
                            } else {
                              setCategories(categories.filter((cat) => cat !== option.id))
                            }
                          }}
                        />
                        <Label htmlFor={`mobile-category-${option.id}`} className="text-gray-300">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h4 className="font-medium mb-3 text-white">Sort By</h4>
                  <RadioGroup value={sortBy} onValueChange={setSortBy}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="featured" id="mobile-sort-featured" />
                      <Label htmlFor="mobile-sort-featured" className="text-gray-300">
                        Featured
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="price-asc" id="mobile-sort-price-asc" />
                      <Label htmlFor="mobile-sort-price-asc" className="text-gray-300">
                        Price: Low to High
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="price-desc" id="mobile-sort-price-desc" />
                      <Label htmlFor="mobile-sort-price-desc" className="text-gray-300">
                        Price: High to Low
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="newest" id="mobile-sort-newest" />
                      <Label htmlFor="mobile-sort-newest" className="text-gray-300">
                        Newest
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <Button onClick={resetFilters} variant="outline" className="flex-1">
                  Reset
                </Button>
                <Button
                  onClick={() => {
                    applyFilters(searchParams)
                    toggleFilter()
                  }}
                  className="flex-1"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Filters */}
          <Card className="sticky top-32 hidden lg:block bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3 text-white">Price Range</h4>
                <Slider
                  defaultValue={priceRange}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>AED {priceRange[0]}</span>
                  <span>AED {priceRange[1]}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-800 my-4"></div>

              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3 text-white">Categories</h4>
                <div className="space-y-2">
                  {categoryOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${option.id}`}
                        checked={categories.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCategories([...categories, option.id])
                          } else {
                            setCategories(categories.filter((cat) => cat !== option.id))
                          }
                        }}
                      />
                      <Label htmlFor={`category-${option.id}`} className="text-gray-300">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-800 my-4"></div>

              {/* Sort By */}
              <div>
                <h4 className="font-medium mb-3 text-white">Sort By</h4>
                <RadioGroup value={sortBy} onValueChange={setSortBy}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="featured" id="sort-featured" />
                    <Label htmlFor="sort-featured" className="text-gray-300">
                      Featured
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-asc" id="sort-price-asc" />
                    <Label htmlFor="sort-price-asc" className="text-gray-300">
                      Price: Low to High
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-desc" id="sort-price-desc" />
                    <Label htmlFor="sort-price-desc" className="text-gray-300">
                      Price: High to Low
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="newest" id="sort-newest" />
                    <Label htmlFor="sort-newest" className="text-gray-300">
                      Newest
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex space-x-4 mt-4">
                <Button onClick={resetFilters} variant="outline" className="flex-1">
                  Reset
                </Button>
                <Button onClick={() => applyFilters(searchParams)} className="flex-1">
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </ClientSearchParams>
  )
}
