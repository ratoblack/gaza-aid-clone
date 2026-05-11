import { CheckCircle2, Utensils, Package, Users } from "lucide-react";

const items = [
  { Icon: CheckCircle2, num: "6 Years", label: "Operating in Gaza" },
  { Icon: Utensils, num: "12,400+", label: "Meals Delivered This Month" },
  { Icon: Package, num: "8,700+", label: "Food Parcels Distributed" },
  { Icon: Users, num: "100,000+", label: "Donors Worldwide" },
];

const CredibilityStrip = () => (
  <section className="bg-sh-green text-white py-7">
    <div className="mx-auto max-w-[1200px] px-5">
      <ul className="flex gap-8 overflow-x-auto md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
        {items.map(({ Icon, num, label }) => (
          <li key={label} className="flex shrink-0 items-center gap-3 md:justify-center">
            <Icon className="h-6 w-6 shrink-0" strokeWidth={1.8} aria-hidden="true" />
            <div>
              <div className="font-sans font-bold text-[22px] sm:text-[26px] leading-none">{num}</div>
              <div className="font-sans text-[12px] sm:text-[13px]" style={{ color: "rgba(255,255,255,0.72)" }}>
                {label}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default CredibilityStrip;
