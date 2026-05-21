"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { ProductCategory } from "@/types/database";

function parseProductForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priceDollars = parseFloat(String(formData.get("price") ?? ""));
  const imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;
  const stripePriceId =
    String(formData.get("stripePriceId") ?? "").trim() || null;
  const category = String(formData.get("category") ?? "book") as ProductCategory;
  const featured = formData.get("featured") === "on";
  const active = formData.get("active") === "on";

  if (!title || !description || Number.isNaN(priceDollars) || priceDollars < 0) {
    return null;
  }

  return {
    title,
    description,
    price_cents: Math.round(priceDollars * 100),
    image_url: imageUrl,
    stripe_price_id: stripePriceId,
    category,
    featured,
    active,
  };
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const data = parseProductForm(formData);
  if (!data) redirect("/admin/products?error=validation");

  const supabase = await createClient();
  const { error } = await supabase.from("products").insert(data);
  if (error) redirect("/admin/products?error=save");

  revalidatePath("/store");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseProductForm(formData);
  if (!data) redirect(`/admin/products/${id}/edit?error=validation`);

  const supabase = await createClient();
  const { error } = await supabase.from("products").update(data).eq("id", id);
  if (error) redirect(`/admin/products/${id}/edit?error=save`);

  revalidatePath("/store");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/store");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}
