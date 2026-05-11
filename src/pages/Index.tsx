import { useState } from "react";
import UrgencyBar from "@/components/sh/UrgencyBar";
import SHHeader from "@/components/sh/SHHeader";
import HeroSection from "@/components/sh/HeroSection";
import VideoProofSection from "@/components/sh/VideoProofSection";
import CredibilityStrip from "@/components/sh/CredibilityStrip";
import RealitySection from "@/components/sh/RealitySection";
import ImpactCardsSection from "@/components/sh/ImpactCardsSection";
import ProjectsSection from "@/components/sh/ProjectsSection";
import GallerySection from "@/components/sh/GallerySection";
import TransparencySection from "@/components/sh/TransparencySection";
import HowMoneyArrivesSection from "@/components/sh/HowMoneyArrivesSection";
import FinalCTASection from "@/components/sh/FinalCTASection";
import SHFooter from "@/components/sh/SHFooter";

import DonationModal from "@/components/DonationModal";
import { DonateContext } from "@/components/sh/donate-context";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const openDonate = (a?: number) => {
    if (a && a > 0) setAmount(a);
    setOpen(true);
  };

  return (
    <DonateContext.Provider value={openDonate}>
      <div className="min-h-screen bg-white pt-9">
        <a href="#main" className="skip-link">Skip to main content</a>
        <UrgencyBar />
        <SHHeader />
        <main id="main">
          <HeroSection />
          <VideoProofSection />
          <CredibilityStrip />
          <RealitySection />
          <ImpactCardsSection />
          <ProjectsSection />
          <GallerySection />
          <TransparencySection />
          <HowMoneyArrivesSection />
          <FinalCTASection />
        </main>
        <SHFooter />
        
        <DonationModal
          isOpen={open}
          onDismiss={() => setOpen(false)}
          onDonate={() => setOpen(false)}
          initialAmount={amount}
        />
      </div>
    </DonateContext.Provider>
  );
};

export default Index;
