import Reveal from "./Reveal";
import testimonyImg from "@/assets/hr/testimony.jpg";

const TestimonySection = () => (
  <section className="relative overflow-hidden text-white">
    {/* Full-bleed emotional photo */}
    <img
      src={testimonyImg}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: "center 30%" }}
    />
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, hsla(84,13%,18%,0.78) 0%, hsla(84,13%,22%,0.85) 60%, hsla(84,13%,18%,0.92) 100%)",
      }}
    />

    <div className="relative mx-auto max-w-[760px] px-6 py-24 sm:py-32 text-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 font-display text-gold-light/30 text-[120px] leading-none"
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
          className="mt-5 block text-[14px] not-italic text-white/65"
          style={{ letterSpacing: "0.05em" }}
        >
          — Ahmad, father of three, displaced from Northern Gaza
        </cite>
      </Reveal>
    </div>
  </section>
);

export default TestimonySection;
