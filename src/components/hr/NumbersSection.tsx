import Reveal from "./Reveal";

const stats = [
  { value: "300+", label: "Projects Completed" },
  { value: "100,000+", label: "Donors Worldwide" },
  { value: "6 Years", label: "of Service Uninterrupted" },
];

const NumbersSection = () => (
  <section className="bg-charcoal text-white py-20 sm:py-28 px-5">
    <div className="mx-auto max-w-[1180px] text-center">
      <Reveal>
        <h2 className="font-display italic text-gold text-[32px] sm:text-[42px]">Six Years of Action</h2>
      </Reveal>
      <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.15}>
            <div>
              <div className="font-display text-gold text-[44px] sm:text-[52px] leading-none">{s.value}</div>
              <div className="mt-3 text-[13px] sm:text-[14px] text-white/55" style={{ letterSpacing: "0.05em" }}>
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default NumbersSection;
