import FadeIn from "./FadeIn";
import g1 from "@/assets/spotlight/gallery1.jpg";
import g2 from "@/assets/spotlight/gallery2.jpg";
import g3 from "@/assets/spotlight/gallery3.jpg";
import g4 from "@/assets/spotlight/parcels.jpg";
import g5 from "@/assets/spotlight/hotmeals.jpg";
import g6 from "@/assets/spotlight/feed-families.jpg";

const photos = [
  { src: g1, alt: "Family inside a tent waving while holding an open Spotlight Humanity food parcel", pos: "center 35%" },
  { src: g2, alt: "Young girl smiling as a volunteer hands over a food parcel box", pos: "center 30%" },
  { src: g3, alt: "Three children exploring the contents of a food parcel", pos: "center 40%" },
  { src: g4, alt: "A volunteer kneels to comfort a smiling boy in the camp", pos: "center 30%" },
  { src: g5, alt: "A girl drinks water directly from a tap installed by Spotlight Humanity", pos: "center 35%" },
  { src: g6, alt: "Spotlight Humanity volunteers walking with displaced children through the camp", pos: "center 40%" },
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
              style={{ aspectRatio: "1 / 1", objectPosition: p.pos }}
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
