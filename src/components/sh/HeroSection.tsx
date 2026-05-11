import { useState } from "react";
import FadeIn from "./FadeIn";
import heroImg from "@/assets/hr/reality-water.jpg";
import { useOpenDonate } from "./donate-context";

const TIERS = [
  { value: "25", label: "$25", desc: "Hot meals for a family for 2 days" },
  { value: "50", label: "$50", desc: "Full food parcel — 5 days" },
  { value: "100", label: "$100", desc: "Two weeks of food for a family" },
  { value: "other", label: "Other amount", desc: "I'll choose my own" },
];

const HeroSection = () => {
  const openDonate = useOpenDonate();
  const [selected, setSelected] = useState("50");
  const [other, setOther] = useState("");

  return (
    <section aria-labelledby="hero-title" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Image */}
        <div className="relative lg:col-span-3 h-[260px] sm:h-[420px] lg:h-auto lg:min-h-[640px]">
          <img
            src={heroImg}
            alt="Spotlight Humanity volunteer pouring clean water into a young boy's empty blue jug in Gaza"
            className="absolute inset-0 h-full w-full object-cover object-center"
            width={1600}
            height={1200}
          />
        </div>

        {/* CTA panel */}
        <div className="lg:col-span-2 px-6 py-10 sm:px-10 sm:py-12 lg:p-12 flex items-center">
          <div className="w-full">
            <FadeIn>
              <p className="font-sans text-[11px] font-medium uppercase text-sh-text-muted" style={{ letterSpacing: "0.12em" }}>
                Gaza Emergency Appeal
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1
                id="hero-title"
                className="mt-3 font-serif font-bold text-sh-text text-[28px] sm:text-[32px] lg:text-[34px] leading-[1.2]"
              >
                They haven't eaten today.<br />You can change that right now.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-3 font-sans text-[15px] text-sh-text-secondary leading-[1.6]">
                Every dollar you give is converted into food and delivered by our team — already on the&nbsp;ground.
              </p>
            </FadeIn>

            <div className="my-5 h-px bg-sh-border" />

            <FadeIn delay={0.12}>
              <p className="mb-4 text-center font-sans italic text-[13px] text-sh-text-muted">
                A single meal costs less than your morning coffee.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-2.5">
                {TIERS.map((t) => {
                  const active = selected === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setSelected(t.value)}
                      className={`text-left rounded-md border-2 p-3.5 transition-colors ${
                        active
                          ? "border-sh-green bg-sh-green-light"
                          : "border-sh-border hover:border-sh-green"
                      }`}
                    >
                      <div className={`font-sans font-bold text-[20px] sm:text-[22px] ${active ? "text-sh-green" : "text-sh-text"}`}>
                        {t.label}
                      </div>
                      <div className="font-sans text-[12px] text-sh-text-muted leading-snug mt-0.5">
                        {t.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selected === "other" && (
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  placeholder="Enter amount (USD)"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                  className="mt-3 w-full rounded-md border border-sh-border px-4 py-3 font-sans text-[15px] text-sh-text placeholder:text-sh-text-muted focus:outline-none focus:border-sh-green"
                />
              )}

              {(() => {
                const amount = selected === "other" ? other.trim() : selected;
                const num = Number(amount);
                const disabled = selected === "other" && !(num > 0);
                return (
                  <button
                    type="button"
                    onClick={() => !disabled && openDonate(num > 0 ? num : undefined)}
                    aria-disabled={disabled}
                    disabled={disabled}
                    className={`mt-4 inline-flex w-full items-center justify-center rounded-md px-6 py-4 font-sans text-[16px] font-semibold text-white transition-colors ${
                      disabled ? "bg-sh-green/50 cursor-not-allowed" : "bg-sh-green hover:bg-sh-green-dark"
                    }`}
                  >
                    Feed a Family Today <span className="ml-2">→</span>
                  </button>
                );
              })()}

              <p className="mt-3 mb-2 text-center font-sans text-[12px] font-semibold text-sh-green">
                ⏱ Next food distribution: tomorrow morning
              </p>

              <p className="mt-2 text-center font-sans text-[12px] text-sh-text-muted leading-relaxed">
                🔒 Secure donation · 501(c)(3) nonprofit · EIN:&nbsp;33-1754908<br />
                Zakat-eligible ·&nbsp;Tax-deductible
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
