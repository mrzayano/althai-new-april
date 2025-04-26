"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [isDemoAuth, setIsDemoAuth] = useState(false)

  useEffect(() => {
    // Check for demo auth
    const demoAuth = localStorage.getItem("demoAuth")
    if (demoAuth === "true") {
      setIsDemoAuth(true)
    }
  }, [])

  useEffect(() => {
    // If not loading and no user and no demo auth, redirect to login
    if (!isLoading && !user && !isDemoAuth && typeof window !== "undefined") {
      router.push("/admin/login")
    }
  }, [isLoading, user, isDemoAuth, router])

  if (isLoading && !isDemoAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  // If authenticated or demo auth, show admin layout
  if (user || isDemoAuth) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminSidebar />
        <div className="flex-1 p-8 pt-32">
          {children}
          <Toaster />
        </div>
      </div>
    )
  }

  return null // Will redirect in the useEffect
}
