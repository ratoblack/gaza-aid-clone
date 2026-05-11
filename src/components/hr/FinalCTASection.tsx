import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

interface Props { onDonate: () => void }

const FinalCTASection = ({ onDonate }: Props) => (
  <section className="relative overflow-hidden bg-cream py-20 sm:py-28 md:py-[120px] px-6">
    <div className="islamic-watermark opacity-[0.07]" />
    <div className="relative mx-auto max-w-[760px] text-center">
      <Reveal>
        <h2 className="font-display italic text-charcoal text-[38px] sm:text-[48px] md:text-[56px] leading-[1.1]">
          A family is waiting today.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-3 font-display italic text-olive text-[24px] sm:text-[28px] md:text-[32px]">
          Not tomorrow. Not next week.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-10 text-[16px] sm:text-[18px] text-charcoal/65">
          Don&rsquo;t let this moment pass.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="mt-7">
          <button type="button" onClick={onDonate} className="btn-gold btn-gold-lg">
            Feed a Family Now
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </Reveal>
      <Reveal delay={0.4}>
        <p className="mt-6 text-[13px] leading-relaxed text-charcoal/40">
          Human Releaf is a registered 501(c)(3) nonprofit — EIN 33-1754908.<br />
          Donations are Zakat-eligible and tax-deductible.
        </p>
      </Reveal>
    </div>
  </section>
);

export default FinalCTASection;
