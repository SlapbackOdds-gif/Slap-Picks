import "server-only";
import { cookies } from "next/headers";

// Intentionally simple: a single shared password (set as ADMIN_PASSWORD in
// your environment) gates /admin. This is fine for a one-person operation
// managing their own picks — it is NOT a multi-user account system. If you
// ever add real user accounts/sign-ups to the site, keep that separate
// from this admin gate.
export const ADMIN_COOKIE_NAME = "slap_admin_session";

export async function isAdminAuthed(): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === expected;
}
