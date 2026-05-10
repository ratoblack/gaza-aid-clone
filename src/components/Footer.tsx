import { Instagram, Youtube, Facebook, ArrowRight } from "lucide-react";
import logo from "@/assets/spotlight/logo.png";

interface Props {
  onDonateClick: () => void;
}

const Footer = ({ onDonateClick }: Props) => {
  return (
    <footer className="bg-primary px-5 py-16 text-primary-foreground">
      <div className="mx-auto max-w-[680px]">
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="Human Releaf" className="h-10 w-auto brightness-0 invert" />
          <p className="mt-8 text-2xl font-bold sm:text-3xl">
            Together we can make a huge impact.
          </p>

          <div className="mt-8 flex items-center justify-center gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition hover:scale-110"
            >
              <Instagram className="h-7 w-7" strokeWidth={2.2} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transition hover:scale-110"
            >
              <Youtube className="h-7 w-7" strokeWidth={2.2} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition hover:scale-110"
            >
              <Facebook className="h-7 w-7" strokeWidth={2.2} />
            </a>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-primary-foreground/20" />

        <div className="flex flex-col items-center text-center">
          <button
            type="button"
            onClick={onDonateClick}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-lg transition hover:brightness-110"
          >
            Donate <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <p className="mt-8 max-w-[460px] text-base leading-relaxed text-primary-foreground/90">
            Human Releaf is a 501(c)(3) nonprofit. Donations are tax-deductible
            <br />
            EIN: 33-1754908
          </p>

          <address className="mt-6 not-italic text-base leading-relaxed text-primary-foreground/90">
            1905 S Haggerty Rd Ste 6
            <br />
            Canton, MI 48188
          </address>

          <p className="mt-8 text-base italic text-primary-foreground/95">
            Powered by donors like you <span aria-hidden="true">❤️</span>
          </p>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-6 text-center text-xs text-primary-foreground/70">
          <nav className="mb-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label="Legal">
            <a href="/privacy" className="hover:text-primary-foreground">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary-foreground">Terms of Use</a>
            <a href="/refund" className="hover:text-primary-foreground">Refund Policy</a>
          </nav>
          © {new Date().getFullYear()} Human Releaf. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
