const DONATE_URL = "https://www.spotlight-humanity.org/";

const SHHeader = () => (
  <header
    role="banner"
    className="sticky top-0 z-30 w-full bg-white border-b border-sh-border"
    style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
  >
    <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3 sm:px-8">
      <div className="flex items-center gap-3">
        <a href="#main" className="font-serif font-bold text-sh-green text-[18px] sm:text-[20px] leading-none">
          Spotlight Humanity
        </a>
        <span className="hidden sm:inline-flex items-center font-sans text-[11px] font-medium text-sh-green bg-sh-green-light rounded px-2 py-[3px]">
          501(c)(3) Verified
        </span>
      </div>
      <a
        href={DONATE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center bg-sh-green text-white font-sans font-semibold text-[13px] sm:text-[14px] px-4 sm:px-6 py-2 sm:py-2.5 rounded transition-colors hover:bg-sh-green-dark"
      >
        Donate Now
      </a>
    </div>
  </header>
);

export default SHHeader;
