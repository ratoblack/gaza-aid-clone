import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import DonationModal from "@/components/DonationModal";

const Refund = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header onDonateClick={() => setOpen(true)} />
      <main className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Refund Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="prose prose-sm mt-8 max-w-none text-foreground/85">
          <p>If you donated in error or wish to request a refund, please contact us within 14 days of the transaction at <a className="text-primary underline" href="mailto:hello@humanreleaf.org">hello@humanreleaf.org</a> with your donation receipt. Refunds are issued back to the original payment method, typically within 5–10 business days.</p>
          <p className="mt-4">Recurring donations can be cancelled at any time and will not be charged again from the next billing cycle.</p>
        </div>
      </main>
      <Footer onDonateClick={() => setOpen(true)} />
      <DonationModal isOpen={open} onDismiss={() => setOpen(false)} onDonate={() => setOpen(false)} />
    </div>
  );
};

export default Refund;
