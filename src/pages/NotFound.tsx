import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import SHFooter from "@/components/sh/SHFooter";
import { useState } from "react";
import DonationModal from "@/components/DonationModal";

const NotFound = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header onDonateClick={() => setOpen(true)} />
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center">
        <p className="text-6xl font-extrabold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-extrabold text-foreground sm:text-3xl">Page not found</h1>
        <p className="mt-3 max-w-md text-base text-foreground/70">
          The page you’re looking for doesn’t exist. While you’re here, families in Gaza still need our help.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary">
            Back to home
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:brightness-110"
          >
            Donate Now
          </button>
        </div>
      </main>
      <SHFooter />
      <DonationModal isOpen={open} onDismiss={() => setOpen(false)} onDonate={() => setOpen(false)} />
    </div>
  );
};

export default NotFound;
