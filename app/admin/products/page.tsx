"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Package, Plus, MoreHorizontal, Pencil, Trash2, Search, Filter } from "lucide-react"

// Mock product data - would normally come from an API
const initialProducts = [
  {
    id: 1,
    name: "Premium Wheat Flour",
    image: "/placeholder.svg?height=100&width=100",
    price: "AED 25.00",
    weight: "25kg",
    stock: 120,
    category: "Wheat",
    status: "active",
  },
  {
    id: 2,
    name: "Chakki Fresh Atta",
    image: "/placeholder.svg?height=100&width=100",
    price: "AED 22.00",
    weight: "25kg",
    stock: 85,
    category: "Whole Wheat",
    status: "active",
  },
  {
    id: 3,
    name: "Specialty Pastry Flour",
    image: "/placeholder.svg?height=100&width=100",
    price: "AED 30.00",
    weight: "25kg",
    stock: 42,
    category: "Specialty",
    status: "active",
  },
  {
    id: 4,
    name: "Organic Whole Wheat Flour",
    image: "/placeholder.svg?height=100&width=100",
    price: "AED 35.00",
    weight: "25kg",
    stock: 28,
    category: "Organic",
    status: "active",
  },
  {
    id: 5,
    name: "Bread Flour",
    image: "/placeholder.svg?height=100&width=100",
    price: "AED 28.00",
    weight: "25kg",
    stock: 0,
    category: "Specialty",
    status: "out_of_stock",
  },
]

export default function ProductsAdminPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle delete product
  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
    toast({
      title: "Product Deleted",
      description: "The product has been successfully removed.",
    })
  }

  // Handle stock status change
  const handleStatusChange = (id: number, newStatus: string) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, status: newStatus } : product)))
    toast({
      title: "Status Updated",
      description: "The product status has been updated.",
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Link>
        </Button>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Category <MoreHorizontal className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                  <DropdownMenuItem>All Categories</DropdownMenuItem>
                  <DropdownMenuItem>Wheat</DropdownMenuItem>
                  <DropdownMenuItem>Whole Wheat</DropdownMenuItem>
                  <DropdownMenuItem>Specialty</DropdownMenuItem>
                  <DropdownMenuItem>Organic</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No products found. Try a different search query.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md overflow-hidden relative bg-gray-100">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.weight}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={product.status === "active" ? "default" : "secondary"}
                        className={
                          product.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {product.status === "active" ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/products/${product.id}`}>
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(product.id, product.status === "active" ? "out_of_stock" : "active")
                            }
                          >
                            <Package className="mr-2 h-4 w-4" />
                            {product.status === "active" ? "Mark as Out of Stock" : "Mark as In Stock"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
