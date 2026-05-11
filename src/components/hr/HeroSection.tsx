import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hr/hero-dua.jpg";

interface Props { onDonate: () => void }

const HeroSection = ({ onDonate }: Props) => {
  const reduce = useReducedMotion();
  const stagger = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: 0.15 * i, ease: "easeOut" as const },
  });

  return (
    <section
      aria-labelledby="hero-title"
      className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal"
    >
      <img
        src={heroImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        width={1600}
        height={1024}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsla(0,0%,11%,0.72) 0%, hsla(0,0%,11%,0.55) 60%, hsla(0,0%,11%,0.45) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pt-28 pb-24 text-center text-white">
        <motion.span {...stagger(0)} className="block h-px w-[60px] bg-gold" aria-hidden="true" />

        <motion.p
          {...stagger(1)}
          className="mt-6 font-display italic text-[14px] uppercase text-gold-light"
          style={{ letterSpacing: "0.15em" }}
        >
          The Prophet ﷺ said:
        </motion.p>

        <motion.h1
          {...stagger(2)}
          id="hero-title"
          className="mt-5 max-w-[680px] font-display italic font-medium leading-[1.15] text-[36px] sm:text-[44px] md:text-[52px]"
        >
          “The best of you are those who feed others.”
        </motion.h1>

        <motion.p {...stagger(3)} className="mt-3 text-[13px] text-white/50">
          — Sunan Abu Dawood
        </motion.p>

        <motion.p
          {...stagger(4)}
          className="mt-12 max-w-[520px] text-base sm:text-lg md:text-xl text-white/85 leading-relaxed"
        >
          Right now, families in Gaza haven&rsquo;t eaten today.
        </motion.p>

        <motion.div {...stagger(5)} className="mt-9">
          <button type="button" onClick={onDonate} className="btn-gold">
            Feed a Family Now
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-gold scroll-arrow" aria-hidden="true">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
};

export default HeroSection;
