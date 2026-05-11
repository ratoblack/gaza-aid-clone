import FadeIn from "./FadeIn";
import { useOpenDonate } from "./donate-context";

const cards = [
  { amount: "$25", title: "Hot Meals — 2 Days", body: "Cooked fresh and delivered the same day by our field teams." },
  { amount: "$50", title: "Food Parcel — 5 Days", body: "A parcel of staples: rice, flour, oil, lentils, canned goods. Enough for a family of five.", badge: "Most Common" },
  { amount: "$100", title: "Two Weeks of Food", body: "Everything a displaced family needs to eat for two weeks, sourced locally where possible." },
  { amount: "$250", title: "One Month of Sustenance", body: "Thirty days of security for a displaced family. The equivalent of a Sadaqah Jariyah that keeps giving." },
];

const ImpactCardsSection = () => {
  const openDonate = useOpenDonate();
  return (
    <section className="bg-sh-off-white py-20 px-5">
      <div className="mx-auto max-w-[1100px]">
        <FadeIn>
          <h2 className="text-center font-serif font-bold text-[28px] sm:text-[34px] text-sh-text leading-tight">
            Every dollar has a destination.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-2 text-center font-sans text-[15px] sm:text-[16px] text-sh-text-secondary">
            We don't deal in vague promises. Here's exactly what your money delivers.
          </p>
        </FadeIn>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2">
          {cards.map((c, i) => {
            const num = Number(c.amount.replace("$", ""));
            return (
              <FadeIn key={c.amount} delay={0.05 * i}>
                <button
                  type="button"
                  onClick={() => openDonate(num)}
                  className="block w-full text-left h-full rounded-lg border border-sh-border bg-white p-4 sm:p-7 transition-shadow hover:shadow-md hover:border-sh-green"
                >
                  <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                    <div className="font-sans font-bold text-[28px] sm:text-[40px] text-sh-green leading-none">{c.amount}</div>
                    {c.badge && (
                      <span className="font-sans text-[10px] sm:text-[11px] font-medium text-sh-green bg-sh-green-light rounded px-2 py-[3px]">
                        {c.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 font-sans sm:font-serif font-semibold sm:font-bold text-[13px] sm:text-[18px] text-sh-text leading-snug line-clamp-2">{c.title}</div>
                  <p className="mt-2 hidden sm:block font-sans text-[14px] text-sh-text-secondary leading-[1.6]">{c.body}</p>
                </button>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Islamic quote on green background */}
      <FadeIn delay={0.2}>
        <div className="mt-12 -mx-5 bg-sh-green px-6 py-10 sm:py-12 text-center">
          <p className="mx-auto max-w-[720px] font-serif italic text-[20px] sm:text-[22px] text-white leading-[1.45]">
            "The Prophet ﷺ said: 'The best of you are those who feed others.'"
          </p>
          <p className="mt-3 font-sans text-[13px]" style={{ color: "rgba(255,255,255,0.6)" }}>
            — Sunan Abu Dawood
          </p>
          <button
            type="button"
            onClick={() => openDonate(50)}
            className="mt-6 inline-flex items-center rounded bg-white px-8 py-3.5 font-sans text-[15px] font-semibold text-sh-green transition-colors hover:bg-white/90"
          >
            Feed a Family Now <span className="ml-2">→</span>
          </button>
        </div>
      </FadeIn>
    </section>
  );
};

export default ImpactCardsSection;
