import FadeIn from "./FadeIn";
import g1 from "@/assets/hr/final-cta.jpg";
import g2 from "@/assets/hr/hero-dua.jpg";
import g3 from "@/assets/hr/parcel-contents.jpg";
import g4 from "@/assets/hr/testimony.jpg";
import g5 from "@/assets/hr/reality-tap.jpg";
import g6 from "@/assets/hr/how-we-deliver.jpg";

const photos = [
  { src: g1, alt: "Family inside a tent waving while holding an open Spotlight Humanity food parcel" },
  { src: g2, alt: "Young girl smiling as a volunteer hands over a food parcel box" },
  { src: g3, alt: "Three children exploring the contents of a food parcel" },
  { src: g4, alt: "A volunteer kneels to comfort a smiling boy in the camp" },
  { src: g5, alt: "A girl drinks water directly from a tap installed by Spotlight Humanity" },
  { src: g6, alt: "Spotlight Humanity volunteers walking with displaced children through the camp" },
];

const GallerySection = () => (
  <section className="bg-sh-light-gray py-16 px-5">
    <div className="mx-auto max-w-[1100px]">
      <FadeIn>
        <h2 className="text-center font-serif font-bold text-[24px] sm:text-[28px] text-sh-text leading-tight">
          Proof of Work
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="mt-1 text-center font-sans text-[14px] sm:text-[15px] text-sh-text-muted">
          Real photos. Real families. Real deliveries.
        </p>
      </FadeIn>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-2">
        {photos.map((p, i) => (
          <FadeIn key={i} delay={0.04 * i}>
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="w-full rounded object-cover"
              style={{ aspectRatio: "1 / 1" }}
            />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <p className="mt-6 text-center font-sans italic text-[12px] text-sh-text-muted">
          All photos taken by Spotlight Humanity field teams in Gaza.
        </p>
      </FadeIn>
    </div>
  </section>
);

export default GallerySection;
