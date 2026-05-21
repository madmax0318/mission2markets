import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import {
  defaultMissionInsight,
  sortInsightsPosts,
} from "@/lib/insights-content";
import type { BlogPost } from "@/types/database";

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[blog] getPublishedPosts", error);
    return [];
  }

  return (data ?? []) as BlogPost[];
}

/** Insights index: newest first, oldest at bottom. Fallback to inaugural post when DB empty. */
export async function getInsightsPosts(): Promise<BlogPost[]> {
  const fromDb = await getPublishedPosts();
  if (fromDb.length === 0) {
    return [defaultMissionInsight];
  }
  return sortInsightsPosts(fromDb);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as BlogPost;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[blog] getAllPosts", error);
    return [];
  }

  return (data ?? []) as BlogPost[];
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as BlogPost;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
