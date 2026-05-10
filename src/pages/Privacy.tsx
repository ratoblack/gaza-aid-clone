import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import DonationModal from "@/components/DonationModal";

const Privacy = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header onDonateClick={() => setOpen(true)} />
      <main className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="prose prose-sm mt-8 max-w-none text-foreground/85">
          <p>Human Releaf ("we", "us") respects your privacy. This page explains what data we collect when you donate or browse our site and how we use it.</p>
          <h2 className="mt-8 text-xl font-bold">Data we collect</h2>
          <ul className="list-disc pl-6">
            <li>Donation details (amount, frequency, comment) processed securely by Stripe.</li>
            <li>Contact details you provide at checkout (email, name, billing country).</li>
            <li>Anonymous analytics to improve site performance.</li>
          </ul>
          <h2 className="mt-8 text-xl font-bold">How we use it</h2>
          <p>To process donations, issue receipts, and communicate updates about our work. We never sell your data.</p>
          <h2 className="mt-8 text-xl font-bold">Your rights</h2>
          <p>You can request access, correction or deletion of your data at any time by emailing <a className="text-primary underline" href="mailto:privacy@humanreleaf.org">privacy@humanreleaf.org</a>.</p>
        </div>
      </main>
      <Footer onDonateClick={() => setOpen(true)} />
      <DonationModal isOpen={open} onDismiss={() => setOpen(false)} onDonate={() => setOpen(false)} />
    </div>
  );
};

export default Privacy;
