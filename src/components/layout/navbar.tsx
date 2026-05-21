"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/founders", label: "Founders" },
  { href: "/services", label: "Services" },
  { href: "/store", label: "Store" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          Mission<span className="text-primary">2</span>Markets
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium tracking-wide text-muted-foreground uppercase transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            render={<Link href="/contact" />}
            size="sm"
            className="bg-gradient-gold font-semibold text-primary-foreground shadow-[0_0_20px_rgba(255,215,0,0.25)] hover:opacity-90"
          >
            Book Now
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background md:hidden",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-2 text-sm font-medium tracking-wide text-muted-foreground uppercase transition-colors hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Button
              render={<Link href="/contact" />}
              className="w-full bg-gradient-gold font-semibold text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Book Now
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
