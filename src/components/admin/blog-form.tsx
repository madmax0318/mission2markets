import type { BlogPost } from "@/types/database";

type BlogFormProps = {
  post?: BlogPost;
  action: (formData: FormData) => Promise<void>;
};

export function BlogForm({ post, action }: BlogFormProps) {
  return (
    <form action={action} className="space-y-5 rounded-lg border border-zinc-800 bg-card p-6">
      <div>
        <label htmlFor="title" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-500">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={post?.title}
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="slug" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-500">
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={post?.slug}
          placeholder="auto-generated-from-title if empty"
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-sm text-white outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-500">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt}
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="body" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-500">
          Body (Markdown)
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={12}
          defaultValue={post?.body}
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-sm text-white outline-none focus:border-gold"
        />
      </div>

      <div className="space-y-3 rounded-md border border-zinc-800 bg-zinc-900/50 p-4">
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published}
            className="accent-gold"
          />
          Publish on Insights page
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" name="redistribute" className="accent-gold" />
          Share to LinkedIn page and email list (on save)
        </label>
        <p className="text-xs text-zinc-500">
          When published, insights are posted to your Mission 2 Markets LinkedIn
          page and sent to newsletter subscribers automatically—unless already
          shared (check the box above to force resend).
        </p>
      </div>

      <button
        type="submit"
        className="rounded-md bg-gold px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black hover:opacity-90"
      >
        {post ? "Save changes" : "Create post"}
      </button>
    </form>
  );
}
