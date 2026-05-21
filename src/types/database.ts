export type LeadStatus = "New" | "Contacted" | "In Progress" | "Closed";

export type ProductCategory = "book" | "training" | "consulting";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: LeadStatus;
  created_at: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price_cents: number;
  image_url: string | null;
  stripe_price_id: string | null;
  category: ProductCategory;
  featured: boolean;
  active: boolean;
  created_at: string;
};

export type Order = {
  id: string;
  stripe_session_id: string;
  customer_email: string | null;
  product_id: string | null;
  amount_total: number | null;
  status: string;
  created_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  published: boolean;
  created_at: string;
  linkedin_shared_at?: string | null;
  newsletter_sent_at?: string | null;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  active: boolean;
  created_at: string;
};
