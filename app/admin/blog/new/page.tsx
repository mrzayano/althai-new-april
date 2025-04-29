"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import BlogEditor from "@/components/admin/blog-editor"

const blogPostSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  slug: z
    .string()
    .min(5, {
      message: "Slug must be at least 5 characters.",
    })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),
  excerpt: z
    .string()
    .min(10, {
      message: "Excerpt must be at least 10 characters.",
    })
    .max(300, {
      message: "Excerpt must not exceed 300 characters.",
    }),
  content: z.string().min(50, {
    message: "Content must be at least 50 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  status: z.enum(["published", "draft"]),
  featured: z.boolean().default(false),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
})

type BlogPostFormValues = z.infer<typeof blogPostSchema>

const defaultValues: Partial<BlogPostFormValues> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  status: "draft",
  featured: false,
  meta_title: "",
  meta_description: "",
}

export default function NewBlogPostPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string>("")
  const [activeTab, setActiveTab] = useState("basic")
  const supabase = createClientComponentClient()

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues,
  })

  const onSubmit = async (data: BlogPostFormValues) => {
    try {
      setIsSubmitting(true)

      // Upload featured image if any
      let featuredImagePath = ""

      if (featuredImage) {
        const fileExt = featuredImage.name.split(".").pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `blog/${fileName}`

        const { error: uploadError } = await supabase.storage.from("blog-images").upload(filePath, featuredImage)

        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`)
        }

        const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(filePath)

        featuredImagePath = urlData.publicUrl
      }

      // Insert blog post data
      const { error, data: post } = await supabase
        .from("blog_posts")
        .insert({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          category: data.category,
          status: data.status,
          featured: data.featured,
          featured_image: featuredImagePath,
          meta_title: data.meta_title || data.title,
          meta_description: data.meta_description || data.excerpt,
          author_id: "system", // Replace with actual author ID from auth context
        })
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Blog post created",
        description: `Your blog post "${data.title}" has been created successfully.`,
      })

      router.push("/admin/blog")
      router.refresh()
    } catch (error) {
      console.error("Error creating blog post:", error)
      toast({
        title: "Error",
        description: "There was an error creating the blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFeaturedImage(file)

      // Create preview URL
      const imageUrl = URL.createObjectURL(file)
      setFeaturedImageUrl(imageUrl)
    }
  }

  const removeFeaturedImage = () => {
    setFeaturedImage(null)

    // Revoke the object URL to avoid memory leaks
    if (featuredImageUrl) {
      URL.revokeObjectURL(featuredImageUrl)
      setFeaturedImageUrl("")
    }
  }

  const generateSlugFromTitle = () => {
    const title = form.getValues("title")
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen

      form.setValue("slug", slug)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>
        <Button variant="outline" onClick={() => router.push("/admin/blog")}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Post Details</CardTitle>
          <CardDescription>Create a new blog post. All fields marked with * are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <TabsContent value="basic">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter blog post title"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                // Auto-generate slug if slug is empty
                                if (!form.getValues("slug")) {
                                  setTimeout(generateSlugFromTitle, 500)
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug *</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="enter-slug-here" {...field} />
                            </FormControl>
                            <Button type="button" variant="outline" size="sm" onClick={generateSlugFromTitle}>
                              Generate
                            </Button>
                          </div>
                          <FormDescription>The URL-friendly version of the title.</FormDescription>
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="recipes">Recipes</SelectItem>
                              <SelectItem value="baking-tips">Baking Tips</SelectItem>
                              <SelectItem value="industry-news">Industry News</SelectItem>
                              <SelectItem value="company-updates">Company Updates</SelectItem>
                              <SelectItem value="flour-education">Flour Education</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Draft posts are not visible to the public.</FormDescription>
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
                            <FormLabel className="text-base">Featured Post</FormLabel>
                            <FormDescription>Display this post prominently on the blog homepage</FormDescription>
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
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel>Excerpt *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a brief summary of the post"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A short summary that appears in blog listings. Max 300 characters.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-6 space-y-2">
                    <Label htmlFor="featured-image">Featured Image</Label>
                    {!featuredImageUrl ? (
                      <div className="mt-2">
                        <Label
                          htmlFor="featured-image"
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
                            id="featured-image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFeaturedImageChange}
                          />
                        </Label>
                      </div>
                    ) : (
                      <div className="relative mt-2">
                        <img
                          src={featuredImageUrl || "/placeholder.svg"}
                          alt="Featured image preview"
                          className="h-64 w-full object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={removeFeaturedImage}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="content">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content *</FormLabel>
                        <FormControl>
                          <BlogEditor value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="seo">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="meta_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter SEO title" {...field} />
                          </FormControl>
                          <FormDescription>Leave blank to use the post title.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="meta_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter SEO description" className="resize-none" {...field} />
                          </FormControl>
                          <FormDescription>Leave blank to use the post excerpt.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <div className="flex justify-end pt-6 border-t">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Post
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
