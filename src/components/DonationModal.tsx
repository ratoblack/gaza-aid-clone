import { useState, useCallback, useEffect } from "react";
import { Shield, X, ArrowLeft, Loader2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import heroImage2 from "@/assets/donation-modal-hero.png";
import logo from "@/assets/logo.png";

interface DonationModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onDonate: (amount: number, isMonthly: boolean) => void;
}

const presetAmounts = [5, 10, 20, 45, 80];

type Step = "amount" | "donor" | "checkout";

const donorSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || isValidPhoneNumber(v), { message: "Invalid phone number" }),
});

const DonationModal = ({ isOpen, onDismiss }: DonationModalProps) => {
  const [selectedAmount, setSelectedAmount] = useState(20);
  const [isMonthly, setIsMonthly] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [step, setStep] = useState<Step>("amount");
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof loadStripe> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Donor info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleClose = () => {
    setStep("amount");
    setStripePromise(null);
    onDismiss();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const goToDonor = () => setStep("donor");

  const submitDonor = async () => {
    const parsed = donorSchema.safeParse({ firstName, lastName, email, phone });
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      setErrors({
        firstName: fe.firstName?.[0] || "",
        lastName: fe.lastName?.[0] || "",
        email: fe.email?.[0] || "",
        phone: fe.phone?.[0] || "",
      });
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-donation-checkout", {
        body: {
          amount: selectedAmount,
          isMonthly,
          comment,
          donor: {
            firstName: parsed.data.firstName,
            lastName: parsed.data.lastName,
            email: parsed.data.email,
            phone: parsed.data.phone || null,
          },
        },
      });
      if (error) throw error;
      if (data?.publishableKey) setStripePromise(loadStripe(data.publishableKey));
      setStep("checkout");
    } catch (err) {
      console.error("Checkout error:", err);
      toast({
        title: "Could not start checkout",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stableFetchClientSecret = useCallback(async () => {
    const { data, error } = await supabase.functions.invoke("create-donation-checkout", {
      body: {
        amount: selectedAmount,
        isMonthly,
        comment,
        donor: { firstName, lastName, email, phone: phone || null },
      },
    });
    if (error) throw error;
    return data.clientSecret;
  }, [selectedAmount, isMonthly, comment, firstName, lastName, email, phone]);

  if (!isOpen) return null;

  if (step === "checkout" && stripePromise) {
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
          className="relative w-full max-w-[480px] max-h-[90vh] overflow-hidden rounded-2xl bg-card shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <button
              type="button"
              onClick={() => {
                setStep("donor");
                setStripePromise(null);
              }}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Back to donor info"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
            <span id="checkout-title" className="text-sm font-medium text-foreground">
              Secure Checkout — ${selectedAmount}
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label="Close checkout"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "calc(90vh - 52px)" }}>
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ fetchClientSecret: stableFetchClientSecret }}
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-title"
        className="modal-panel relative w-full max-w-[480px] max-h-[95vh] overflow-y-auto overflow-x-hidden"
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

        <div className="relative w-full overflow-hidden">
          <img
            src={heroImage2}
            alt="Let's build a better tomorrow — Human Releaf"
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="flex items-center gap-2 px-4 pt-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-primary overflow-hidden">
            <img src={logo} alt="Human Releaf" className="h-full w-full object-contain" />
          </div>
          <h3 id="donation-title" className="text-sm font-bold leading-tight text-foreground">
            Gaza Emergency Appeal
          </h3>
        </div>

        {step === "amount" && (
          <>
            <div className="px-4 py-2 space-y-2">
              <p className="text-xs leading-[1.45] text-foreground/75">
                Spotlight is on the ground in Gaza, serving hot meals daily in refugee camps—because no one should go to bed hungry.
              </p>
              <p className="text-[0.7rem] leading-[1.4] text-foreground/65">
                Spotlight Humanity is a 501(c)(3) nonprofit, donations are tax-deductible. EIN: 33-1754908
              </p>
              <ul className="space-y-0.5 text-xs leading-[1.45] text-foreground/80">
                <li><span aria-hidden="true">🌍</span> 365 Days a Year, We Serve.</li>
                <li><span aria-hidden="true">🥘</span> Every Meal is a Lifeline.</li>
                <li><span aria-hidden="true">💛</span> Your Donation = A Hot Meal for Someone in Need.</li>
              </ul>
            </div>

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
                onClick={goToDonor}
                className="payment-primary-button text-sm !min-h-[2.75rem]"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {step === "donor" && (
          <div className="px-4 pb-4 pt-3">
            <button
              type="button"
              onClick={() => setStep("amount")}
              className="mb-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              aria-label="Back to amount selection"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back
            </button>

            <h4 className="mb-3 text-sm font-bold text-foreground">Your details</h4>

            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="firstName" className="sr-only">First name</label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    maxLength={50}
                    className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-ring"
                  />
                  {errors.firstName && <p className="mt-1 text-[0.65rem] text-destructive">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="sr-only">Last name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    maxLength={50}
                    className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-ring"
                  />
                  {errors.lastName && <p className="mt-1 text-[0.65rem] text-destructive">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  maxLength={255}
                  className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-ring"
                />
                {errors.email && <p className="mt-1 text-[0.65rem] text-destructive">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="mb-1 block text-[0.65rem] text-foreground/65">
                  Phone number (optional)
                </label>
                <PhoneInput
                  id="phone"
                  international
                  defaultCountry="US"
                  value={phone}
                  onChange={setPhone}
                  placeholder="Phone number"
                  className="donor-phone-input"
                />
                {errors.phone && <p className="mt-1 text-[0.65rem] text-destructive">{errors.phone}</p>}
              </div>
            </div>

            <button
              type="button"
              onClick={submitDonor}
              disabled={isLoading}
              className="payment-primary-button mt-4 text-sm !min-h-[2.75rem]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Processing...
                </span>
              ) : (
                `Donate $${selectedAmount}${isMonthly ? "/mo" : ""}`
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationModal;
