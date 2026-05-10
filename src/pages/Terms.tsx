import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import DonationModal from "@/components/DonationModal";

const Terms = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header onDonateClick={() => setOpen(true)} />
      <main className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Terms of Use</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="prose prose-sm mt-8 max-w-none text-foreground/85">
          <p>By using this website and donating to Human Releaf you agree to the following terms.</p>
          <h2 className="mt-8 text-xl font-bold">Donations</h2>
          <p>All donations are processed in USD via Stripe. Recurring donations renew monthly until cancelled. You can cancel any recurring donation by contacting us at <a className="text-primary underline" href="mailto:hello@humanreleaf.org">hello@humanreleaf.org</a>.</p>
          <h2 className="mt-8 text-xl font-bold">Use of funds</h2>
          <p>Donations support our humanitarian programs in Gaza. We reserve the right to allocate funds to the area of greatest need.</p>
          <h2 className="mt-8 text-xl font-bold">Acceptable use</h2>
          <p>You agree not to misuse this site, attempt fraudulent transactions, or interfere with its operation.</p>
        </div>
      </main>
      <Footer onDonateClick={() => setOpen(true)} />
      <DonationModal isOpen={open} onDismiss={() => setOpen(false)} onDonate={() => setOpen(false)} />
    </div>
  );
};

export default Terms;
