import Reveal from "./Reveal";

const TestimonySection = () => (
  <section className="bg-olive py-20 sm:py-28 px-6 text-white">
    <div className="relative mx-auto max-w-[720px] text-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 font-display text-gold-light/30 text-[120px] leading-none"
      >
        &ldquo;
      </span>
      <Reveal>
        <blockquote className="relative font-display italic text-white text-[24px] sm:text-[28px] md:text-[32px] leading-[1.4]">
          &ldquo;My daughter was four years old when she received her first warm meal in weeks. She cried. I cried. May Allah reward those who sent it.&rdquo;
        </blockquote>
      </Reveal>
      <Reveal delay={0.15}>
        <cite
          className="mt-5 block text-[14px] not-italic text-white/55"
          style={{ letterSpacing: "0.05em" }}
        >
          — Ahmad, father of three, displaced from Northern Gaza
        </cite>
      </Reveal>
    </div>
  </section>
);

export default TestimonySection;
