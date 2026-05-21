import {
  categoryLabels,
  categoryOrder,
  getActiveProducts,
  type ProductCategory,
} from "@/lib/products";
import { ProductCard } from "@/components/store/product-card";

type StorePageProps = {
  searchParams: Promise<{ canceled?: string }>;
};

export default async function StorePage({ searchParams }: StorePageProps) {
  const params = await searchParams;
  const products = await getActiveProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Store</p>
        <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Books, Training & Consulting
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Equip your transition with field-tested resources and programs built for
          professionals pursuing elite sales performance.
        </p>
      </div>

      {params.canceled === "true" && (
        <div
          className="mb-10 rounded-lg border border-border bg-muted px-5 py-4 text-sm text-muted-foreground"
          role="status"
        >
          Checkout was canceled. Your card was not charged.
        </div>
      )}

      {products.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border px-6 py-16 text-center text-muted-foreground">
          No products available yet. Check back soon.
        </p>
      ) : (
        <div className="space-y-16">
          {categoryOrder.map((category) => {
            const items = products.filter((p) => p.category === category);
            if (items.length === 0) return null;

            return (
              <section key={category}>
                <h2 className="mb-6 border-b border-border pb-3 font-heading text-xl font-bold uppercase tracking-wide">
                  {categoryLabels[category as ProductCategory]}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
