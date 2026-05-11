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
import MobileFloatingDonate from "@/components/sh/MobileFloatingDonate";

const Index = () => (
  <div className="min-h-screen bg-white">
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
    <MobileFloatingDonate />
  </div>
);

export default Index;
