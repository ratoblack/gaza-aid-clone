import { useEffect, useState } from "react";

interface Props { onDonate: () => void }

const MobileFloatingCTA = ({ onDonate }: Props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={onDonate}
      aria-label="Donate now"
      className={`fixed bottom-6 right-5 z-[999] md:hidden btn-gold transition-all duration-300 ${
        show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ boxShadow: "0 14px 32px hsla(0, 0%, 11%, 0.35)" }}
    >
      Donate Now
    </button>
  );
};

export default MobileFloatingCTA;
