import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";
import { getAppUrl, getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { productId?: string };
    const productId = body.productId;

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 },
      );
    }

    const product = await getProductById(productId);

    if (!product || !product.active) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const stripe = getStripe();
    const appUrl = getAppUrl();

    const lineItem = product.stripe_price_id
      ? { price: product.stripe_price_id, quantity: 1 }
      : {
          price_data: {
            currency: "usd",
            unit_amount: product.price_cents,
            product_data: {
              name: product.title,
              description: product.description,
              images: product.image_url ? [product.image_url] : undefined,
              metadata: { productId: product.id },
            },
          },
          quantity: 1,
        };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [lineItem],
      success_url: `${appUrl}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/store?canceled=true`,
      metadata: {
        product_id: product.id,
        product_name: product.title,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[checkout]", error);
    return NextResponse.json(
      { error: "Unable to start checkout" },
      { status: 500 },
    );
  }
}
