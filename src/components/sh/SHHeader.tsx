import { useOpenDonate } from "./donate-context";
import logoGreen from "@/assets/spotlight/logo-green.png";

const SHHeader = () => {
  const openDonate = useOpenDonate();
  return (
    <header
      role="banner"
      className="sticky top-9 z-30 w-full bg-white border-b border-sh-border"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3 sm:px-8">
        <div className="flex items-center gap-3">
          <a href="#main" aria-label="Spotlight Humanity — home" className="flex items-center">
            <img
              src={logoGreen}
              alt="Spotlight Humanity"
              className="h-9 sm:h-12 w-auto"
              width={500}
              height={201}
            />
          </a>
          <span className="hidden sm:inline-flex items-center font-sans text-[11px] font-medium text-sh-green bg-sh-green-light rounded px-2 py-[3px]">
            501(c)(3) Verified
          </span>
        </div>
        <button
          type="button"
          onClick={() => openDonate()}
          className="inline-flex items-center bg-sh-green text-white font-sans font-semibold text-[13px] sm:text-[14px] px-4 sm:px-6 py-2 sm:py-2.5 rounded transition-colors hover:bg-sh-green-dark"
        >
          Donate Now
        </button>
      </div>
    </header>
  );
};

export default SHHeader;
