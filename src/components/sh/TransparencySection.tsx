import FadeIn from "./FadeIn";
import { Landmark, ScrollText, MapPin } from "lucide-react";

const blocks = [
  {
    Icon: Landmark,
    title: "Registered Nonprofit",
    body: "501(c)(3) organization. EIN: 33-1754908. All donations are tax-deductible.",
  },
  {
    Icon: ScrollText,
    title: "Zakat & Sadaqah Eligible",
    body: "Our operations are verified as Shari'ah-compliant. Your Zakat reaches those who qualify.",
  },
  {
    Icon: MapPin,
    title: "Physically Present",
    body: "Our teams are not remote administrators. They are on the ground in Gaza, distributing aid directly.",
  },
];

const TransparencySection = () => (
  <section
    className="bg-sh-green-light px-5 py-16"
    style={{
      borderTop: "1px solid rgba(27,107,74,0.15)",
      borderBottom: "1px solid rgba(27,107,74,0.15)",
    }}
  >
    <div className="mx-auto max-w-[1100px]">
      <FadeIn>
        <h2 className="text-center font-serif font-bold text-[24px] sm:text-[28px] text-sh-green leading-tight">
          We believe you deserve to know where your money goes.
        </h2>
      </FadeIn>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
        {blocks.map(({ Icon, title, body }, i) => (
          <FadeIn key={title} delay={0.05 * i}>
            <div className="text-center md:text-left md:px-4 md:border-l md:first:border-l-0" style={{ borderColor: "rgba(27,107,74,0.18)" }}>
              <Icon className="mx-auto md:mx-0 h-7 w-7 text-sh-green" strokeWidth={1.8} aria-hidden="true" />
              <h3 className="mt-3 font-sans font-bold text-[16px] text-sh-text">{title}</h3>
              <p className="mt-2 font-sans text-[14px] text-sh-text-secondary leading-[1.6]">{body}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default TransparencySection;
