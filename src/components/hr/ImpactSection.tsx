import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

interface Props { onDonate: () => void }

const cards = [
  { amount: "$5", title: "1 Hot Meal for a Child", body: "One warm meal. One moment of relief." },
  { amount: "$20", title: "A Full Day of Food for a Family", body: "A mother can rest. Children can sleep full." },
  { amount: "$50", title: "A Food Parcel for One Week", body: "Grains, oil, and staples — the basics of survival." },
  { amount: "$150", title: "One Month of Sustenance", body: "Thirty days of dignity for a displaced family." },
];

const ImpactSection = ({ onDonate }: Props) => {
  const reduce = useReducedMotion();
  return (
    <section className="bg-charcoal text-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5">
        <Reveal className="text-center">
          <h2 className="font-display italic text-gold text-[32px] sm:text-[42px] leading-tight">
            What Your Donation Does
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="text-center">
          <p className="mt-3 text-[15px] sm:text-base text-white/60">
            Every dollar has a name. Every meal has a face.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.amount}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.1 * i, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="rounded-[4px] border border-gold/25 bg-white/5 p-7 transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
            >
              <div className="font-display text-gold text-[48px] sm:text-[56px] leading-none">
                {c.amount}
              </div>
              <div className="mt-2 text-[16px] font-medium text-white">{c.title}</div>
              <p className="mt-1.5 text-[14px] text-white/55 leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <button onClick={onDonate} type="button" className="btn-gold">
            Choose Your Amount
            <ArrowRight className="h-4 w-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
};

export default ImpactSection;
