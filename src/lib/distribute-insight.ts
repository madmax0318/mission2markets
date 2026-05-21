import { createAdminClient } from "@/lib/supabase/admin";
import { getAppUrl } from "@/lib/stripe";
import type { BlogPost } from "@/types/database";

export type DistributionResult = {
  linkedin: { ok: boolean; error?: string };
  newsletter: { ok: boolean; sent: number; error?: string };
};

function isLinkedInConfigured(): boolean {
  return Boolean(
    process.env.LINKEDIN_ACCESS_TOKEN &&
      process.env.LINKEDIN_ORGANIZATION_ID,
  );
}

function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

async function postToLinkedIn(post: BlogPost): Promise<{ ok: boolean; error?: string }> {
  if (!isLinkedInConfigured()) {
    return { ok: false, error: "LinkedIn not configured" };
  }

  const orgId = process.env.LINKEDIN_ORGANIZATION_ID!;
  const token = process.env.LINKEDIN_ACCESS_TOKEN!;
  const url = `${getAppUrl()}/blog/${post.slug}`;
  const commentary = [
    post.title,
    "",
    post.excerpt || "New insight from Mission 2 Markets.",
    "",
    `Read more: ${url}`,
  ].join("\n");

  try {
    const response = await fetch("https://api.linkedin.com/rest/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "LinkedIn-Version": "202401",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        author: `urn:li:organization:${orgId}`,
        commentary,
        visibility: "PUBLIC",
        distribution: { feedDistribution: "MAIN_FEED" },
        lifecycleState: "PUBLISHED",
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("[linkedin] post failed", response.status, text);
      return { ok: false, error: text };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "LinkedIn request failed";
    console.error("[linkedin]", message);
    return { ok: false, error: message };
  }
}

async function sendNewsletter(post: BlogPost): Promise<{
  ok: boolean;
  sent: number;
  error?: string;
}> {
  if (!isEmailConfigured()) {
    return { ok: false, sent: 0, error: "Email not configured" };
  }

  const supabase = createAdminClient();
  const { data: subscribers, error } = await supabase
    .from("newsletter_subscribers")
    .select("email")
    .eq("active", true);

  if (error) {
    return { ok: false, sent: 0, error: error.message };
  }

  if (!subscribers?.length) {
    return { ok: true, sent: 0 };
  }

  const url = `${getAppUrl()}/blog/${post.slug}`;
  const from = process.env.EMAIL_FROM!;
  const resendKey = process.env.RESEND_API_KEY!;

  let sent = 0;
  const errors: string[] = [];

  for (const { email } of subscribers) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: email,
          subject: `New insight: ${post.title}`,
          html: `
            <div style="font-family:sans-serif;max-width:560px;line-height:1.6;color:#111">
              <p style="color:#b8860b;font-weight:bold;text-transform:uppercase;font-size:12px;letter-spacing:0.1em">Mission 2 Markets</p>
              <h1 style="font-size:22px;margin:0 0 12px">${post.title}</h1>
              <p>${post.excerpt || "A new leadership insight is live."}</p>
              <p><a href="${url}" style="color:#b8860b;font-weight:bold">Read the full insight →</a></p>
              <p style="font-size:12px;color:#666;margin-top:32px">You subscribed at mission2markets.com</p>
            </div>
          `,
        }),
      });

      if (response.ok) {
        sent++;
      } else {
        const text = await response.text();
        errors.push(`${email}: ${text}`);
      }
    } catch (err) {
      errors.push(
        `${email}: ${err instanceof Error ? err.message : "send failed"}`,
      );
    }
  }

  if (sent === 0 && errors.length > 0) {
    return { ok: false, sent: 0, error: errors[0] };
  }

  return { ok: true, sent, error: errors.length ? errors.join("; ") : undefined };
}

export async function distributeInsight(
  post: BlogPost,
): Promise<DistributionResult> {
  const linkedin = await postToLinkedIn(post);
  const newsletter = await sendNewsletter(post);

  if (isSupabaseAdminAvailable()) {
    const supabase = createAdminClient();
    const updates: Record<string, string> = {};
    if (linkedin.ok) updates.linkedin_shared_at = new Date().toISOString();
    if (newsletter.ok && newsletter.sent >= 0) {
      updates.newsletter_sent_at = new Date().toISOString();
    }
    if (Object.keys(updates).length > 0) {
      await supabase.from("blog_posts").update(updates).eq("id", post.id);
    }
  }

  return { linkedin, newsletter };
}

function isSupabaseAdminAvailable(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function distributionStatus(post: BlogPost): string[] {
  const lines: string[] = [];
  if (post.linkedin_shared_at) {
    lines.push(`LinkedIn: shared ${new Date(post.linkedin_shared_at).toLocaleString()}`);
  } else if (isLinkedInConfigured()) {
    lines.push("LinkedIn: pending");
  } else {
    lines.push("LinkedIn: not configured");
  }
  if (post.newsletter_sent_at) {
    lines.push(`Email: sent ${new Date(post.newsletter_sent_at).toLocaleString()}`);
  } else if (isEmailConfigured()) {
    lines.push("Email: pending");
  } else {
    lines.push("Email: not configured");
  }
  return lines;
}
