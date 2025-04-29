import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if this is an admin route
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")
  const isLoginPage = req.nextUrl.pathname === "/admin/login"

  // Allow access to login page
  if (isLoginPage) {
    return res
  }

  // Check for demo auth in cookies
  const demoAuth = req.cookies.get("demoAuth")?.value === "true"

  // If it's an admin route and there's no session or demo auth, redirect to login
  if (isAdminRoute && !session && !demoAuth) {
    const redirectUrl = new URL("/admin/login", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}
