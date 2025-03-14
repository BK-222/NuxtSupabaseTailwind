import { createClient } from '@supabase/supabase-js'

interface SupabaseConfig {
  url: string
  key: string
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.supabase as SupabaseConfig
  const supabase = createClient(config.url, config.key)
  
  return {
    provide: {
      supabase
    }
  }
})