import { useState, useCallback } from "react";
import { Shield, X, ArrowLeft, Loader2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";
import heroImage2 from "@/assets/hero-2.png";
import logo from "@/assets/logo.png";

const stripePromise = loadStripe("pk_live_51TIzxZ1VLef389f2LHcQqwQMBgGYlB0hSbDXaKb6TG6BL3xQhCL3k3NTX7dBIesFCXLtVfxeXqJgTPkQTuRmqsM00LXxwCLBu");

interface DonationModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onDonate: (amount: number, isMonthly: boolean) => void;
}

const presetAmounts = [5, 10, 20, 45, 80];

const DonationModal = ({ isOpen, onDismiss, onDonate }: DonationModalProps) => {
  const [selectedAmount, setSelectedAmount] = useState(20);
  const [isMonthly, setIsMonthly] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutAmount, setCheckoutAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setShowCheckout(false);
    setCheckoutAmount(null);
    onDismiss();
  };

  const fetchClientSecret = useCallback(async () => {
    const { data, error } = await supabase.functions.invoke(
      "create-donation-checkout",
      { body: { amount: checkoutAmount } }
    );
    if (error) throw error;
    return data.clientSecret;
  }, [checkoutAmount]);

  const handleDonate = () => {
    setCheckoutAmount(selectedAmount);
    setShowCheckout(true);
  };

  if (!isOpen) return null;

  if (showCheckout && checkoutAmount) {
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div
          className="relative w-full max-w-[480px] max-h-[90vh] overflow-hidden rounded-2xl bg-card shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <button
              type="button"
              onClick={() => {
                setShowCheckout(false);
                setCheckoutAmount(null);
              }}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <span className="text-sm font-medium text-foreground">
              Secure Checkout — ${checkoutAmount}
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "calc(90vh - 52px)" }}>
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-panel relative w-full max-w-[420px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-foreground/70 text-primary-foreground shadow-lg transition-transform hover:scale-110"
          aria-label="Close donation modal"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {/* Hero image + brief text */}
        <div className="relative h-[110px] w-full overflow-hidden">
          <img
            src={heroImage2}
            alt="Human Releaf volunteers delivering a food pack to a child in Gaza"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
          <div className="absolute bottom-2 left-3 right-3 flex items-end gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-primary overflow-hidden">
              <img src={logo} alt="Human Releaf" className="h-full w-full object-contain" />
            </div>
            <h3 className="text-sm font-bold leading-tight text-foreground">
              Gaza Emergency Appeal
            </h3>
          </div>
        </div>

        <div className="px-4 py-1.5">
          <p className="text-xs leading-[1.4] text-foreground/75">
            Gaza faces devastating famine. <strong>Human Releaf</strong> delivers food baskets to families in desperate need. <strong>Will you help?</strong>
          </p>
        </div>

        {/* Payment section */}
        <div className="px-4 pb-3 pt-1">
          <div className="mb-2 flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-primary">
              <Shield className="h-3 w-3" />
            </div>
            <span className="text-xs font-semibold text-foreground">Secure donation</span>
          </div>

          <div className="mb-2 grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setIsMonthly(false)}
              className={`payment-pill px-2 text-xs !min-h-[2.25rem] ${!isMonthly ? "active" : ""}`}
            >
              Give once
            </button>
            <button
              type="button"
              onClick={() => setIsMonthly(true)}
              className={`payment-pill gap-1.5 px-2 text-xs !min-h-[2.25rem] ${isMonthly ? "active" : ""}`}
            >
              <span aria-hidden="true">❤️</span>
              <span>Monthly</span>
            </button>
          </div>

          <div className="mb-2 grid grid-cols-5 gap-1.5">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setSelectedAmount(amount)}
                className={`payment-pill px-1 text-sm !min-h-[2.25rem] ${selectedAmount === amount ? "active" : ""}`}
              >
                ${amount}
              </button>
            ))}
          </div>

          <div className="mb-2 flex overflow-hidden rounded-lg border border-border bg-card">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-base text-foreground/75">$</span>
              <input
                type="number"
                inputMode="decimal"
                value={selectedAmount}
                readOnly
                className="h-9 w-full bg-card pl-7 pr-2 text-base text-foreground outline-none"
              />
            </div>
            <div className="flex items-center border-l border-border bg-muted px-2.5 text-[0.65rem] font-medium text-muted-foreground">
              USD
            </div>
          </div>

          {!showComment ? (
            <button
              type="button"
              onClick={() => setShowComment(true)}
              className="mb-2 text-[0.65rem] text-foreground/65 underline underline-offset-2"
            >
              Add comment
            </button>
          ) : (
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="mb-2 h-12 w-full resize-none rounded-lg border border-border bg-card p-2 text-xs text-foreground outline-none focus:border-ring"
            />
          )}

          <button
            type="button"
            onClick={handleDonate}
            disabled={isLoading}
            className="payment-primary-button text-sm !min-h-[2.75rem]"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Processing...
              </span>
            ) : (
              "Donate"
            )}
          </button>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 text-center text-[0.6rem] text-primary">
            <a href="#" className="hover:underline">Is my donation secure?</a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="hover:underline">Can I cancel my recurring donation?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
