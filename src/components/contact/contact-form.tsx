"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  leadFormSchema,
  type LeadFormValues,
} from "@/lib/validations/lead";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(data: LeadFormValues) {
    setSubmitState("idle");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      setSubmitState("error");
      return;
    }

    reset();
    setSubmitState("success");
  }

  const inputClass =
    "w-full rounded-md border border-border bg-muted px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input id="name" type="text" autoComplete="name" className={inputClass} {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input id="email" type="email" autoComplete="email" className={inputClass} {...register("email")} />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
          Phone <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input id="phone" type="tel" autoComplete="tel" className={inputClass} {...register("phone")} />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${inputClass} resize-y`}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      {submitState === "success" && (
        <p className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
          Thank you! Your message has been received. We&apos;ll be in touch soon.
        </p>
      )}
      {submitState === "error" && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-gradient-gold font-bold text-primary-foreground hover:opacity-90"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
