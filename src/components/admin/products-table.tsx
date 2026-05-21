import Link from "next/link";
import { deleteProduct } from "@/actions/products";
import type { Product } from "@/lib/products";
import { categoryLabels, formatPrice } from "@/lib/products";

export function ProductsTable({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-800 px-6 py-12 text-center text-sm text-zinc-500">
        No products yet. Create your first product above.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-zinc-800 bg-zinc-900/80 text-xs uppercase tracking-wide text-zinc-500">
          <tr>
            <th className="px-4 py-3 font-bold">Title</th>
            <th className="px-4 py-3 font-bold">Category</th>
            <th className="px-4 py-3 font-bold">Price</th>
            <th className="px-4 py-3 font-bold">Status</th>
            <th className="px-4 py-3 font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-zinc-900/50">
              <td className="px-4 py-3">
                <p className="font-medium text-white">{product.title}</p>
                <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500">
                  {product.description}
                </p>
              </td>
              <td className="px-4 py-3 text-zinc-400">
                {categoryLabels[product.category]}
              </td>
              <td className="px-4 py-3 text-gold">{formatPrice(product.price_cents)}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                    product.active
                      ? "bg-green-900/40 text-green-400"
                      : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {product.active ? "Live" : "Inactive"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="rounded border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-300 hover:border-gold hover:text-gold"
                  >
                    Edit
                  </Link>
                  <form action={deleteProduct.bind(null, product.id)}>
                    <button
                      type="submit"
                      className="rounded border border-red-900/50 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-950/50"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
