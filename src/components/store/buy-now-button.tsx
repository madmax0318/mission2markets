"use client";

import { useState } from "react";

type BuyNowButtonProps = {
  productId: string;
  label?: string;
};

export function BuyNowButton({
  productId,
  label = "Buy Now",
}: BuyNowButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Checkout failed");
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error("No checkout URL returned");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="w-full rounded-md bg-gold px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting…" : label}
      </button>
      {error && (
        <p className="text-center text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
