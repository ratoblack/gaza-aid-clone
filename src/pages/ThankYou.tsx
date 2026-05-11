import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, AlertCircle, Loader2, Clock } from "lucide-react";
import Header from "@/components/Header";
import SHFooter from "@/components/sh/SHFooter";
import { useEffect, useState } from "react";
import DonationModal from "@/components/DonationModal";
import { supabase } from "@/integrations/supabase/client";

interface VerifyResult {
  paid: boolean;
  status: string | null;
  payment_status: string | null;
  amount_total: number | null;
  currency: string | null;
  customer_email: string | null;
  customer_name: string | null;
  is_recurring: boolean;
  donation: {
    amount_cents: number;
    currency: string;
    is_recurring: boolean;
    status: string;
    donor_email: string | null;
    donor_name: string | null;
    created_at: string;
  } | null;
}

const ThankYou = () => {
  const [open, setOpen] = useState(false);
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyResult | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    const run = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("verify-donation", {
          method: "GET" as never,
          // supabase-js doesn't pass query params, so call via fetch fallback below
        } as never);
        if (cancelled) return;
        if (error) throw error;
        setResult(data as VerifyResult);
      } catch {
        // Fallback: call function URL directly with query string
        try {
          const url = `https://srgheudzmjyxjpoqdcbs.supabase.co/functions/v1/verify-donation?session_id=${encodeURIComponent(sessionId)}`;
          const res = await fetch(url, {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Verification failed");
          if (!cancelled) setResult(data);
        } catch (e) {
          if (!cancelled) setError(e instanceof Error ? e.message : "Verification failed");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const formatAmount = (cents: number | null, currency: string | null) => {
    if (!cents) return null;
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: (currency || "usd").toUpperCase(),
      }).format(cents / 100);
    } catch {
      return `$${(cents / 100).toFixed(2)}`;
    }
  };

  const amount = result?.donation?.amount_cents ?? result?.amount_total ?? null;
  const currency = result?.donation?.currency ?? result?.currency ?? "usd";
  const email = result?.donation?.donor_email ?? result?.customer_email ?? null;
  const isRecurring = result?.donation?.is_recurring ?? result?.is_recurring ?? false;
  const paid = result?.paid ?? result?.donation?.status === "completed";

  return (
    <div className="min-h-screen bg-background">
      <Header onDonateClick={() => setOpen(true)} />
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center">
        {loading ? (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-primary" aria-hidden="true" />
            <p className="mt-6 text-base text-foreground/75">Confirming your donation...</p>
          </>
        ) : !sessionId ? (
          <>
            <CheckCircle2 className="h-16 w-16 text-primary" aria-hidden="true" />
            <h1 className="mt-6 text-3xl font-extrabold text-foreground sm:text-4xl">Thank you</h1>
            <p className="mt-4 max-w-lg text-base text-foreground/75">
              Your support helps deliver food and emergency aid to families in Gaza.
            </p>
          </>
        ) : error ? (
          <>
            <AlertCircle className="h-16 w-16 text-destructive" aria-hidden="true" />
            <h1 className="mt-6 text-3xl font-extrabold text-foreground sm:text-4xl">Could not verify donation</h1>
            <p className="mt-4 max-w-lg text-base text-foreground/75">{error}</p>
          </>
        ) : paid ? (
          <>
            <CheckCircle2 className="h-16 w-16 text-primary" aria-hidden="true" />
            <h1 className="mt-6 text-3xl font-extrabold text-foreground sm:text-4xl">
              Thank you for your generosity
            </h1>
            <p className="mt-4 max-w-lg text-base text-foreground/75">
              {amount ? (
                <>
                  Your {isRecurring ? "monthly " : ""}donation of{" "}
                  <strong className="text-foreground">{formatAmount(amount, currency)}</strong> was received.
                </>
              ) : (
                "Your donation was received."
              )}{" "}
              {email ? (
                <>A receipt has been sent to <strong className="text-foreground">{email}</strong>.</>
              ) : (
                "A receipt will be emailed to you shortly."
              )}
            </p>
          </>
        ) : (
          <>
            <Clock className="h-16 w-16 text-primary" aria-hidden="true" />
            <h1 className="mt-6 text-3xl font-extrabold text-foreground sm:text-4xl">Donation pending</h1>
            <p className="mt-4 max-w-lg text-base text-foreground/75">
              Your payment is still being processed. You'll receive an email confirmation as soon as it completes.
            </p>
          </>
        )}

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition hover:brightness-110"
        >
          Back to home
        </Link>
      </main>
      <SHFooter />
      <DonationModal isOpen={open} onDismiss={() => setOpen(false)} onDonate={() => setOpen(false)} />
    </div>
  );
};

export default ThankYou;
