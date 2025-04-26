"use client"

import { FormDescription } from "@/components/ui/form"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Import the editor dynamically to avoid SSR issues
const RichTextEditor = dynamic(() => import("@/components/admin/rich-text-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[400px] border rounded-md bg-gray-50 dark:bg-gray-900">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
})

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

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [existingFeaturedImage, setExistingFeaturedImage] = useState<string>("")
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string>("")
  const [activeTab, setActiveTab] = useState("basic")
  const [categories, setCategories] = useState<string[]>([])

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      status: "draft",
      featured: false,
      meta_title: "",
      meta_description: "",
    },
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const supabase = getSupabaseBrowserClient()
        const { data, error } = await supabase.from("blog_categories").select("name").order("name", { ascending: true })

        if (error) throw error

        if (data) {
          setCategories(data.map((cat) => cat.name))
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const supabase = getSupabaseBrowserClient()
        const { data: post, error } = await supabase.from("blog_posts").select("*").eq("id", params.id).single()

        if (error) throw error

        if (post) {
          form.reset({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            status: post.status,
            featured: post.featured,
            meta_title: post.meta_title || "",
            meta_description: post.meta_description || "",
          })

          if (post.featured_image) {
            setExistingFeaturedImage(post.featured_image)
          }
        }
      } catch (error) {
        console.error("Error fetching blog post:", error)
        toast({
          title: "Error",
          description: "Failed to load blog post data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPost()
  }, [params.id, form, toast])

  const onSubmit = async (data: BlogPostFormValues) => {
    try {
      setIsSubmitting(true)
      const supabase = getSupabaseBrowserClient()

      // Upload new featured image if any
      let featuredImagePath = existingFeaturedImage

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

      // Update blog post data
      const { error } = await supabase
        .from("blog_posts")
        .update({
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
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)

      if (error) throw error

      toast({
        title: "Blog post updated",
        description: `Your blog post "${data.title}" has been updated successfully.`,
      })

      router.push("/admin/blog")
      router.refresh()
    } catch (error) {
      console.error("Error updating blog post:", error)
      toast({
        title: "Error",
        description: "There was an error updating the blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePost = async () => {
    try {
      setIsDeleting(true)
      const supabase = getSupabaseBrowserClient()

      const { error } = await supabase.from("blog_posts").delete().eq("id", params.id)

      if (error) throw error

      toast({
        title: "Blog post deleted",
        description: "The blog post has been deleted successfully.",
      })

      router.push("/admin/blog")
      router.refresh()
    } catch (error) {
      console.error("Error deleting blog post:", error)
      toast({
        title: "Error",
        description: "There was an error deleting the blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFeaturedImage(file)

      // Create preview URL
      const imageUrl = URL.createObjectURL(file)
      setFeaturedImageUrl(imageUrl)
      setExistingFeaturedImage("")
    }
  }

  const removeFeaturedImage = () => {
    setFeaturedImage(null)
    setExistingFeaturedImage("")

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
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/admin/blog")}>
            Cancel
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Post</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the blog post and remove it from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeletePost}
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
          <CardTitle>Blog Post Details</CardTitle>
          <CardDescription>Edit your blog post. All fields marked with * are required.</CardDescription>
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
                            <Input placeholder="Enter blog post title" {...field} />
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
                          <div className="flex justify-between items-center">
                            <FormLabel>Slug *</FormLabel>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={generateSlugFromTitle}
                              className="text-xs h-6"
                            >
                              Generate from title
                            </Button>
                          </div>
                          <FormControl>
                            <Input placeholder="enter-slug-here" {...field} />
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
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
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
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="published">Published</SelectItem>
                              <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-6">
                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Excerpt *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief summary of the blog post"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-6">
                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Featured Post</FormLabel>
                            <FormDescription>
                              Mark this post as featured to highlight it on the homepage.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-6">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Featured Image</label>
                      <div className="flex items-center gap-4">
                        <Input type="file" accept="image/*" onChange={handleFeaturedImageChange} className="max-w-sm" />
                        {(featuredImageUrl || existingFeaturedImage) && (
                          <Button type="button" variant="outline" size="sm" onClick={removeFeaturedImage}>
                            Remove Image
                          </Button>
                        )}
                      </div>
                    </div>

                    {featuredImageUrl && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Preview:</p>
                        <img
                          src={featuredImageUrl || "/placeholder.svg"}
                          alt="Featured image preview"
                          className="max-h-[200px] rounded-md border"
                        />
                      </div>
                    )}

                    {existingFeaturedImage && !featuredImageUrl && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Current Image:</p>
                        <img
                          src={existingFeaturedImage || "/placeholder.svg"}
                          alt="Current featured image"
                          className="max-h-[200px] rounded-md border"
                        />
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
                          <RichTextEditor value={field.value} onChange={field.onChange} />
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
                            <Input placeholder="SEO title (defaults to post title if empty)" {...field} />
                          </FormControl>
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
                            <Textarea
                              placeholder="SEO description (defaults to excerpt if empty)"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
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
