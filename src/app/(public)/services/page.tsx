import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Training programs, corporate partnerships, and executive coaching for sales excellence—open to all professionals.",
};

const programs = [
  {
    title: "Sales Bootcamp",
    description:
      "8-week intensive cohort covering discovery, objection handling, negotiation, and pipeline management—for professionals at any stage, including those transitioning from military service.",
    outcomes: ["Enterprise-ready playbook", "Live role-play", "Peer accountability"],
  },
  {
    title: "Corporate Partnerships",
    description:
      "Partner with Mission 2 Markets to build hiring pipelines, onboarding playbooks, and high-performance sales teams inside your organization.",
    outcomes: ["Talent pipeline design", "Leadership workshops", "Retention frameworks"],
  },
  {
    title: "Executive Coaching",
    description:
      "1:1 and team coaching for sales professionals and leaders who need tactical refinement and strategic career acceleration.",
    outcomes: ["Personalized battle plans", "Pipeline reviews", "Leadership cadence"],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Services</p>
      <h1 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
        Consulting & Training Programs
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        From individual career growth to enterprise partnership—we meet you at your
        mission phase and build the capability to win in sales.
      </p>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {programs.map((program) => (
          <Card key={program.title} className="border-border/80 bg-card">
            <CardHeader>
              <CardTitle className="font-heading text-xl">{program.title}</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {program.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {program.outcomes.map((o) => (
                  <li key={o} className="flex gap-2">
                    <span className="text-primary">▸</span>
                    {o}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-primary/20 bg-card p-8 text-center">
        <h2 className="font-heading text-2xl font-bold">Schedule a Strategy Call</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Tell us about your goals—individual transition, team build-out, or corporate partnership.
        </p>
        <Button
          render={<Link href="/contact" />}
          size="lg"
          className="mt-8 bg-gradient-gold font-bold text-primary-foreground hover:opacity-90"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
