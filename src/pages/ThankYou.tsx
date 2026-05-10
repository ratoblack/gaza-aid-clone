import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import DonationModal from "@/components/DonationModal";

const ThankYou = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header onDonateClick={() => setOpen(true)} />
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center">
        <CheckCircle2 className="h-16 w-16 text-primary" aria-hidden="true" />
        <h1 className="mt-6 text-3xl font-extrabold text-foreground sm:text-4xl">Thank you for your generosity</h1>
        <p className="mt-4 max-w-lg text-base text-foreground/75">
          Your donation will help deliver food, water and emergency aid to families in Gaza. A receipt has been sent to your email.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:brightness-110"
        >
          Back to home
        </Link>
      </main>
      <Footer onDonateClick={() => setOpen(true)} />
      <DonationModal isOpen={open} onDismiss={() => setOpen(false)} onDonate={() => setOpen(false)} />
    </div>
  );
};

export default ThankYou;
