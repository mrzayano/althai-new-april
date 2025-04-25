import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { Toaster } from "@/components/ui/toaster"

// This is a simple auth check, in a real app you would use a proper auth provider
function getServerSession() {
  // Mock admin session - in a real app, this would check JWT or session cookie
  return null // Change to {} to simulate logged in admin
}

export default function AdminLayout({ children }: { children: ReactNode }) {

  // If not authenticated, redirect to login


  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 pt-32">
        {children}
        <Toaster />
      </div>
    </div>
  )
}
