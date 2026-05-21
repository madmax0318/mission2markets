import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { Product, ProductCategory } from "@/types/database";

export type { Product, ProductCategory };

export const categoryLabels: Record<ProductCategory, string> = {
  book: "Books",
  training: "Training Modules",
  consulting: "Consulting Packages",
};

export const categoryOrder: ProductCategory[] = [
  "book",
  "training",
  "consulting",
];

function toProduct(row: Product): Product {
  const category = row.category as ProductCategory;
  return {
    ...row,
    category: categoryLabels[category] ? category : "book",
  };
}

export async function getActiveProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("category")
    .order("title");

  if (error) {
    console.error("[products] getActiveProducts", error);
    return [];
  }

  return (data ?? []).map((row) => toProduct(row as Product));
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[products] getAllProducts", error);
    return [];
  }

  return (data ?? []).map((row) => toProduct(row as Product));
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return toProduct(data as Product);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
