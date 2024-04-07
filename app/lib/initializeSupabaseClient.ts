import { createClient } from '@supabase/supabase-js'
export function initializeSupabaseClient() {
  return createClient(process.env.SUPABASE_PROJECT_URL!, process.env.SUPABASE_API_KEY!)
}