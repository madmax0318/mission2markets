"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { slugify, getPostById } from "@/lib/blog";
import { distributeInsight } from "@/lib/distribute-insight";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/types/database";

function parseBlogForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug =
    String(formData.get("slug") ?? "").trim() || slugify(title);
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const published = formData.get("published") === "on";
  const redistribute = formData.get("redistribute") === "on";

  if (!title || !body) return null;

  return { title, slug, excerpt, body, published, redistribute };
}

async function maybeDistribute(
  post: BlogPost,
  options: { force?: boolean; wasPublished?: boolean },
) {
  if (!post.published) return;

  const shouldSend =
    options.force ||
    !options.wasPublished ||
    !post.linkedin_shared_at ||
    !post.newsletter_sent_at;

  if (!shouldSend) return;

  await distributeInsight(post);
}

export async function createBlogPost(formData: FormData) {
  await requireAdmin();
  const data = parseBlogForm(formData);
  if (!data) redirect("/admin/blog?error=validation");

  const { redistribute, ...insertData } = data;
  const supabase = await createClient();
  const { data: created, error } = await supabase
    .from("blog_posts")
    .insert(insertData)
    .select()
    .single();

  if (error) redirect("/admin/blog?error=save");

  if (created?.published) {
    await maybeDistribute(created as BlogPost, { force: redistribute });
  }

  revalidatePath("/blog");
  if (created?.slug) revalidatePath("/blog/" + created.slug);
  revalidatePath("/admin/blog");
  redirect("/admin/blog?success=created");
}

export async function updateBlogPost(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseBlogForm(formData);
  if (!data) redirect("/admin/blog/" + id + "/edit?error=validation");

  const existing = await getPostById(id);
  const { redistribute, ...updateData } = data;

  const supabase = await createClient();
  const { data: updated, error } = await supabase
    .from("blog_posts")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) redirect("/admin/blog/" + id + "/edit?error=save");

  if (updated?.published) {
    await maybeDistribute(updated as BlogPost, {
      force: redistribute,
      wasPublished: existing?.published,
    });
  }

  revalidatePath("/blog");
  if (updated?.slug) revalidatePath("/blog/" + updated.slug);
  revalidatePath("/admin/blog");
  redirect("/admin/blog?success=updated");
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from("blog_posts").delete().eq("id", id);
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}
