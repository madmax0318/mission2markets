import { notFound } from "next/navigation";
import { updateBlogPost } from "@/actions/blog";
import { BlogForm } from "@/components/admin/blog-form";
import { getPostById } from "@/lib/blog";

type EditBlogPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) notFound();

  const boundUpdate = updateBlogPost.bind(null, id);

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Edit post</h1>
      <BlogForm post={post} action={boundUpdate} />
    </div>
  );
}
