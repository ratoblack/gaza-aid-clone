import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/hr/Header";
import HeroSection from "@/components/hr/HeroSection";
import RealitySection from "@/components/hr/RealitySection";
import ImpactSection from "@/components/hr/ImpactSection";
import SadaqahSection from "@/components/hr/SadaqahSection";
import TestimonySection from "@/components/hr/TestimonySection";
import ProjectsSection from "@/components/hr/ProjectsSection";
import NumbersSection from "@/components/hr/NumbersSection";
import FinalCTASection from "@/components/hr/FinalCTASection";
import Footer from "@/components/hr/Footer";
import MobileFloatingCTA from "@/components/hr/MobileFloatingCTA";
import DonationModal from "@/components/DonationModal";

const Index = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      navigate("/thank-you", { replace: true });
    }
  }, [navigate]);

  const onDonate = () => setOpen(true);

  return (
    <div className="min-h-screen bg-cream">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header onDonate={onDonate} />
      <main id="main-content">
        <HeroSection onDonate={onDonate} />
        <RealitySection />
        <ImpactSection onDonate={onDonate} />
        <SadaqahSection onDonate={onDonate} />
        <TestimonySection />
        <ProjectsSection />
        <NumbersSection />
        <FinalCTASection onDonate={onDonate} />
      </main>
      <Footer />
      <MobileFloatingCTA onDonate={onDonate} />

      <DonationModal isOpen={open} onDismiss={() => setOpen(false)} onDonate={() => setOpen(false)} />
    </div>
  );
};

export default Index;
