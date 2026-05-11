import { DonateContext } from "@/components/sh/donate-context";
import SHHeader from "@/components/sh/SHHeader";

interface HeaderProps {
  onDonateClick: () => void;
}

/**
 * Legacy Header wrapper — delegates to SHHeader for visual consistency.
 * Provides DonateContext on the fly so SHHeader's CTAs trigger the page-level modal.
 */
const Header = ({ onDonateClick }: HeaderProps) => {
  return (
    <DonateContext.Provider value={() => onDonateClick()}>
      <SHHeader />
    </DonateContext.Provider>
  );
};

export default Header;
