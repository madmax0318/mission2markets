import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
