import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import resolutionImg from "@/assets/hr/final-cta.jpg";

interface Props { onDonate: () => void }

const FinalCTASection = ({ onDonate }: Props) => (
  <section className="relative overflow-hidden bg-cream py-20 sm:py-28 md:py-[120px] px-6">
    <div className="islamic-watermark opacity-[0.07]" />

    <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
      {/* Resolution photo — outcome of the donation */}
      <Reveal>
        <div className="relative aspect-[4/3] overflow-hidden md:order-2">
          <img
            src={resolutionImg}
            alt="A Gazan family inside their tent waving and smiling with an open Spotlight food parcel"
            loading="lazy"
            width={1200}
            height={900}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </Reveal>

      <div className="text-center md:order-1 md:text-left">
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
          <p className="mt-8 text-[16px] sm:text-[18px] text-charcoal/65">
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
    </div>
  </section>
);

export default FinalCTASection;
