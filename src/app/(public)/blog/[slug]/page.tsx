import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogBody } from "@/components/blog/blog-body";
import { NewsletterSignup } from "@/components/insights/newsletter-signup";
import { defaultMissionInsight } from "@/lib/insights-content";
import { getPostBySlug } from "@/lib/blog";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post =
    slug === defaultMissionInsight.slug
      ? defaultMissionInsight
      : await getPostBySlug(slug);

  if (!post) return { title: "Insight Not Found" };

  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const post =
    slug === defaultMissionInsight.slug
      ? defaultMissionInsight
      : await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
        ← All insights
      </Link>
      <h1 className="mt-6 font-heading text-4xl font-bold">{post.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {new Date(post.created_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <BlogBody body={post.body} />
      <div className="mt-16 border-t border-border pt-10">
        <p className="mb-4 text-sm font-semibold text-foreground">
          Get new insights in your inbox
        </p>
        <NewsletterSignup />
      </div>
    </article>
  );
}
