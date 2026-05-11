import Reveal from "./Reveal";
import hotMeals from "@/assets/hr/hot-meals.jpg";
import foodParcels from "@/assets/hr/food-parcels.jpg";

const ProjectsSection = () => (
  <section className="bg-warm-white py-20 sm:py-28 px-5">
    <div className="mx-auto max-w-[1180px]">
      <Reveal className="text-center">
        <h2 className="font-display italic text-charcoal text-[32px] sm:text-[42px]">How We Deliver</h2>
      </Reveal>
      <Reveal delay={0.15} className="text-center">
        <p className="mt-3 text-[15px] sm:text-base text-charcoal/55">
          Six years. Real families. Real meals.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
        {[
          {
            img: hotMeals,
            alt: "Volunteer serving hot meals from a large pot",
            title: "🔥 Hot Meals Program",
            body: "Every day, our kitchen teams prepare thousands of hot meals for families who have nothing. Not canned food. Not ration packs. A real, warm meal — cooked with care.",
          },
          {
            img: foodParcels,
            alt: "Food parcels being distributed to families",
            title: "📦 Food Parcels",
            body: "For families who need more than a single meal, our food parcels provide weeks of essential staples — flour, oil, rice, lentils — the building blocks of a life that continues.",
          },
        ].map((b, i) => (
          <Reveal key={b.title} delay={i * 0.15}>
            <article>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={b.img}
                  alt={b.alt}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-6 font-sans font-semibold text-[20px] text-charcoal">{b.title}</h3>
              <p className="mt-3 text-[16px] leading-[1.7] text-charcoal/75">{b.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
