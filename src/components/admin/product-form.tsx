import type { Product } from "@/lib/products";
import { categoryLabels, formatPrice, type ProductCategory } from "@/lib/products";

type ProductFormProps = {
  product?: Product;
  action: (formData: FormData) => Promise<void>;
};

const categories = Object.keys(categoryLabels) as ProductCategory[];

export function ProductForm({ product, action }: ProductFormProps) {
  const priceDollars = product
    ? (product.price_cents / 100).toFixed(2)
    : "";

  return (
    <form action={action} className="space-y-5 rounded-lg border border-zinc-800 bg-card p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-500">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={product?.title}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-gold"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-500">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            defaultValue={product?.description}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-gold"
          />
        </div>

        <div>
          <label htmlFor="price" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-500">
            Price (USD)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={priceDollars}
            placeholder="29.99"
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-gold"
          />
          {product && (
            <p className="mt-1 text-xs text-zinc-600">
              Stored as {formatPrice(product.price_cents)} ({product.price_cents} cents)
            </p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-500">
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={product?.category ?? "book"}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-gold"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {categoryLabels[cat]}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="imageUrl" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-500">
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            defaultValue={product?.image_url ?? ""}
            placeholder="https://..."
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-gold"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="stripePriceId" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-500">
            Stripe Price ID
          </label>
          <input
            id="stripePriceId"
            name="stripePriceId"
            defaultValue={product?.stripe_price_id ?? ""}
            placeholder="price_..."
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-sm text-white outline-none focus:border-gold"
          />
          <p className="mt-1 text-xs text-zinc-600">
            Optional. When set, checkout uses this Stripe Price instead of dynamic price_data.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={product?.featured}
              className="accent-gold"
            />
            Featured on store
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              name="active"
              defaultChecked={product?.active ?? true}
              className="accent-gold"
            />
            Active (visible on /store)
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-md bg-gold px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black hover:opacity-90"
        >
          {product ? "Save changes" : "Create product"}
        </button>
      </div>
    </form>
  );
}
