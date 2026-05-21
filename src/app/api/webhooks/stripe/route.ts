import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    console.error("[stripe-webhook] Signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const productId = session.metadata?.product_id ?? null;

    try {
      const supabase = createAdminClient();
      const { error } = await supabase.from("orders").insert({
        stripe_session_id: session.id,
        customer_email: session.customer_details?.email ?? null,
        product_id: productId,
        amount_total: session.amount_total,
        status: "paid",
      });

      if (error) {
        console.error("[stripe-webhook] Failed to save order:", error);
        return NextResponse.json(
          { error: "Failed to persist order" },
          { status: 500 },
        );
      }
    } catch (err) {
      console.error("[stripe-webhook] Database error:", err);
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}
