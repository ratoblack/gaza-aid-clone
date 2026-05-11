import { Instagram, Youtube, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const SHFooter = () => (
  <footer className="bg-sh-green-light text-sh-text px-5 py-14">
    <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 md:grid-cols-3">
      <div>
        <p className="font-serif italic font-bold text-[22px] text-sh-text">Spotlight Humanity</p>
        <p className="mt-2 font-sans text-[14px] text-sh-text-secondary">
          "Together we can make a huge impact."
        </p>
        <address className="not-italic mt-4 font-sans text-[13px] text-sh-text-secondary">
          1905 S Haggerty Rd Ste 6<br />
          Canton, MI 48188
        </address>
      </div>

      <div className="flex md:items-center md:justify-center gap-4">
        {[
          { Icon: Instagram, href: "https://www.instagram.com/spotlighthumanity", label: "Instagram" },
          { Icon: Youtube, href: "https://www.youtube.com/@spotlighthumanity", label: "YouTube" },
          { Icon: Facebook, href: "https://www.facebook.com/spotlighthumanity", label: "Facebook" },
        ].map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-sh-text-secondary transition-colors hover:text-sh-green-dark"
          >
            <Icon className="h-6 w-6" strokeWidth={1.6} />
          </a>
        ))}
      </div>

      <div className="font-sans text-[13px] text-sh-text-secondary md:text-right">
        Spotlight Humanity is a 501(c)(3) nonprofit.<br />
        EIN: 33-1754908<br />
        Donations are tax-deductible.
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 md:justify-end text-sh-text-secondary">
          <Link to="/privacy" className="hover:text-sh-green-dark">Privacy Policy</Link>
          <span>·</span>
          <Link to="/terms" className="hover:text-sh-green-dark">Terms of Use</Link>
          <span>·</span>
          <Link to="/refund" className="hover:text-sh-green-dark">Refund Policy</Link>
        </div>
      </div>
    </div>

    <div className="mx-auto mt-10 max-w-[1100px] border-t border-sh-green/20 pt-6 text-center font-sans text-[12px] text-sh-text-muted">
      © {new Date().getFullYear()} Spotlight Humanity. All rights reserved.
    </div>
  </footer>
);

export default SHFooter;
