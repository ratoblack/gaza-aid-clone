import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import quote1 from "@/assets/spotlight/quote1.jpg";
import quote2 from "@/assets/spotlight/quote2.jpg";
import quote3 from "@/assets/spotlight/meal-hero.jpg";

interface Props {
  onDonateClick: () => void;
}

const quotes = [
  {
    img: quote1,
    text: "The best of you are those who feed others and return greetings of peace.",
    source: "Sunan Abu Dawood",
  },
  {
    img: quote3,
    text: "Protect yourselves from the Hellfire, even with half a date (in charity).",
    source: "Sahih al-Bukhari",
  },
  {
    img: quote2,
    text:
      "Worship the Most Merciful, spread peace, feed people, and pray at night while others sleep, and you will enter Paradise in peace.",
    source: "Sunan Ibn Majah",
  },
];

const QuotesSection = ({ onDonateClick }: Props) => {
  const [i, setI] = useState(0);
  const q = quotes[i];
  const prev = () => setI((p) => (p - 1 + quotes.length) % quotes.length);
  const next = () => setI((p) => (p + 1) % quotes.length);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <section className="bg-secondary px-5 py-16 sm:py-28" aria-labelledby="quotes-title">
      <h2 id="quotes-title" className="sr-only">Inspirational quotes</h2>
      <div className="mx-auto max-w-[1080px]">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Quotes about charity"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="grid items-stretch gap-0 overflow-hidden rounded-2xl bg-card shadow-xl sm:rounded-3xl md:grid-cols-2"
        >
          <img src={q.img} alt="" aria-hidden="true" className="h-56 w-full object-cover sm:h-80 md:h-full md:max-h-[460px]" />
          <div className="px-6 py-8 sm:p-12">
            <div aria-hidden="true" className="text-5xl leading-none text-primary sm:text-6xl">“</div>
            <div aria-live="polite" aria-atomic="true">
              <p className="mt-2 text-lg font-medium leading-relaxed text-foreground sm:text-2xl">{q.text}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:text-sm">
                <span className="sr-only">Source: </span>— {q.source}
              </p>
              <p className="sr-only">Quote {i + 1} of {quotes.length}</p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={prev}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                aria-label="Previous quote"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                aria-label="Next quote"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onDonateClick}
                aria-label="Open donation form to feed a life"
                className="ml-auto inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:brightness-110 sm:px-6"
              >
                Feed a Life
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl bg-card shadow-xl sm:mt-14 sm:rounded-3xl">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/Sr2nbl0d9aU?rel=0&modestbranding=1"
              title="Inspirational video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;
