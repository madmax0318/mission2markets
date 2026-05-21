import { z } from "zod";

export const productFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  imageUrl: z.string().url().optional().or(z.literal("")),
  stripePriceId: z.string().optional(),
  category: z.enum(["book", "training", "consulting"]),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
