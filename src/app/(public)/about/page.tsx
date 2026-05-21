import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Mission, values, and founder story of Mission 2 Markets — veteran-led sales excellence for all professionals.",
};

const values = [
  "Ownership",
  "Mission First / People Always",
  "Service Beyond the Uniform",
  "Discipline Creates Freedom",
  "Defined Leadership",
  "Integrity Without Compromise",
  "Adapt and Overcome",
  "Veteran Collective",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">About Us</p>
      <h1 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
        Veteran-Led. Built for Everyone.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Mission 2 Markets was founded by U.S. Army veterans who believe discipline,
        accountability, and mission-focus build elite sales professionals and principled
        leaders—whether you are transitioning from service, leveling up in your current
        role, or leading a team in the private sector.
      </p>

      <section className="mt-16">
        <h2 className="font-heading text-2xl font-bold">Our Mission</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          We translate military-grade discipline into marketplace results—through
          consulting, training, and resources for professionals at every stage of
          their sales and leadership journey.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="font-heading text-2xl font-bold">Core Values</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {values.map((value) => (
            <li
              key={value}
              className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium"
            >
              {value}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 rounded-xl border border-border bg-card p-8">
        <h2 className="font-heading text-2xl font-bold">Founder Story</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Our founders transitioned from military leadership into enterprise sales
          and consulting—building teams, pipelines, and partnerships at the highest
          levels. Mission 2 Markets is the playbook they wished they had on day one
          of their civilian careers.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Today, we train sales professionals and leaders from every background with the
          same rigor as a pre-mission brief: clear objectives, disciplined execution,
          and accountability to results.
        </p>
      </section>

      <div className="mt-12">
        <Button render={<Link href="/contact" />} className="bg-gradient-gold font-bold text-primary-foreground">
          Work With Us
        </Button>
      </div>
    </div>
  );
}
