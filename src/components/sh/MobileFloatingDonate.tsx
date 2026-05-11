import { useEffect, useState } from "react";
import { useOpenDonate } from "./donate-context";

const MobileFloatingDonate = () => {
  const openDonate = useOpenDonate();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => openDonate()}
      aria-label="Donate now"
      className={`fixed bottom-5 right-5 z-[999] md:hidden inline-flex items-center rounded bg-sh-green px-5 py-3 font-sans font-semibold text-[14px] text-white transition-all duration-300 ${
        show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
      style={{ boxShadow: "0 10px 24px rgba(0,0,0,0.25)" }}
    >
      Donate Now
    </button>
  );
};

export default MobileFloatingDonate;
