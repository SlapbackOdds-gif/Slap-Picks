import { createClient } from "@supabase/supabase-js";

// Public, read-only client — safe to use anywhere, including in code that
// runs in the browser. The anon key only grants whatever the database's
// Row Level Security policies allow (here: public SELECT on `picks`, no
// writes). See lib/supabaseAdmin.ts for the server-only client used by the
// admin dashboard to actually write data.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabase);
}
