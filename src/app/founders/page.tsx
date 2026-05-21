import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FounderCard } from "@/components/founders/founder-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { founders } from "@/lib/founders";

export const metadata: Metadata = {
  title: "Founders | Mission 2 Markets",
  description:
    "Meet the veteran-led co-founders behind Mission 2 Markets—elite sales consulting for all professionals.",
};

export default function FoundersPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,215,0,0.08)_0%,_transparent_60%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
            Leadership
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Veteran-Led.{" "}
            <span className="text-gradient-gold">Market-Proven.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Mission 2 Markets was built by two U.S. Army veterans who translated
            battlefield leadership into careers at the top of medical device
            sales—and now coach professionals from every background who want the
            same discipline, clarity, and results.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 sm:space-y-28">
            {founders.map((founder, index) => (
              <div key={founder.id}>
                <FounderCard
                  founder={founder}
                  priorityImage={index === 0}
                />
                {index < founders.length - 1 ? (
                  <Separator className="mt-20 sm:mt-28 bg-border" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Ready to level up?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Work directly with founders who have built elite sales careers—and
            know what it takes to win in the marketplace.
          </p>
          <Button
            render={<Link href="/contact" />}
            size="lg"
            className="mt-8 h-11 bg-gradient-gold px-8 font-bold text-primary-foreground shadow-[0_0_30px_rgba(255,215,0,0.25)] hover:opacity-90"
          >
            Contact Mission 2 Markets
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
