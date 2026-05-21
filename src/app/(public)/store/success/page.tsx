import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false },
};

export default function StoreSuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Thank You</p>
      <h1 className="mt-3 font-heading text-3xl font-bold">Payment Successful</h1>
      <p className="mt-4 text-muted-foreground">
        Your purchase is confirmed. We will follow up shortly with next steps and any
        digital access details.
      </p>
      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        <Button render={<Link href="/store" />} variant="outline">
          Back to Store
        </Button>
        <Button render={<Link href="/contact" />} className="bg-gradient-gold font-bold text-primary-foreground">
          Contact Us
        </Button>
      </div>
    </div>
  );
}
