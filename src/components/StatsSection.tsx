import { HandCoins, Users, DollarSign, Calendar } from "lucide-react";

const stats = [
  { value: "300+", label: "Projects", Icon: HandCoins },
  { value: "1M", label: "Followers", Icon: Users },
  { value: "200K", label: "Donors", Icon: DollarSign },
  { value: "100K", label: "Beneficiaries", Icon: Calendar },
];

const StatsSection = () => {
  return (
    <section className="bg-primary px-5 py-16 text-primary-foreground sm:py-28">
      <div className="mx-auto max-w-[1180px] text-center">
        <h2 className="text-[1.75rem] font-extrabold sm:text-5xl">Our Efforts</h2>
        <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-primary-foreground/90 sm:mt-5 sm:text-lg">
          For six years, we've been shaping lives and spreading hope. Join our mission to bring joy to those who need it most.
          Your support makes the difference.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-8 sm:mt-14 lg:grid-cols-4">
          {stats.map(({ value, label, Icon }) => (
            <div key={label} className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur sm:h-16 sm:w-16">
                <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <div className="mt-4 text-4xl font-extrabold sm:text-5xl">{value}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground/85 sm:text-sm">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
