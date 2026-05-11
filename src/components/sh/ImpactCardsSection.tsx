import FadeIn from "./FadeIn";

const DONATE_URL = "https://www.spotlight-humanity.org/";

const cards = [
  { amount: "$25", title: "Hot Meals for a Family — 2 Days", body: "Cooked fresh and delivered the same day by our field teams." },
  { amount: "$50", title: "Full Food Parcel — 5 Days", body: "A parcel of staples: rice, flour, oil, lentils, canned goods. Enough for a family of five.", badge: "Most Common" },
  { amount: "$100", title: "Two Weeks of Food Security", body: "Everything a displaced family needs to eat for two weeks, sourced locally where possible." },
  { amount: "$250", title: "One Month of Sustenance", body: "Thirty days of security for a displaced family. The equivalent of a Sadaqah Jariyah that keeps giving." },
];

const ImpactCardsSection = () => (
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

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        {cards.map((c, i) => (
          <FadeIn key={c.amount} delay={0.05 * i}>
            <div className="h-full rounded-lg border border-sh-border bg-white p-7 transition-shadow hover:shadow-md">
              <div className="flex items-baseline gap-3">
                <div className="font-sans font-bold text-[40px] text-sh-green leading-none">{c.amount}</div>
                {c.badge && (
                  <span className="font-sans text-[11px] font-medium text-sh-green bg-sh-green-light rounded px-2 py-[3px]">
                    {c.badge}
                  </span>
                )}
              </div>
              <div className="mt-2 font-serif font-bold text-[18px] text-sh-text">{c.title}</div>
              <p className="mt-2 font-sans text-[14px] text-sh-text-secondary leading-[1.6]">{c.body}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <p className="mx-auto mt-10 max-w-[520px] text-center font-serif italic text-[18px] sm:text-[20px] text-sh-green">
          "The Prophet ﷺ said: 'The best of you are those who feed others.'"
          <br />
          <span className="font-sans not-italic text-[13px] text-sh-text-muted">— Sunan Abu Dawood</span>
        </p>
      </FadeIn>

      <FadeIn delay={0.25}>
        <div className="mt-10 text-center">
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded bg-sh-green px-10 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-sh-green-dark"
          >
            Feed a Family Now <span className="ml-2">→</span>
          </a>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default ImpactCardsSection;
