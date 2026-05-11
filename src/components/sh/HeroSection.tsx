import { useState } from "react";
import FadeIn from "./FadeIn";
import heroImg from "@/assets/hr/how-we-deliver.jpg";

const DONATE_URL = "https://www.spotlight-humanity.org/";

const TIERS = [
  { value: "25", label: "$25", desc: "Hot meals for a family for 2 days" },
  { value: "50", label: "$50", desc: "Full food parcel — 5 days" },
  { value: "100", label: "$100", desc: "Two weeks of food for a family" },
  { value: "other", label: "Other amount", desc: "I'll choose my own" },
];

const HeroSection = () => {
  const [selected, setSelected] = useState("50");
  const [other, setOther] = useState("");

  return (
    <section aria-labelledby="hero-title" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Image */}
        <div className="relative lg:col-span-3 min-h-[260px] sm:min-h-[420px] lg:min-h-[640px]">
          <img
            src={heroImg}
            alt="Spotlight Humanity field team walking with displaced children in a Gaza camp at golden hour"
            className="absolute inset-0 h-full w-full object-cover"
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
                className="mt-3 font-serif font-bold text-sh-text text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.2]"
              >
                Families Are Starving.<br />You Can Help Today.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-4 font-sans text-[15px] sm:text-[16px] text-sh-text-secondary leading-[1.6]">
                Hot meals, food parcels, and clean water — delivered directly to displaced families in Gaza by our teams on the ground.
              </p>
            </FadeIn>

            <div className="my-6 h-px bg-sh-border" />

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

              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-sh-green px-6 py-4 font-sans text-[16px] font-semibold text-white transition-colors hover:bg-sh-green-dark"
              >
                Donate Now <span className="ml-2">→</span>
              </a>

              <p className="mt-4 text-center font-sans text-[12px] text-sh-text-muted leading-relaxed">
                🔒 Secure donation · 501(c)(3) nonprofit · EIN: 33-1754908<br />
                Zakat-eligible · Tax-deductible
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
