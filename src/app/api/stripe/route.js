import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the Secret Key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { cart } = await request.json();

    // 1. Define the Line Items (What Stripe shows on the receipt)
    const lineItems = cart.map((item) => ({
      price_data: {
        currency: 'gbp', // Pounds
        product_data: {
          name: item.name,
          description: item.variant.size_label,
          images: [item.image_url], // Shows the food image on checkout!
        },
        unit_amount: Math.round(item.variant.price * 100), // Stripe works in pennies (e.g. 1000 = £10.00)
      },
      quantity: item.quantity,
    }));

    // 2. Create the Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    // 3. Send the URL back to the frontend
    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 });
  }
}