import logo from "@/assets/spotlight/logo.png";

interface Props {
  onDonateClick: () => void;
}

const Footer = ({ onDonateClick }: Props) => {
  return (
    <footer className="bg-foreground px-5 py-16 text-background">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="Spotlight Humanity" className="h-12 w-auto brightness-0 invert" />
          <h3 className="mt-8 max-w-[640px] text-2xl font-extrabold sm:text-4xl">
            Provide a Lifeline with a Meal <span aria-hidden="true">🍽️</span>
          </h3>
          <p className="mt-5 max-w-[560px] text-base leading-relaxed text-background/75">
            Every meal you give is a moment of hope for those struggling to survive.
          </p>
          <button
            type="button"
            onClick={onDonateClick}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition hover:brightness-110"
          >
            Feed a Life
          </button>
        </div>
        <div className="mt-14 border-t border-background/15 pt-6 text-center text-xs text-background/60">
          © {new Date().getFullYear()} Spotlight Humanity. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
