import FadeIn from "./FadeIn";
import { useOpenDonate } from "./donate-context";

const HowMoneyArrivesSection = () => {
  const openDonate = useOpenDonate();
  return (
    <section className="bg-white px-5 py-12 sm:py-16" style={{ borderTop: "1px solid hsl(var(--sh-border))" }}>
      <div className="mx-auto max-w-[760px] text-center">
        <FadeIn>
          <h2 className="font-serif italic text-[22px] text-sh-text">
            "How does the money actually get into Gaza?"
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-3 font-sans text-[15px] text-sh-text-secondary leading-[1.6]">
            Our teams are physically present in Gaza — not operating remotely.<br />
            Your donation is converted into food and delivered directly by our&nbsp;staff.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-4 font-sans font-semibold text-[15px] text-sh-green">
            We do not transfer cash into Gaza. We deliver food.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <button
            type="button"
            onClick={() => openDonate(50)}
            className="mt-6 inline-flex items-center rounded bg-sh-green px-8 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-sh-green-dark"
          >
            Feed a Family Now <span className="ml-2">→</span>
          </button>
        </FadeIn>
      </div>
    </section>
  );
};

export default HowMoneyArrivesSection;
