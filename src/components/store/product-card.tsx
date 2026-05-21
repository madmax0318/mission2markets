import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { BuyNowButton } from "./buy-now-button";

const categoryBadge: Record<Product["category"], string> = {
  book: "Book",
  training: "Training",
  consulting: "Consulting",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-card transition-colors hover:border-gold/30">
      {product.image_url ? (
        <div className="relative aspect-[4/3] w-full bg-zinc-900">
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="rounded border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
            {categoryBadge[product.category]}
          </span>
          {product.featured && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Featured
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-white">{product.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
          {product.description}
        </p>
        <p className="mt-6 text-2xl font-bold text-gold">
          {formatPrice(product.price_cents)}
        </p>
        <div className="mt-4">
          <BuyNowButton productId={product.id} />
        </div>
      </div>
    </article>
  );
}
