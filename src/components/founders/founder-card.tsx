import { ExternalLink } from "lucide-react";
import { FounderHeadshot } from "@/components/founders/founder-headshot";
import type { Founder } from "@/lib/founders";

type FounderCardProps = {
  founder: Founder;
  priorityImage?: boolean;
};

export function FounderCard({ founder, priorityImage }: FounderCardProps) {
  return (
    <article className="grid gap-10 lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-14">
      <FounderHeadshot
        name={founder.name}
        src={founder.headshot}
        priority={priorityImage}
      />

      <div>
        <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
          {founder.role}
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {founder.name}
          <span className="text-muted-foreground">, {founder.credentials}</span>
        </h2>
        <p className="mt-2 text-muted-foreground">{founder.location}</p>

        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
          {founder.bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="font-heading text-sm font-semibold tracking-wider text-primary uppercase">
            Highlights
          </h3>
          <ul className="mt-3 space-y-2">
            {founder.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-foreground/90"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="font-heading text-sm font-semibold tracking-wider text-primary uppercase">
            Education
          </h3>
          <ul className="mt-3 space-y-2">
            {founder.education.map((item) => (
              <li
                key={item}
                className="text-sm leading-relaxed text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={founder.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-gold-muted"
        >
          View on LinkedIn
          <ExternalLink className="size-4" aria-hidden />
        </a>
      </div>
    </article>
  );
}
