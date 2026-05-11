import FadeIn from "./FadeIn";
import { useOpenDonate } from "./donate-context";

const HowMoneyArrivesSection = () => {
  const openDonate = useOpenDonate();
  return (
    <section className="bg-white px-5 py-12 sm:py-16" style={{ borderTop: "1px solid hsl(var(--sh-border))" }}>
      <div className="mx-auto max-w-[760px] text-center">
        <FadeIn>
          <h2 className="font-serif italic text-[22px] sm:text-[24px] text-sh-text">
            "How does the money actually get into Gaza?"
          </h2>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p className="mt-2 font-sans text-[15px] sm:text-[16px] text-sh-text-secondary">
            We hear this question. It's the right question to ask.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-6 max-w-[680px] font-sans text-[15px] text-sh-text-secondary leading-[1.75]">
            Gaza is under blockade. But aid still moves — through established humanitarian corridors, verified local partners on the ground, and coordination with international relief networks. Our field teams are physically present in Gaza, not operating remotely. When you donate, your money is converted into food — purchased locally where possible — and distributed directly by our staff.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-4 font-sans font-semibold text-[15px] text-sh-green">
            We do not transfer cash into Gaza.<br />We deliver food.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <button
            type="button"
            onClick={() => openDonate()}
            className="mt-5 inline-block font-sans text-[14px] text-sh-green underline underline-offset-2 hover:text-sh-green-dark"
          >
            Donate to support our distribution →
          </button>
        </FadeIn>
      </div>
    </section>
  );
};

export default HowMoneyArrivesSection;
