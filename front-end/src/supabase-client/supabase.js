import { createClient } from "@supabase/supabase-js";
const keySupabase = import.meta.env.VITE_SUPABASE_ANON_KEY
const urlSupabase = import.meta.env.VITE_SUPABASE_URL
export const supabase = createClient(urlSupabase, keySupabase)