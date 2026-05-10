import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/spotlight/hero.jpg";

interface HeroProps {
  onDonateClick: () => void;
}

const HeroSection = ({ onDonateClick }: HeroProps) => {
  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Volunteer providing clean water to a child in Gaza"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 flex min-h-[100vh] items-center justify-center px-5 pt-28 pb-20">
        <div className="max-w-[820px] text-center text-white">
          <h1 className="text-[2.4rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Saving Lives Through{" "}
            <span className="text-accent">Charity</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[560px] text-base leading-relaxed text-white/90 sm:text-lg">
            Join us in supporting families in Gaza and help bring hope and sustenance to those in need.
          </p>
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={onDonateClick}
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-2xl transition hover:brightness-110 sm:text-lg"
            >
              Feed a Life
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
