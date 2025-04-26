"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, X, Minus, Plus } from "lucide-react"

interface ProductDetailModalProps {
  product: {
    id: number
    name: string
    image: string
    description: string
    price: string
    weight: string
    category: string
    details?: string
    options?: { name: string; values: string[] }[]
  }
  isOpen: boolean
  onClose: () => void
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, this would be a call to your Supabase backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Order Submitted",
        description: "Thank you for your order. We'll get back to you shortly.",
      })

      // Reset form
      setQuantity(1)
      setSelectedOptions({})
      setContactInfo({
        name: "",
        email: "",
        phone: "",
        message: "",
      })

      // Close modal
      onClose()
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
          <DialogDescription>
            <span className="text-primary-600 font-medium">{product.price}</span> · {product.weight}
          </DialogDescription>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Product Image */}
          <div className="relative h-[300px] md:h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
          </div>

          {/* Product Info & Order Form */}
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-400">{product.description}</p>

              {product.details && (
                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-400">{product.details}</p>
                </div>
              )}

              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Category: <span className="text-gray-700 dark:text-gray-300">{product.category}</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Order Information</h3>

                  {/* Quantity Selector */}
                  <div className="mb-4">
                    <Label htmlFor="quantity">Quantity</Label>
                    <div className="flex items-center mt-1">
                      <Button type="button" variant="outline" size="icon" onClick={decrementQuantity}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                        className="w-20 text-center mx-2"
                      />
                      <Button type="button" variant="outline" size="icon" onClick={incrementQuantity}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Options */}
                  {product.options && product.options.length > 0 && (
                    <div className="space-y-4">
                      {product.options.map((option) => (
                        <div key={option.name}>
                          <Label htmlFor={option.name}>{option.name}</Label>
                          <select
                            id={option.name}
                            className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={selectedOptions[option.name] || ""}
                            onChange={(e) => handleOptionChange(option.name, e.target.value)}
                          >
                            <option value="">Select {option.name}</option>
                            {option.values.map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={contactInfo.name} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={contactInfo.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={contactInfo.phone} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="message">Additional Information (Optional)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={contactInfo.message}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Submit Order"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
