"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { useState } from "react";

type FounderHeadshotProps = {
  name: string;
  src?: string;
  priority?: boolean;
};

function initialsFromName(name: string): string {
  return name
    .split(" ")
    .filter((part) => part.length > 0)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function FounderHeadshot({
  name,
  src,
  priority = false,
}: FounderHeadshotProps) {
  const [imageError, setImageError] = useState(false);
  const showPlaceholder = !src || imageError;

  if (showPlaceholder) {
    return (
      <div
        className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-b from-primary/10 to-card"
        aria-label={`${name} headshot placeholder`}
      >
        <div className="flex size-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
          <User className="size-10" strokeWidth={1.25} aria-hidden />
        </div>
        <p className="mt-4 font-heading text-3xl font-bold text-primary/80">
          {initialsFromName(name)}
        </p>
        <p className="mt-2 text-xs tracking-wide text-muted-foreground uppercase">
          Photo unavailable
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-primary/20">
      <Image
        src={src}
        alt={`${name} headshot`}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 360px"
        priority={priority}
        onError={() => setImageError(true)}
      />
    </div>
  );
}
