"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME } from "@/lib/adminAuth";

export async function login(formData: FormData) {
  const password = formData.get("password");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    redirect("/admin?error=not_configured");
  }

  if (password !== expected) {
    redirect("/admin?error=wrong_password");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, expected, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect("/admin");
}

export async function addPick(formData: FormData) {
  if (!supabaseAdmin) {
    redirect("/admin?error=not_configured");
  }

  const { error } = await supabaseAdmin.from("picks").insert({
    pick_date: formData.get("pick_date"),
    matchup: formData.get("matchup"),
    sport: formData.get("sport"),
    pick: formData.get("pick"),
    odds: formData.get("odds"),
    result: formData.get("result") || "pending",
    note: formData.get("note") || null,
  });

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/picks");
  redirect("/admin");
}

// Bound with the pick's id in the admin page: updatePickResult.bind(null, id)
export async function updatePickResult(id: string, formData: FormData) {
  if (!supabaseAdmin) {
    redirect("/admin?error=not_configured");
  }

  const result = formData.get("result");

  const { error } = await supabaseAdmin
    .from("picks")
    .update({ result })
    .eq("id", id);

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/picks");
  redirect("/admin");
}

// Bound with the pick's id in the admin page: deletePick.bind(null, id)
export async function deletePick(id: string) {
  if (!supabaseAdmin) {
    redirect("/admin?error=not_configured");
  }

  const { error } = await supabaseAdmin.from("picks").delete().eq("id", id);

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/picks");
  redirect("/admin");
}
