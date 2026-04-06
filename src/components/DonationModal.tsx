import { useState } from "react";
import { Shield, X, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroImage2 from "@/assets/hero-2.png";
import logo from "@/assets/logo.png";

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
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setCheckoutUrl(null);
    onDismiss();
  };

  const handleDonate = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-donation-checkout", {
        body: { amount: selectedAmount },
      });
      if (error) throw error;
      if (data?.url) {
        setCheckoutUrl(data.url);
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  if (checkoutUrl) {
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div
          className="relative w-full max-w-[600px] max-h-[90vh] overflow-hidden rounded-2xl bg-card shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <button
              type="button"
              onClick={() => setCheckoutUrl(null)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <span className="text-sm font-medium text-foreground">Secure Checkout</span>
            <button
              type="button"
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <iframe
            src={checkoutUrl}
            className="w-full border-0"
            style={{ height: "calc(90vh - 52px)" }}
            title="Stripe Checkout"
            allow="payment"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="relative w-full max-w-[900px]" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/80 text-primary-foreground shadow-lg transition-transform hover:scale-110"
          aria-label="Close donation modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid items-stretch gap-4 md:grid-cols-[1.16fr_0.84fr]">
          <div className="modal-panel overflow-hidden">
            <img
              src={heroImage2}
              alt="Human Releaf volunteers delivering a food pack to a child in Gaza"
              className="h-[200px] w-full object-cover"
            />
            <div className="px-5 py-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-primary overflow-hidden">
                <img src={logo} alt="Human Releaf" className="h-full w-full object-contain" />
              </div>
              <h3 className="mb-2 text-xl font-bold leading-tight text-foreground">
                Gaza Emergency Appeal
              </h3>
              <p className="mb-2 text-sm leading-6 text-foreground/78">
                Gaza is facing a devastating famine, with children going days without food as their parents
                struggle to provide even the most basic necessities. Dozens of children have already died
                from starvation, a heartbreaking reality for families who have already suffered so much.
              </p>
              <p className="text-sm leading-6 text-foreground/78">
                <strong>Human Releaf</strong> is dedicated to providing food baskets and other basic
                necessities to those affected by the conflict in Palestine who desperately need our support.
                <strong> Will you join us in this mission?</strong>
              </p>
            </div>
          </div>

          <div className="modal-panel p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
                <Shield className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">Secure donation</h3>
            </div>

            <div className="mb-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsMonthly(false)}
                className={`payment-pill px-3 text-sm ${!isMonthly ? "active" : ""}`}
              >
                Give once
              </button>
              <button
                type="button"
                onClick={() => setIsMonthly(true)}
                className={`payment-pill gap-2 px-3 text-sm ${isMonthly ? "active" : ""}`}
              >
                <span aria-hidden="true">❤️</span>
                <span>Monthly</span>
              </button>
            </div>

            <div className="mb-3 grid grid-cols-3 gap-2">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setSelectedAmount(amount)}
                  className={`payment-pill px-2 text-base ${selectedAmount === amount ? "active" : ""}`}
                >
                  ${amount.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="mb-3 flex overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-foreground/75">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={selectedAmount}
                  readOnly
                  className="h-11 w-full bg-card pl-9 pr-3 text-xl text-foreground outline-none"
                />
              </div>
              <div className="flex items-center border-l border-border bg-muted px-3 text-xs font-medium text-muted-foreground">
                USD
              </div>
            </div>

            {!showComment ? (
              <button
                type="button"
                onClick={() => setShowComment(true)}
                className="mb-3 text-xs text-foreground/72 underline underline-offset-2"
              >
                Add comment
              </button>
            ) : (
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="mb-3 h-16 w-full resize-none rounded-xl border border-border bg-card p-2 text-xs text-foreground outline-none focus:border-ring"
              />
            )}

            <button
              type="button"
              onClick={handleDonate}
              disabled={isLoading}
              className="payment-primary-button text-base"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                "Donate"
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-center text-[0.65rem] text-primary">
          <a href="#" className="hover:underline">
            Is my donation secure?
          </a>
          <span className="text-muted-foreground">•</span>
          <a href="#" className="hover:underline">
            Can I cancel my recurring donation?
          </a>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
