"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  stock: z.coerce.number().int().nonnegative({
    message: "Stock must be a non-negative integer.",
  }),
  featured: z.boolean().default(false),
  specifications: z
    .array(
      z.object({
        key: z.string().min(1, { message: "Specification key is required" }),
        value: z.string().min(1, { message: "Specification value is required" }),
      }),
    )
    .default([]),
})

type ProductFormValues = z.infer<typeof productFormSchema>

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("basic")

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      featured: false,
      specifications: [{ key: "", value: "" }],
    },
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const supabase = getSupabaseBrowserClient()
        const { data: product, error } = await supabase.from("products").select("*").eq("id", params.id).single()

        if (error) throw error

        if (product) {
          form.reset({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
            featured: product.featured,
            specifications: product.specifications || [{ key: "", value: "" }],
          })

          if (product.images && product.images.length > 0) {
            setExistingImages(product.images)
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        toast({
          title: "Error",
          description: "Failed to load product data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, form, toast])

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsSubmitting(true)
      const supabase = getSupabaseBrowserClient()

      // Upload new images if any
      const uploadedImageUrls = []

      if (images.length > 0) {
        for (const image of images) {
          const fileExt = image.name.split(".").pop()
          const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
          const filePath = `products/${fileName}`

          const { error: uploadError } = await supabase.storage.from("product-images").upload(filePath, image)

          if (uploadError) {
            throw new Error(`Error uploading image: ${uploadError.message}`)
          }

          const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(filePath)

          uploadedImageUrls.push(urlData.publicUrl)
        }
      }

      // Combine existing and new images
      const allImages = [...existingImages, ...uploadedImageUrls]

      // Update product data
      const { error } = await supabase
        .from("products")
        .update({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
          featured: data.featured,
          specifications: data.specifications,
          images: allImages,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)

      if (error) throw error

      toast({
        title: "Product updated",
        description: "Your product has been updated successfully.",
      })

      router.push("/admin/products")
      router.refresh()
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description: "There was an error updating the product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async () => {
    try {
      setIsDeleting(true)
      const supabase = getSupabaseBrowserClient()

      const { error } = await supabase.from("products").delete().eq("id", params.id)

      if (error) throw error

      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully.",
      })

      router.push("/admin/products")
      router.refresh()
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: "There was an error deleting the product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files)
      setImages((prev) => [...prev, ...newImages])

      // Create preview URLs
      const newImageUrls = newImages.map((file) => URL.createObjectURL(file))
      setImageUrls((prev) => [...prev, ...newImageUrls])
    }
  }

  const removeNewImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imageUrls[index])
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index))
  }

  const addSpecification = () => {
    const currentSpecs = form.getValues("specifications") || []
    form.setValue("specifications", [...currentSpecs, { key: "", value: "" }])
  }

  const removeSpecification = (index: number) => {
    const currentSpecs = form.getValues("specifications") || []
    form.setValue(
      "specifications",
      currentSpecs.filter((_, i) => i !== index),
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/admin/products")}>
            Cancel
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Product</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the product and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteProduct}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Update the details of your product. All fields marked with * are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <TabsContent value="basic">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter product name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="all-purpose-flour">All Purpose Flour</SelectItem>
                              <SelectItem value="bread-flour">Bread Flour</SelectItem>
                              <SelectItem value="cake-flour">Cake Flour</SelectItem>
                              <SelectItem value="whole-wheat-flour">Whole Wheat Flour</SelectItem>
                              <SelectItem value="specialty-flour">Specialty Flour</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (AED) *</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock Quantity *</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Featured Product</FormLabel>
                            <FormDescription>Display this product on the homepage featured section</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel>Description *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter product description" className="min-h-[200px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="images">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="product-images">Product Images</Label>
                      <div className="mt-2">
                        <Label
                          htmlFor="product-images"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Plus className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or WEBP (MAX. 5MB)</p>
                          </div>
                          <Input
                            id="product-images"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </Label>
                      </div>
                    </div>

                    {existingImages.length > 0 && (
                      <>
                        <h3 className="text-lg font-medium">Existing Images</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {existingImages.map((url, index) => (
                            <div key={`existing-${index}`} className="relative group">
                              <img
                                src={url || "/placeholder.svg"}
                                alt={`Product image ${index + 1}`}
                                className="h-40 w-full object-cover rounded-lg"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeExistingImage(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {imageUrls.length > 0 && (
                      <>
                        <h3 className="text-lg font-medium">New Images</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {imageUrls.map((url, index) => (
                            <div key={`new-${index}`} className="relative group">
                              <img
                                src={url || "/placeholder.svg"}
                                alt={`New product image ${index + 1}`}
                                className="h-40 w-full object-cover rounded-lg"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeNewImage(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="specifications">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Product Specifications</h3>
                      <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                        <Plus className="h-4 w-4 mr-2" /> Add Specification
                      </Button>
                    </div>

                    {form.watch("specifications")?.map((_, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        <FormField
                          control={form.control}
                          name={`specifications.${index}.key`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Specification Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Weight, Size, etc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex items-end gap-2">
                          <FormField
                            control={form.control}
                            name={`specifications.${index}.value`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 1kg, 30cm, etc." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="mb-2"
                            onClick={() => removeSpecification(index)}
                            disabled={form.watch("specifications").length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <div className="flex justify-end pt-6 border-t">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Product
                  </Button>
                </div>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
