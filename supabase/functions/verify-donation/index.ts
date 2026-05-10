import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("session_id");
    if (!sessionId || !sessionId.startsWith("cs_")) {
      return new Response(JSON.stringify({ error: "Invalid session_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid" || session.status === "complete";

    // Best-effort sync if webhook hasn't run yet
    if (paid) {
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
    }

    const { data: donation } = await supabase
      .from("donations")
      .select("amount_cents,currency,is_recurring,status,donor_email,donor_name,created_at")
      .eq("stripe_session_id", session.id)
      .maybeSingle();

    return new Response(
      JSON.stringify({
        paid,
        status: session.status,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_details?.email || session.customer_email || null,
        customer_name: session.customer_details?.name || null,
        is_recurring: session.mode === "subscription",
        donation,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("verify-donation error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
