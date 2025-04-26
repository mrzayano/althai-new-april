import { createClient } from "@supabase/supabase-js"

// Create a singleton Supabase client for browser
let browserClient: ReturnType<typeof createClient> | null = null

export const getSupabaseBrowserClient = () => {
  if (browserClient) return browserClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  browserClient = createClient(supabaseUrl, supabaseKey)

  return browserClient
}
