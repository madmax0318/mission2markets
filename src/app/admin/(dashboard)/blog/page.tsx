import Link from "next/link";
import { createBlogPost, deleteBlogPost } from "@/actions/blog";
import { BlogForm } from "@/components/admin/blog-form";
import { getAllPosts } from "@/lib/blog";
import { distributionStatus } from "@/lib/distribute-insight";

type AdminBlogPageProps = {
  searchParams: Promise<{ success?: string; error?: string }>;
};

export default async function AdminBlogPage({
  searchParams,
}: AdminBlogPageProps) {
  const params = await searchParams;
  const posts = await getAllPosts();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-2xl font-bold">Insights</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Publish to the site, Mission 2 Markets LinkedIn, and the email list.
        </p>
        {params.success && (
          <p className="mt-3 text-sm text-green-500" role="status">
            Insight saved
            {params.success === "created" ? " and distribution attempted." : "."}
          </p>
        )}
        {params.error && (
          <p className="mt-3 text-sm text-red-400" role="alert">
            Could not save insight. Check your form and try again.
          </p>
        )}
      </div>

      <section>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          All insights ({posts.length})
        </h2>
        {posts.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
            No insights yet. The inaugural post appears on the public page until you add one here.
          </p>
        ) : (
          <ul className="divide-y divide-border rounded-lg border border-border">
            {posts.map((post) => (
              <li key={post.id} className="px-4 py-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-xs text-muted-foreground">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-primary hover:underline"
                        target="_blank"
                      >
                        /blog/{post.slug}
                      </Link>
                      {" · "}
                      {post.published ? (
                        <span className="text-green-500">Published</span>
                      ) : (
                        <span>Draft</span>
                      )}
                    </p>
                    {post.published && (
                      <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                        {distributionStatus(post).map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="rounded border border-border px-3 py-1 text-xs hover:border-primary hover:text-primary"
                    >
                      Edit
                    </Link>
                    <form action={deleteBlogPost.bind(null, post.id)}>
                      <button
                        type="submit"
                        className="rounded border border-red-900/50 px-3 py-1 text-xs text-red-400"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          New insight
        </h2>
        <BlogForm action={createBlogPost} />
      </section>
    </div>
  );
}
