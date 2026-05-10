import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2025-08-27.basil",
  });
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") || "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
  );

  const sig = req.headers.get("stripe-signature") || "";
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await supabase
        .from("donations")
        .update({
          status: "completed",
          stripe_payment_intent_id: (session.payment_intent as string) || null,
          stripe_subscription_id: (session.subscription as string) || null,
          donor_email: session.customer_details?.email || session.customer_email || null,
          donor_name: session.customer_details?.name || null,
        })
        .eq("stripe_session_id", session.id);
    } else if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      await supabase
        .from("donations")
        .update({ status: "expired" })
        .eq("stripe_session_id", session.id);
    } else if (event.type === "invoice.paid") {
      const invoice = event.data.object as Stripe.Invoice;
      const subId = (invoice as any).subscription as string | null;
      if (subId) {
        // Record recurring renewal as a new completed donation row
        await supabase.from("donations").insert({
          stripe_subscription_id: subId,
          stripe_payment_intent_id: (invoice as any).payment_intent || null,
          donor_email: invoice.customer_email,
          amount_cents: invoice.amount_paid,
          currency: invoice.currency,
          is_recurring: true,
          status: "completed",
        });
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return new Response(JSON.stringify({ error: "Handler error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
