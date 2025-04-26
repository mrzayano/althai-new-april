import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

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
      storageKey: "althaifoods_session",
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

// Get the current user from the server
export async function getServerUser() {
  const supabase = createServerSupabaseClient()
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
