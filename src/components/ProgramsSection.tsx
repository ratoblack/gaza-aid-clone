import hotMeals from "@/assets/spotlight/hotmeals.jpg";
import parcels from "@/assets/spotlight/parcels.jpg";
import { ArrowRight } from "lucide-react";

interface Props {
  onDonateClick: () => void;
}

const programs = [
  {
    img: hotMeals,
    title: "Hot Meals",
    text:
      "Our Feed a Life Hot Meals project tirelessly prepares thousands of meals for those in need, providing not just sustenance but a lifeline of support.",
  },
  {
    img: parcels,
    title: "Food Parcels",
    text:
      "Countless families struggle to secure basic necessities, with displaced families, orphans, and parents particularly vulnerable.",
  },
];

const ProgramsSection = ({ onDonateClick }: Props) => {
  return (
    <section className="bg-secondary px-5 py-16 sm:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {programs.map((p) => (
            <article
              key={p.title}
              className="overflow-hidden rounded-2xl bg-card shadow-xl transition hover:-translate-y-1 hover:shadow-2xl sm:rounded-3xl"
            >
              <img loading="lazy" decoding="async" src={p.img} alt={p.title} className="h-56 w-full object-cover sm:h-72" />
              <div className="p-6 sm:p-7">
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">{p.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/75">{p.text}</p>
                <button
                  type="button"
                  onClick={onDonateClick}
                  className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-primary transition-all hover:gap-3"
                >
                  Feed a Life <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
