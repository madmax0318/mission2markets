import type { Metadata } from "next";
import { InsightCard } from "@/components/insights/insight-card";
import { NewsletterSignup } from "@/components/insights/newsletter-signup";
import { getInsightsPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Leadership insights from Mission 2 Markets—sales, discipline, and career growth.",
};

export default async function InsightsPage() {
  const posts = await getInsightsPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
          Insights
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
          Leadership Insights
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Field notes on sales, leadership, and career growth. New insights are
          shared here, on our LinkedIn page, and with email subscribers.
        </p>
      </div>

      <div className="mt-10 max-w-md">
        <NewsletterSignup variant="compact" />
      </div>

      {posts.length === 0 ? (
        <p className="mt-12 rounded-lg border border-dashed border-border px-6 py-12 text-center text-muted-foreground">
          New insights coming soon.
        </p>
      ) : (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <InsightCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
