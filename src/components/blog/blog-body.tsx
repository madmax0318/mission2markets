import Link from "next/link";
import type { ReactNode } from "react";

function renderInline(text: string, keyPrefix: string) {
  const parts: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let partIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={`${keyPrefix}-b-${partIndex++}`} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isInternal = href.startsWith("/");
        parts.push(
          isInternal ? (
            <Link
              key={`${keyPrefix}-l-${partIndex++}`}
              href={href}
              className="font-medium text-primary hover:underline"
            >
              {label}
            </Link>
          ) : (
            <a
              key={`${keyPrefix}-l-${partIndex++}`}
              href={href}
              className="font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          ),
        );
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function BlogBody({ body }: { body: string }) {
  return (
    <div className="mt-6 max-w-none">
      {body.split("\n").map((line, i) => {
        if (line.startsWith("## ")) {
          return (
            <h2 key={i} className="mt-8 font-heading text-2xl font-bold text-foreground">
              {line.slice(3)}
            </h2>
          );
        }

        if (line.trim() === "") {
          return <div key={i} className="h-2" />;
        }

        if (line.startsWith("- ")) {
          return (
            <li key={i} className="mt-2 ml-4 list-disc leading-relaxed text-muted-foreground">
              {renderInline(line.slice(2), `li-${i}`)}
            </li>
          );
        }

        return (
          <p key={i} className="mt-4 leading-relaxed text-muted-foreground">
            {renderInline(line, `p-${i}`)}
          </p>
        );
      })}
    </div>
  );
}
