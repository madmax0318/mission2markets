import Link from "next/link";
import { createProduct } from "@/actions/products";
import { ProductForm } from "@/components/admin/product-form";
import { ProductsTable } from "@/components/admin/products-table";
import { getAllProducts } from "@/lib/products";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage store catalog. Changes appear on the public store immediately.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="shrink-0 rounded-md border border-gold/40 px-4 py-2 text-xs font-bold uppercase tracking-wide text-gold hover:bg-gold/10"
        >
          New product
        </Link>
      </div>

      <section>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-zinc-500">
          All products ({products.length})
        </h2>
        <ProductsTable products={products} />
      </section>

      <section id="quick-add">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-zinc-500">
          Quick add
        </h2>
        <ProductForm action={createProduct} />
      </section>
    </div>
  );
}
