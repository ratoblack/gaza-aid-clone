import mealsGaza from "@/assets/spotlight/meals-gaza.jpg";
import feedFamilies from "@/assets/spotlight/feed-families.jpg";

interface Props {
  onDonateClick: () => void;
}

const MealsAndFamiliesSection = ({ onDonateClick }: Props) => {
  const blocks = [
    {
      img: mealsGaza,
      title: "Meals in Gaza",
      body:
        "For the past two years, families in Gaza have faced unimaginable hardship. A warm meal can bring comfort, hope, and a sense of dignity. Join us in providing life-saving meals to those who need them most.",
      strong: "Every plate makes a difference.",
      reverse: false,
    },
    {
      img: feedFamilies,
      title: "Feed Families",
      body:
        "In Gaza, families endure hunger and hardship daily. A simple meal can be a lifeline. Your support helps us provide food and relief to those struggling to survive.",
      strong: "Together, we can make a difference—one meal at a time.",
      reverse: true,
    },
  ];

  return (
    <section className="bg-background px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] space-y-24">
        {blocks.map((b) => (
          <div
            key={b.title}
            className={`grid items-center gap-12 lg:grid-cols-2 ${b.reverse ? "lg:[&>div:first-child]:order-2" : ""}`}
          >
            <div>
              <img src={b.img} alt={b.title} loading="lazy" className="w-full rounded-3xl object-cover shadow-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-foreground sm:text-5xl">{b.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground/80">{b.body}</p>
              <p className="mt-4 text-lg font-bold text-foreground">{b.strong}</p>
              <button
                type="button"
                onClick={onDonateClick}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition hover:brightness-110"
              >
                Feed a Life
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MealsAndFamiliesSection;
