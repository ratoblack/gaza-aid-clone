import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const priceMap: Record<number, string> = {
  5: "price_1TJ0pM1VLef389f2p3qlMRWT",
  10: "price_1TJ0pY1VLef389f24agA1B6V",
  20: "price_1TJ0pn1VLef389f2DeeF7OTT",
  45: "price_1TJ0qv1VLef389f2lVeWmY5G",
  80: "price_1TJ0rK1VLef389f2UjBL7BCe",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY") || "";
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-08-27.basil",
    });

    const { amount } = await req.json();
    const priceId = priceMap[amount];
    if (!priceId) {
      return new Response(JSON.stringify({ error: "Invalid donation amount" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Derive publishable key from secret key pattern
    // sk_live_xxx -> pk_live_xxx, sk_test_xxx -> pk_test_xxx
    const publishableKey = Deno.env.get("STRIPE_PUBLISHABLE_KEY") || "";

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      ui_mode: "embedded",
      return_url: `${req.headers.get("origin")}/?payment=success`,
    });

    return new Response(JSON.stringify({ 
      clientSecret: session.client_secret,
      publishableKey,
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating checkout:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
