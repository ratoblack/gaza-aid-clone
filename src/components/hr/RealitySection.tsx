import { motion, useReducedMotion } from "framer-motion";
import emptyBowl from "@/assets/hr/empty-bowl.jpg";

const RealitySection = () => {
  const reduce = useReducedMotion();
  return (
    <section className="bg-warm-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 md:grid-cols-[45%_55%]">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: -30 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative aspect-[4/5] md:aspect-auto md:min-h-[640px]"
        >
          <img
            src={emptyBowl}
            alt="Hands holding an empty clay bowl"
            loading="lazy"
            width={1200}
            height={1400}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 30 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center px-6 py-16 sm:px-12 md:px-16 md:py-24"
        >
          <div className="max-w-[520px]">
            <h2 className="font-display italic text-charcoal text-[28px] leading-[1.2] sm:text-[32px] md:text-[38px]">
              A mother in Gaza wakes before dawn.
            </h2>
            <div className="mt-6 space-y-5 text-[16px] sm:text-[18px] leading-[1.7] text-charcoal/80">
              <p>Not to pray — though she does.<br/>She wakes to check if there is anything left to give her children.</p>
              <p>Most mornings, there isn&rsquo;t.</p>
            </div>
            <span className="gold-divider gold-divider-sm mt-8" aria-hidden="true" />
            <p className="mt-6 text-[16px] italic leading-relaxed text-olive">
              For two years, this has been her reality.<br/>
              And yours is the hand that can change it today.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RealitySection;
