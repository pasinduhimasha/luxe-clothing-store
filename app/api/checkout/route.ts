import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {

  try {

    const { amount, name } = await req.json();

    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "lkr",   // ⭐ FORCE LKR
            product_data: {
              name: name
            },
            unit_amount: Math.round(amount * 100)
          },
          quantity: 1
        }
      ],

      success_url: "http://localhost:3000/cart?success=1",
      cancel_url: "http://localhost:3000/cart?cancel=1"

    });

    return NextResponse.json({ url: session.url });

  } catch (error:any) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}