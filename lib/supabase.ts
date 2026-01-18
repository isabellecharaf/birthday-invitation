import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://placeholder.supabase.co' &&
         supabaseAnonKey !== 'placeholder-key' &&
         !supabaseUrl.includes('your_supabase_url_here')
}

export type RSVP = {
  id?: string
  name: string
  phone: string
  rsvp_status: 'going' | 'maybe' | 'cant_go'
  created_at?: string
}
