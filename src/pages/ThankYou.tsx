import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, AlertCircle, Loader2, Clock, Facebook, Repeat } from "lucide-react";
import Header from "@/components/Header";
import SHFooter from "@/components/sh/SHFooter";
import { useEffect, useMemo, useState } from "react";
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
  const [openMonthly, setOpenMonthly] = useState(false);
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
        } as never);
        if (cancelled) return;
        if (error) throw error;
        setResult(data as VerifyResult);
      } catch {
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

  const amountCents = result?.donation?.amount_cents ?? result?.amount_total ?? null;
  const currency = result?.donation?.currency ?? result?.currency ?? "usd";
  const email = result?.donation?.donor_email ?? result?.customer_email ?? null;
  const name = result?.donation?.donor_name ?? result?.customer_name ?? null;
  const firstName = name?.trim().split(/\s+/)[0] ?? null;
  const isRecurring = result?.donation?.is_recurring ?? result?.is_recurring ?? false;
  const paid = result?.paid ?? result?.donation?.status === "completed";

  // TikTok CompletePayment dedup
  useEffect(() => {
    if (!paid || !sessionId) return;
    const realAmountCents = result?.donation?.amount_cents ?? result?.amount_total ?? null;
    const realCurrency = result?.donation?.currency ?? result?.currency ?? null;
    if (!realAmountCents || !realCurrency) return;
    const key = `ttq_cp_${sessionId}`;
    if (sessionStorage.getItem(key)) return;
    const ttq = (window as { ttq?: { track?: (e: string, p?: Record<string, unknown>) => void } }).ttq;
    if (ttq && typeof ttq.track === "function") {
      ttq.track("CompletePayment", {
        value: realAmountCents / 100,
        currency: realCurrency.toUpperCase(),
        content_type: "product",
        content_id: isRecurring ? "monthly_donation" : "one_time_donation",
        description: isRecurring ? "Monthly donation" : "One-time donation",
      });
      sessionStorage.setItem(key, "1");
    }
  }, [paid, sessionId, result, isRecurring]);

  // Compute impact from the actual donated amount (USD-based proxy)
  const impact = useMemo(() => {
    const dollars = (amountCents ?? 0) / 100;
    const meals = Math.max(1, Math.round(dollars * 2.5)); // $1 ≈ 2.5 meals
    const waterKits = Math.max(1, Math.floor(dollars / 8));
    const families = Math.max(1, Math.floor(dollars / 35));
    return { meals, waterKits, families };
  }, [amountCents]);

  const handleShare = async () => {
    const shareData = {
      title: "Spotlight Humanity",
      text: "I just supported families in Gaza through Spotlight Humanity. Join me.",
      url: typeof window !== "undefined" ? window.location.origin : "https://spotlight-humanity.org",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      /* user cancelled */
    }
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const renderSuccess = () => (
    <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[hsl(var(--sh-border))] bg-white shadow-2xl ring-1 ring-black/5">
      {/* Header */}
      <div className="px-6 pb-8 pt-12 text-center sm:px-10">
        <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--sh-green))]/10">
          <CheckCircle2 className="h-10 w-10 text-[hsl(var(--sh-green))]" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <h1
          className="mb-4 text-balance text-3xl font-bold text-[hsl(var(--sh-text))] sm:text-4xl"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          {firstName ? `Thank you, ${firstName}` : "Thank you"}
        </h1>
        <p
          className="mx-auto max-w-md text-pretty text-base text-[hsl(var(--sh-text-secondary))] sm:text-lg"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {amountCents ? (
            <>
              Your generous {isRecurring ? "monthly " : ""}gift of{" "}
              <span className="font-semibold text-[hsl(var(--sh-green))]">
                {formatAmount(amountCents, currency)}
              </span>{" "}
              is already being put to work on the ground.
            </>
          ) : (
            <>Your donation is already being put to work on the ground.</>
          )}
        </p>
      </div>

      {/* Impact */}
      {amountCents ? (
        <div className="px-6 pb-10 sm:px-10">
          <div className="rounded-2xl bg-[hsl(var(--sh-off-white))] p-6 ring-1 ring-black/5">
            <h2
              className="mb-6 text-center text-[10px] font-semibold uppercase italic tracking-[0.2em] text-[hsl(var(--sh-text-muted))]"
              style={{ fontFamily: "Merriweather, serif" }}
            >
              Your Impact Today
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-1 text-3xl font-semibold text-[hsl(var(--sh-green))]">
                  {impact.meals}
                </div>
                <div className="text-pretty text-sm leading-tight text-[hsl(var(--sh-text-muted))]">
                  Meals served to families in need
                </div>
              </div>
              <div className="border-y border-[hsl(var(--sh-border))] py-4 text-center md:border-x md:border-y-0 md:py-0">
                <div className="mb-1 text-3xl font-semibold text-[hsl(var(--sh-green))]">
                  {impact.waterKits}
                </div>
                <div className="text-pretty text-sm leading-tight text-[hsl(var(--sh-text-muted))]">
                  Clean water kits distributed
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-3xl font-semibold text-[hsl(var(--sh-green))]">
                  {impact.families}
                </div>
                <div className="text-pretty text-sm leading-tight text-[hsl(var(--sh-text-muted))]">
                  Families given hope and relief
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Quote */}
      <div className="border-y border-[hsl(var(--sh-green))]/10 bg-[hsl(var(--sh-green))]/[0.03] px-8 py-10 text-center sm:px-12">
        <p
          className="text-pretty text-lg italic text-[hsl(var(--sh-text))] sm:text-xl"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          "The best of people are those that bring most benefit to the rest of mankind."
        </p>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[hsl(var(--sh-green))]">
          — Prophet Muhammad (ﷺ)
        </p>
      </div>

      {/* Next steps */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-4">
          {!isRecurring && (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-[hsl(var(--sh-green))]/30 bg-[hsl(var(--sh-green))]/5 p-4">
              <div className="pr-2">
                <h3 className="text-sm font-semibold text-[hsl(var(--sh-text))]">
                  Make it a monthly gift?
                </h3>
                <p className="text-xs text-[hsl(var(--sh-text-secondary))]">
                  Sustained giving keeps families fed every month.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpenMonthly(true)}
                className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md bg-[hsl(var(--sh-green))] px-4 py-2 text-xs font-semibold text-white ring-1 ring-[hsl(var(--sh-green))] transition hover:bg-[hsl(var(--sh-green-dark))]"
              >
                <Repeat className="h-3.5 w-3.5" aria-hidden="true" />
                Go monthly
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-[hsl(var(--sh-text-secondary))] ring-1 ring-black/5 transition hover:bg-[hsl(var(--sh-off-white))]"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
              Share
            </button>
            <Link
              to="/"
              className="flex items-center justify-center rounded-xl bg-[hsl(var(--sh-light-gray))] px-4 py-2.5 text-sm font-medium text-[hsl(var(--sh-text))] transition hover:bg-[hsl(var(--sh-border))]"
            >
              Home
            </Link>
          </div>
        </div>

        {email ? (
          <p className="mt-8 text-center text-[10px] tracking-wide text-[hsl(var(--sh-text-muted))]">
            A confirmation email has been sent to{" "}
            <span className="text-[hsl(var(--sh-text-secondary))]">{email}</span>.
          </p>
        ) : (
          <p className="mt-8 text-center text-[10px] tracking-wide text-[hsl(var(--sh-text-muted))]">
            A receipt will be emailed to you shortly.
          </p>
        )}
      </div>
    </div>
  );

  const renderState = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--sh-green))]" aria-hidden="true" />
          <p className="mt-6 text-base text-[hsl(var(--sh-text-secondary))]">
            Confirming your donation...
          </p>
        </div>
      );
    }
    if (!sessionId) {
      return (
        <div className="flex max-w-lg flex-col items-center text-center">
          <CheckCircle2 className="h-16 w-16 text-[hsl(var(--sh-green))]" aria-hidden="true" />
          <h1
            className="mt-6 text-3xl font-bold text-[hsl(var(--sh-text))] sm:text-4xl"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Thank you
          </h1>
          <p className="mt-4 text-base text-[hsl(var(--sh-text-secondary))]">
            Your support helps deliver food and emergency aid to families in Gaza.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[hsl(var(--sh-green))] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[hsl(var(--sh-green-dark))]"
          >
            Back to home
          </Link>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex max-w-lg flex-col items-center text-center">
          <AlertCircle className="h-16 w-16 text-[hsl(var(--sh-red))]" aria-hidden="true" />
          <h1
            className="mt-6 text-3xl font-bold text-[hsl(var(--sh-text))] sm:text-4xl"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Could not verify donation
          </h1>
          <p className="mt-4 text-base text-[hsl(var(--sh-text-secondary))]">{error}</p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[hsl(var(--sh-green))] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[hsl(var(--sh-green-dark))]"
          >
            Back to home
          </Link>
        </div>
      );
    }
    if (paid) return renderSuccess();
    return (
      <div className="flex max-w-lg flex-col items-center text-center">
        <Clock className="h-16 w-16 text-[hsl(var(--sh-green))]" aria-hidden="true" />
        <h1
          className="mt-6 text-3xl font-bold text-[hsl(var(--sh-text))] sm:text-4xl"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Donation pending
        </h1>
        <p className="mt-4 text-base text-[hsl(var(--sh-text-secondary))]">
          Your payment is still being processed. You'll receive an email confirmation as soon as it
          completes.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-[hsl(var(--sh-green))] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[hsl(var(--sh-green-dark))]"
        >
          Back to home
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--sh-off-white))]">
      <Header onDonateClick={() => setOpen(true)} />
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
        {renderState()}
      </main>
      <SHFooter />
      <DonationModal isOpen={open} onDismiss={() => setOpen(false)} onDonate={() => setOpen(false)} />
      <DonationModal
        isOpen={openMonthly}
        onDismiss={() => setOpenMonthly(false)}
        onDonate={() => setOpenMonthly(false)}
      />
    </div>
  );
};

export default ThankYou;
