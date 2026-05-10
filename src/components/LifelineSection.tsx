import mealImg from "@/assets/spotlight/meal-hero.jpg";
import g1 from "@/assets/spotlight/gallery1.jpg";
import g2 from "@/assets/spotlight/gallery2.jpg";
import g3 from "@/assets/spotlight/gallery3.jpg";

interface Props {
  onDonateClick: () => void;
}

const LifelineSection = ({ onDonateClick }: Props) => {
  return (
    <section className="bg-background px-5 py-16 sm:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <img
              src={mealImg}
              alt="Family receiving a hot meal"
              className="relative z-10 w-full rounded-2xl object-cover shadow-2xl sm:rounded-3xl"
            />
            <div className="absolute -right-3 -bottom-3 -z-0 hidden h-full w-full rounded-3xl bg-accent/80 sm:block" />
          </div>
          <div>
            <h2 className="text-[1.75rem] font-extrabold leading-tight text-foreground sm:text-5xl">
              Provide a Lifeline with a Meal <span aria-hidden="true">🍽️</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/80 sm:text-lg">
              Every meal you give is a lifeline, a mercy, and a dua answered. It brings relief to the hungry,
              hope to the struggling, and rewards from Allah.{" "}
              <strong>Feed a soul, ease a hardship, and earn endless blessings.</strong>
            </p>
            <button
              type="button"
              onClick={onDonateClick}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition hover:brightness-110 sm:w-auto"
            >
              Feed a Life
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-5">
          {[g1, g2, g3].map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Aid distribution in Gaza"
              loading="lazy"
              className="h-56 w-full rounded-2xl object-cover shadow-md sm:h-72"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifelineSection;
