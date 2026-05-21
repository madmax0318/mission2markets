import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a consultation or send a message to Mission 2 Markets.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Contact</p>
          <h1 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">Book Now</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Ready to start your transition or explore a corporate partnership? Send us a
            message—we respond to every inquiry.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="mt-0.5 size-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <a
                  href="mailto:contact@mission2markets.com"
                  className="text-muted-foreground hover:text-primary"
                >
                  contact@mission2markets.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="mt-0.5 size-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <a href="tel:+18005551234" className="text-muted-foreground hover:text-primary">
                  (800) 555-1234
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
