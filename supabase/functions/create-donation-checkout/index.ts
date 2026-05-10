import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

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

const ALLOWED_AMOUNTS = [5, 10, 20, 45, 80];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const { amount, isMonthly, comment, donor } = await req.json();
    if (!ALLOWED_AMOUNTS.includes(amount)) {
      return new Response(JSON.stringify({ error: "Invalid donation amount" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const firstName = (donor?.firstName || "").toString().trim().slice(0, 50);
    const lastName = (donor?.lastName || "").toString().trim().slice(0, 50);
    const email = (donor?.email || "").toString().trim().slice(0, 255);
    const phone = donor?.phone ? donor.phone.toString().trim().slice(0, 30) : null;

    if (!firstName || !lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Missing or invalid donor info" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fullName = `${firstName} ${lastName}`;
    const publishableKey = Deno.env.get("STRIPE_PUBLISHABLE_KEY") || "";
    const origin = req.headers.get("origin") || "";

    const lineItem = isMonthly
      ? {
          price_data: {
            currency: "usd",
            product_data: { name: `Monthly Donation - Gaza Emergency Appeal ($${amount})` },
            unit_amount: amount * 100,
            recurring: { interval: "month" as const },
          },
          quantity: 1,
        }
      : { price: priceMap[amount], quantity: 1 };

    // Find or create a Stripe customer with the donor info
    const existing = await stripe.customers.list({ email, limit: 1 });
    const customer = existing.data[0]
      ? await stripe.customers.update(existing.data[0].id, {
          name: fullName,
          phone: phone || undefined,
        })
      : await stripe.customers.create({
          email,
          name: fullName,
          phone: phone || undefined,
        });

    const session = await stripe.checkout.sessions.create({
      line_items: [lineItem],
      mode: isMonthly ? "subscription" : "payment",
      ui_mode: "embedded",
      customer: customer.id,
      return_url: `${origin}/thank-you?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        is_recurring: String(!!isMonthly),
        amount_usd: String(amount),
        comment: (comment || "").slice(0, 500),
        donor_first_name: firstName,
        donor_last_name: lastName,
        donor_phone: phone || "",
      },
    });

    // Persist a pending donation record (service role bypasses RLS)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );
    await supabase.from("donations").insert({
      stripe_session_id: session.id,
      amount_cents: amount * 100,
      currency: "usd",
      is_recurring: !!isMonthly,
      status: "pending",
      comment: (comment || "").slice(0, 500) || null,
      donor_first_name: firstName,
      donor_last_name: lastName,
      donor_name: fullName,
      donor_email: email,
      donor_phone: phone,
    });

    return new Response(
      JSON.stringify({ clientSecret: session.client_secret, publishableKey }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating checkout:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
