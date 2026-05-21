import Link from "next/link";
import { createProduct } from "@/actions/products";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/products"
          className="text-xs uppercase tracking-wide text-zinc-500 hover:text-gold"
        >
          ← Back to products
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-white">New product</h1>
      </div>
      <ProductForm action={createProduct} />
    </div>
  );
}
