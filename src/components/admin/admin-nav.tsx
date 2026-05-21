"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/blog", label: "Insights" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-zinc-800">
      {tabs.map((tab) => {
        const active = tab.exact
          ? pathname === tab.href
          : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${
              active
                ? "border-b-2 border-gold text-gold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
