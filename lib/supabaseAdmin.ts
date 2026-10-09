import "server-only";
import { createClient } from "@supabase/supabase-js";

// Privileged client — bypasses Row Level Security entirely. This must
// NEVER be imported into a client component or exposed to the browser.
// The `server-only` import above makes the build fail loudly if that ever
// happens by accident.
//
// Used only by app/admin/actions.ts to add/edit/grade picks.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false },
      })
    : null;
