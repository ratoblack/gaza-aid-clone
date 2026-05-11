import FadeIn from "./FadeIn";
import realityImg from "@/assets/hr/reality-water.jpg";

const DONATE_URL = "https://www.spotlight-humanity.org/";

const RealitySection = () => (
  <section className="bg-white">
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative min-h-[300px] lg:min-h-[560px]">
        <img
          src={realityImg}
          alt="A Spotlight Humanity volunteer pouring clean water into a young boy's blue jug"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          width={1400}
          height={1100}
        />
      </div>
      <div className="px-6 py-14 sm:px-12 sm:py-20 lg:p-16">
        <FadeIn>
          <p className="font-sans text-[11px] uppercase font-medium text-sh-text-muted" style={{ letterSpacing: "0.1em" }}>
            What displacement looks like
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="mt-3 font-serif text-[22px] sm:text-[26px] leading-[1.45] text-sh-text">
            A boy filling a jug because there is no running water.<br />
            A family of seven sharing one meal a day.<br />
            A mother choosing which child eats tonight.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 font-serif italic text-[18px] text-sh-green">
            This is not a statistic. This is Tuesday in Gaza.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-6 font-sans text-[16px] text-sh-text-secondary leading-[1.7]">
            For two years, Spotlight Humanity teams have been on the ground — not sending money hoping it arrives,
            but physically present, distributing food and water directly to displaced families.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center rounded border-2 border-sh-green bg-transparent px-7 py-3 font-sans text-[14px] font-semibold text-sh-green transition-colors hover:bg-sh-green hover:text-white"
          >
            See How We Operate <span className="ml-2">→</span>
          </a>
        </FadeIn>
      </div>
    </div>
  </section>
);

export default RealitySection;
