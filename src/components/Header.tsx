import logo from "@/assets/spotlight/logo.png";
import { ArrowRight } from "lucide-react";

interface HeaderProps {
  onDonateClick: () => void;
}

const Header = ({ onDonateClick }: HeaderProps) => {
  return (
    <header className="absolute inset-x-0 top-0 z-40" role="banner">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-5 sm:px-8">
        <a href="#main-content" aria-label="Spotlight Humanity — go to main content">
          <img src={logo} alt="Spotlight Humanity" className="h-9 sm:h-11 w-auto object-contain" />
        </a>
        <button
          type="button"
          onClick={onDonateClick}
          aria-label="Open donation form to feed a life"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:brightness-110 sm:px-7 sm:py-3 sm:text-base"
        >
          Feed a Life
        </button>
      </div>
    </header>
  );
};

export default Header;
