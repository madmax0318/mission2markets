import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { leadFormSchema } from "@/lib/validations/lead";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Database not configured. Add Supabase env vars to .env.local." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const parsed = leadFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { name, email, phone, message } = parsed.data;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        phone: phone?.trim() || null,
        message,
        status: "New",
      })
      .select("id")
      .single();

    if (error) {
      console.error("POST /api/leads", error);
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500 },
      );
    }

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/leads", error);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 },
    );
  }
}
