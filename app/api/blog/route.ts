import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const featured = searchParams.get("featured")
  const slug = searchParams.get("slug")
  const status = searchParams.get("status") || "published"

  const supabase = createRouteHandlerClient({ cookies })

  let query = supabase.from("blog_posts").select("*")

  if (category) {
    query = query.eq("category", category)
  }

  if (featured === "true") {
    query = query.eq("featured", true)
  }

  if (slug) {
    query = query.eq("slug", slug)
  }

  // Only return published posts for public requests
  if (!request.headers.get("x-admin-request")) {
    query = query.eq("status", "published")
  } else if (status) {
    query = query.eq("status", status)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  // Check authentication
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const post = await request.json()

    const { data, error } = await supabase.from("blog_posts").insert(post).select().single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
