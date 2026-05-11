import { useState } from "react";
import FadeIn from "./FadeIn";
import { useOpenDonate } from "./donate-context";

const TIERS = ["25", "50", "100", "250"];

const FinalCTASection = () => {
  const openDonate = useOpenDonate();
  const [selected, setSelected] = useState("50");
  return (
    <section className="bg-sh-green-dark px-5 py-20 sm:py-24 text-center text-white">
      <div className="mx-auto max-w-[820px]">
        <FadeIn>
          <h2 className="font-serif font-bold text-[32px] sm:text-[44px] leading-[1.2]">
            A family is waiting for food today.
          </h2>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p className="mt-3 font-serif italic text-[20px] sm:text-[24px]" style={{ color: "rgba(255,255,255,0.7)" }}>
            Not a statistic. A family.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {TIERS.map((t) => {
              const active = selected === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelected(t)}
                  className={`min-w-[78px] rounded px-5 py-2.5 font-sans font-semibold text-[15px] transition-colors ${
                    active ? "bg-white text-sh-green" : "text-white"
                  }`}
                  style={!active ? { border: "1px solid rgba(255,255,255,0.3)" } : { border: "1px solid white" }}
                >
                  ${t}
                </button>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <button
            type="button"
            onClick={() => openDonate(Number(selected))}
            className="mt-8 inline-flex items-center rounded bg-white px-12 py-4 font-sans font-bold text-[17px] sm:text-[18px] text-sh-green transition-colors hover:bg-white/90"
          >
            Feed a Family Now <span className="ml-2">→</span>
          </button>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-5 font-sans text-[12px] sm:text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
            🔒 Secure · 501(c)(3) · EIN&nbsp;33-1754908 · Zakat-eligible ·&nbsp;Tax-deductible
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default FinalCTASection;
