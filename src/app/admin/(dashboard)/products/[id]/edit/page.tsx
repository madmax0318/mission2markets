import Link from "next/link";
import { notFound } from "next/navigation";
import { updateProduct } from "@/actions/products";
import { ProductForm } from "@/components/admin/product-form";
import { getProductById } from "@/lib/products";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const boundUpdate = updateProduct.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/products"
          className="text-xs uppercase tracking-wide text-zinc-500 hover:text-gold"
        >
          ← Back to products
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-white">Edit product</h1>
        <p className="mt-1 text-sm text-zinc-500">{product.title}</p>
      </div>
      <ProductForm product={product} action={boundUpdate} />
    </div>
  );
}
