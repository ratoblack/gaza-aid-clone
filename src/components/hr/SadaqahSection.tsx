import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Moon } from "lucide-react";

interface Props { onDonate: () => void }

const SadaqahSection = ({ onDonate }: Props) => {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-28 md:py-[120px]">
      <div className="islamic-watermark opacity-[0.05]" />
      <div className="relative mx-auto max-w-[680px] px-6 text-center">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Moon className="mx-auto h-8 w-8 text-gold" strokeWidth={1.5} aria-hidden="true" />

          <h2 className="mt-6 font-display italic text-charcoal text-[34px] sm:text-[42px] md:text-[48px] leading-[1.15]">
            This is more than charity.
          </h2>

          <div className="mt-7 space-y-5 text-[16px] sm:text-[18px] leading-[1.8] text-charcoal/[0.78]">
            <p>When you feed a family in Gaza, your reward doesn&rsquo;t end when the meal is finished.</p>
            <p>
              <span className="font-medium text-charcoal">Sadaqah Jariyah</span> — continuous charity — flows back to you as long as its benefit remains.
            </p>
            <p>This is your opportunity. Not theirs.</p>
          </div>

          <span className="gold-divider mx-auto mt-10" aria-hidden="true" />

          <p className="mt-8 font-display italic text-olive text-[24px] sm:text-[28px]">
            The door is open now.
          </p>

          <div className="mt-8">
            <button type="button" onClick={onDonate} className="btn-gold">
              Give Your Sadaqah Now
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SadaqahSection;
