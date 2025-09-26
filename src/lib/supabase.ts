import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      digipoints: {
        Row: {
          id: string
          code: string
          name: string
          name_en: string | null
          meridian: string | null
          body_part: string
          body_region: string | null
          coordinates: any
          location_description: string | null
          primary_functions: string[]
          symptoms_treated: string[]
          pressure_type: string | null
          pressure_duration: number | null
          technique_method: string | null
          technique_description: string | null
          image_reference: string | null
          illustration_path: string | null
          difficulty_level: number | null
          popularity_score: number
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
