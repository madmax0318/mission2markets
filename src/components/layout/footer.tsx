import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/founders", label: "Founders" },
    { href: "/services", label: "Services" },
    { href: "/store", label: "Store" },
    { href: "/contact", label: "Contact" },
  ],
  resources: [
    { href: "/blog", label: "Leadership Insights" },
    { href: "/store", label: "Books & Training" },
    { href: "/services", label: "Corporate Partnerships" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-heading text-xl font-bold tracking-tight text-foreground"
            >
              Mission<span className="text-primary">2</span>Markets
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Veteran-led sales consulting, training, and resources for
              professionals ready to perform at the highest level.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold tracking-wider text-primary uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold tracking-wider text-primary uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold tracking-wider text-primary uppercase">
              Connect
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Ready to deploy your sales career?
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-block text-sm font-medium text-primary transition-colors hover:text-gold-muted"
            >
              Book a consultation →
            </Link>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} Mission 2 Markets. All rights reserved.
          </p>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            From Service to Sales. From Mission to Market.
          </p>
        </div>
      </div>
    </footer>
  );
}
