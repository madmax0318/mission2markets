import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/database";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function InsightCard({ post }: { post: BlogPost }) {
  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="flex flex-col border-border/80 bg-card transition-colors hover:border-primary/30">
      <CardHeader>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
          Insight
        </p>
        <CardTitle className="font-heading text-xl leading-snug">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-primary"
          >
            {post.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{date}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="line-clamp-4 text-base leading-relaxed">
          {post.excerpt || "Read the full insight on Mission 2 Markets."}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Read insight
          <ArrowRight className="size-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
