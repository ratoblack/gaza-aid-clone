import Reveal from "./Reveal";
import banner from "@/assets/hr/how-we-deliver.jpg";
import hotMeals from "@/assets/hr/hot-meals.jpg";
import foodParcels from "@/assets/hr/food-parcels.jpg";
import parcelContents from "@/assets/hr/parcel-contents.jpg";

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

      {/* Hero banner — dignity in the exchange */}
      <Reveal delay={0.2} className="mt-12">
        <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[21/9]">
          <img
            src={banner}
            alt="Spotlight volunteer handing a food parcel box to a smiling girl at the entrance of a tent"
            loading="lazy"
            width={1600}
            height={900}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
        <Reveal>
          <article>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={hotMeals}
                alt="Children clapping and smiling around a Spotlight volunteer with a food parcel box"
                loading="lazy"
                width={1200}
                height={900}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-6 font-sans font-semibold text-[20px] text-charcoal">🔥 Hot Meals Program</h3>
            <p className="mt-3 text-[16px] leading-[1.7] text-charcoal/75">
              Every day, our kitchen teams prepare thousands of hot meals for families who have nothing.
              Not canned food. Not ration packs. A real, warm meal — cooked with care.
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.15}>
          <article>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={foodParcels}
                alt="Four Spotlight volunteers walking through a tent camp carrying food parcels"
                loading="lazy"
                width={1600}
                height={900}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "center top" }}
              />
            </div>
            <h3 className="mt-6 font-sans font-semibold text-[20px] text-charcoal">📦 Food Parcels</h3>
            <p className="mt-3 text-[16px] leading-[1.7] text-charcoal/75">
              For families who need more than a single meal, our food parcels provide weeks of essential staples —
              flour, oil, rice, lentils — the building blocks of a life that continues.
            </p>

            {/* Detail: what's inside the parcel */}
            <div className="mt-5 relative aspect-[4/3] overflow-hidden">
              <img
                src={parcelContents}
                alt="Three children sitting on a mat exploring the contents of a Spotlight food parcel: rice, oil, cans"
                loading="lazy"
                width={1200}
                height={900}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 text-[14px] italic text-charcoal/55">
              What&rsquo;s inside one parcel — staples that feed a family for a week.
            </p>
          </article>
        </Reveal>
      </div>
    </div>
  </section>
);

export default ProjectsSection;
