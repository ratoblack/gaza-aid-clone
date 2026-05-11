import { useEffect, useState } from "react";

interface Props { onDonate: () => void }

const Header = ({ onDonate }: Props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{
        background: "hsla(0, 0%, 11%, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3 sm:px-8">
        <a href="#main-content" className="font-display italic text-gold text-[22px]">
          Human Releaf
        </a>
        <button type="button" onClick={onDonate} className="btn-gold btn-gold-sm">
          Donate Now
        </button>
      </div>
    </header>
  );
};

export default Header;
