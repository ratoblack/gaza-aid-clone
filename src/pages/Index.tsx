import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import ContentSection from "@/components/ContentSection";
import AnswerTheCallSection from "@/components/AnswerTheCallSection";
import DesperatePleaSection from "@/components/DesperatePleaSection";
import Footer from "@/components/Footer";
import DonationModal from "@/components/DonationModal";
import ReminderModal from "@/components/ReminderModal";
import RecentDonationToast from "@/components/RecentDonationToast";
import FloatingDonatePrompt from "@/components/FloatingDonatePrompt";

const Index = () => {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [showFloatingPrompt, setShowFloatingPrompt] = useState(true);

  const openDonate = () => {
    setIsReminderOpen(false);
    setIsDonateOpen(true);
  };

  const dismissDonate = () => {
    setIsDonateOpen(false);
    setIsReminderOpen(true);
  };

  const closeReminder = () => setIsReminderOpen(false);

  const reopenDonateFromReminder = () => {
    setIsReminderOpen(false);
    setIsDonateOpen(true);
  };

  const handleDonate = (amount: number, isMonthly: boolean) => {
    alert(`Thank you for your $${amount}${isMonthly ? " monthly" : ""} donation!`);
    setIsDonateOpen(false);
    setIsReminderOpen(false);
    setShowFloatingPrompt(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onDonateClick={openDonate} />
      <main className="pt-[86px]">
        <HeroSection />
        <VideoSection onDonateClick={openDonate} />
        <ContentSection onDonateClick={openDonate} />
        <AnswerTheCallSection onDonateClick={openDonate} />
        <DesperatePleaSection onDonateClick={openDonate} />
      </main>
      <Footer />

      <RecentDonationToast />
      <FloatingDonatePrompt
        visible={showFloatingPrompt}
        onDonateClick={openDonate}
        onDismiss={() => setShowFloatingPrompt(false)}
      />
      <DonationModal isOpen={isDonateOpen} onDismiss={dismissDonate} onDonate={handleDonate} />
      <ReminderModal
        isOpen={isReminderOpen}
        onBack={reopenDonateFromReminder}
        onClose={closeReminder}
      />
    </div>
  );
};

export default Index;
