import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LifelineSection from "@/components/LifelineSection";
import ProgramsSection from "@/components/ProgramsSection";
import MealsAndFamiliesSection from "@/components/MealsAndFamiliesSection";
import StatsSection from "@/components/StatsSection";
import QuotesSection from "@/components/QuotesSection";
import Footer from "@/components/Footer";
import DonationModal from "@/components/DonationModal";

const Index = () => {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const open = () => setIsDonateOpen(true);
  const close = () => setIsDonateOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      navigate("/thank-you", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header onDonateClick={open} />
      <main id="main-content">
        <HeroSection onDonateClick={open} />
        <LifelineSection onDonateClick={open} />
        <ProgramsSection onDonateClick={open} />
        <MealsAndFamiliesSection onDonateClick={open} />
        <StatsSection />
        <QuotesSection onDonateClick={open} />
      </main>
      <Footer onDonateClick={open} />

      <DonationModal
        isOpen={isDonateOpen}
        onDismiss={close}
        onDonate={() => close()}
      />
    </div>
  );
};

export default Index;
