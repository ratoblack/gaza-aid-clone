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
    <section className="bg-secondary px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-8 md:grid-cols-2">
          {programs.map((p) => (
            <article
              key={p.title}
              className="overflow-hidden rounded-3xl bg-card shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <img src={p.img} alt={p.title} loading="lazy" className="h-72 w-full object-cover" />
              <div className="p-7">
                <h3 className="text-2xl font-bold text-foreground">{p.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/75">{p.text}</p>
                <button
                  type="button"
                  onClick={onDonateClick}
                  className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-primary hover:gap-3 transition-all"
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
