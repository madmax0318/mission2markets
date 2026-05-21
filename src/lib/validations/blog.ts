import { z } from "zod";

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  body: z.string().min(1, "Body is required"),
  published: z.boolean().optional(),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;
