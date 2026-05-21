"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type NewsletterSignupProps = {
  variant?: "default" | "compact";
};

export function NewsletterSignup({ variant = "default" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = (await response.json()) as { message?: string; error?: string };
    setLoading(false);

    if (!response.ok) {
      setStatus("error");
      setMessage(data.error ?? "Could not subscribe. Try again.");
      return;
    }

    setEmail("");
    setStatus("success");
    setMessage(data.message ?? "You are subscribed.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {variant === "default" && (
        <p className="text-sm text-muted-foreground">
          Join the list—new insights go to your inbox when we publish.
        </p>
      )}
      <div
        className={
          variant === "compact"
            ? "flex flex-col gap-2 sm:flex-row"
            : "flex flex-col gap-2 sm:flex-row sm:items-center"
        }
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="min-w-0 flex-1 rounded-md border border-border bg-muted px-4 py-2.5 text-sm outline-none focus:border-primary"
          aria-label="Email for insights newsletter"
        />
        <Button
          type="submit"
          disabled={loading}
          className="shrink-0 bg-gradient-gold font-semibold text-primary-foreground hover:opacity-90"
        >
          {loading ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>
      {status === "success" && (
        <p className="text-sm text-primary">{message}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">{message}</p>
      )}
    </form>
  );
}
