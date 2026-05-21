import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Newsletter is not available yet." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors.email?.[0] ?? "Invalid email" },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: parsed.data.email.toLowerCase().trim(),
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({
          message: "You are already on the list.",
        });
      }
      console.error("[newsletter]", error);
      return NextResponse.json(
        { error: "Could not subscribe." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Subscribed. You will receive new insights by email.",
    });
  } catch (err) {
    console.error("[newsletter]", err);
    return NextResponse.json({ error: "Could not subscribe." }, { status: 500 });
  }
}
