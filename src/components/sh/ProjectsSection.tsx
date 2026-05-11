import FadeIn from "./FadeIn";
import hotMealsImg from "@/assets/hr/hot-meals.jpg";
import parcelsImg from "@/assets/hr/food-parcels.jpg";

const blocks = [
  {
    img: hotMealsImg,
    alt: "Children clapping as a Spotlight Humanity volunteer hands out a hot meal at golden hour",
    tag: "HOT MEALS PROGRAM",
    body:
      "Thousands of freshly cooked meals, prepared and distributed daily to families in displacement camps. Not ration packs. Real food, made with care.",
  },
  {
    img: parcelsImg,
    alt: "Four Spotlight Humanity volunteers carrying food parcels through a Gaza camp",
    tag: "FOOD PARCEL DISTRIBUTION",
    body:
      "Essential food boxes delivered directly to families who have nothing. Rice, oil, flour, lentils — the building blocks of survival.",
  },
];

const ProjectsSection = () => (
  <section className="bg-white py-20 px-5">
    <div className="mx-auto max-w-[1100px]">
      <FadeIn>
        <h2 className="text-center font-serif font-bold text-[28px] sm:text-[34px] text-sh-text leading-tight">
          On the Ground. Every Day.
        </h2>
      </FadeIn>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {blocks.map((b, i) => (
          <FadeIn key={b.tag} delay={0.1 * i}>
            <article className="overflow-hidden rounded-lg border border-sh-border bg-white">
              <img
                src={b.img}
                alt={b.alt}
                loading="lazy"
                className="w-full object-cover"
                style={{ aspectRatio: "4 / 3" }}
                width={1200}
                height={900}
              />
              <div className="p-6">
                <p className="font-sans text-[11px] font-medium uppercase text-sh-green" style={{ letterSpacing: "0.1em" }}>
                  {b.tag}
                </p>
                <p className="mt-2 font-sans text-[15px] text-sh-text-secondary leading-[1.6]">{b.body}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
