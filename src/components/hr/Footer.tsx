import { Instagram, Youtube, Facebook } from "lucide-react";

const Footer = () => (
  <footer className="bg-charcoal text-white px-5 py-16">
    <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 md:grid-cols-3">
      <div>
        <p className="font-display italic text-gold text-[28px]">Human Releaf</p>
        <p className="mt-3 text-[14px] text-white/50">
          &ldquo;Together we can make a huge impact.&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-5 md:justify-center">
        {[
          { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
          { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
          { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
        ].map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-white/40 transition-colors hover:text-gold"
          >
            <Icon className="h-6 w-6" strokeWidth={1.6} />
          </a>
        ))}
      </div>

      <address className="not-italic text-[13px] leading-relaxed text-white/45 md:text-right">
        1905 S Haggerty Rd Ste 6<br />
        Canton, MI 48188
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 md:justify-end">
          <a href="/privacy" className="hover:text-gold">Privacy Policy</a>
          <span className="opacity-40">|</span>
          <a href="/terms" className="hover:text-gold">Terms of Use</a>
          <span className="opacity-40">|</span>
          <a href="/refund" className="hover:text-gold">Refund Policy</a>
        </div>
      </address>
    </div>

    <div className="mx-auto mt-12 max-w-[1180px] border-t border-white/10 pt-6 text-center text-[12px] text-white/20">
      © {new Date().getFullYear()} Human Releaf. All rights reserved.
    </div>
  </footer>
);

export default Footer;
