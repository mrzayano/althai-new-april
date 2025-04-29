export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          created_at: string
          name: string
          slug: string
          description: string
          price: string
          weight: string
          category: string
          image: string
          featured: boolean
          stock: number
          meta_title: string | null
          meta_description: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          slug: string
          description: string
          price: string
          weight: string
          category: string
          image: string
          featured?: boolean
          stock?: number
          meta_title?: string | null
          meta_description?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          slug?: string
          description?: string
          price?: string
          weight?: string
          category?: string
          image?: string
          featured?: boolean
          stock?: number
          meta_title?: string | null
          meta_description?: string | null
        }
      }
      blog_posts: {
        Row: {
          id: number
          created_at: string
          title: string
          slug: string
          excerpt: string
          content: string
          category: string
          status: string
          featured: boolean
          featured_image: string | null
          author_id: string
          meta_title: string | null
          meta_description: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          slug: string
          excerpt: string
          content: string
          category: string
          status: string
          featured?: boolean
          featured_image?: string | null
          author_id: string
          meta_title?: string | null
          meta_description?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          category?: string
          status?: string
          featured?: boolean
          featured_image?: string | null
          author_id?: string
          meta_title?: string | null
          meta_description?: string | null
        }
      }
      inquiries: {
        Row: {
          id: number
          created_at: string
          name: string
          email: string
          phone: string
          company: string | null
          message: string
          status: string
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          email: string
          phone: string
          company?: string | null
          message: string
          status?: string
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          email?: string
          phone?: string
          company?: string | null
          message?: string
          status?: string
        }
      }
      settings: {
        Row: {
          id: number
          key: string
          value: Json
          description: string | null
        }
        Insert: {
          id?: number
          key: string
          value: Json
          description?: string | null
        }
        Update: {
          id?: number
          key?: string
          value?: Json
          description?: string | null
        }
      }
    }
  }
}
