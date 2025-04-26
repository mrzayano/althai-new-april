import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// Constants
const COOKIE_NAME = "althaifoods_session"
const SESSION_EXPIRY = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

// Types
export type UserSession = {
  id: string
  email: string
  role: string
  name?: string
  avatar_url?: string
}

// Create a Supabase client for server components
export const createServerSupabaseClient = () => {
  const cookieStore = cookies()
  const supabaseUrl = process.env.SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_ANON_KEY!

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: COOKIE_NAME,
      storage: {
        getItem: (key) => {
          const cookie = cookieStore.get(key)
          return cookie?.value ?? null
        },
        setItem: () => {},
        removeItem: () => {},
      },
    },
  })
}

// Create a singleton Supabase client for browser
let browserClient: ReturnType<typeof createClient> | null = null

export const createBrowserSupabaseClient = () => {
  if (browserClient) return browserClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  browserClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: COOKIE_NAME,
    },
  })

  return browserClient
}

// Session management functions
export async function signIn(email: string, password: string) {
  const supabase = createBrowserSupabaseClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  // Store session in cookie for persistence
  document.cookie = `${COOKIE_NAME}=${JSON.stringify(data.session)}; path=/; max-age=${SESSION_EXPIRY}; SameSite=Lax; Secure`

  return data
}

export async function signOut() {
  const supabase = createBrowserSupabaseClient()

  // Clear cookie
  document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure`

  return await supabase.auth.signOut()
}

export async function getCurrentUser(): Promise<UserSession | null> {
  const supabase = createBrowserSupabaseClient()

  const { data } = await supabase.auth.getUser()

  if (!data.user) return null

  // Get additional user data from profiles table
  const { data: profileData } = await supabase
    .from("profiles")
    .select("role, name, avatar_url")
    .eq("id", data.user.id)
    .single()

  return {
    id: data.user.id,
    email: data.user.email!,
    role: profileData?.role || "user",
    name: profileData?.name,
    avatar_url: profileData?.avatar_url,
  }
}

// Auth context provider
export function getSessionFromCookie(): UserSession | null {
  if (typeof document === "undefined") return null

  const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${COOKIE_NAME}=`))

  if (!cookie) return null

  try {
    const sessionData = JSON.parse(cookie.split("=")[1])
    if (!sessionData.user) return null

    return {
      id: sessionData.user.id,
      email: sessionData.user.email,
      role: sessionData.user.role || "user",
      name: sessionData.user.name,
      avatar_url: sessionData.user.avatar_url,
    }
  } catch (e) {
    return null
  }
}
