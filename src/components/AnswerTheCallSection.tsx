import volunteerImg from "@/assets/volunteer-child.jpg";

interface AnswerTheCallProps {
  onDonateClick: () => void;
}

const AnswerTheCallSection = ({ onDonateClick }: AnswerTheCallProps) => {
  return (
    <section className="bg-secondary/40 px-4 py-16">
      <div className="mx-auto grid max-w-[1080px] items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        {/* Left - Text */}
        <div className="text-center md:text-left">
          <h2 className="mb-6 text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[3rem]">
            Answer The Call—<span className="text-accent">Join Our Efforts</span> In Supporting Gaza.
          </h2>

          <p className="mb-5 text-lg leading-8 text-foreground/85">
            <em>"The best of people are those who are most beneficial to others."</em>
          </p>

          <p className="mb-5 text-lg leading-8 text-foreground/85">
            While we might not have the ability to halt the conflict directly, we can provide crucial
            empowerment and support to the innocent individuals trapped amidst its chaos.
          </p>

          <p className="mb-5 text-lg leading-8 text-foreground/85">
            With just $25—an amount we might easily spend on a casual dinner or a coffee run—you can help
            provide food baskets and clean water to 5 families in Gaza. Your small sacrifice can make a big
            difference in their lives.
          </p>

          <p className="mb-8 text-lg leading-8 text-foreground/85">
            Right now, our team is on the ground in Gaza, delivering <strong>food parcels</strong>,{" "}
            <strong>water</strong>, and <strong>medical supplies</strong> to those in dire need. But our
            resources are limited, and we can't do it alone. Your involvement can make all the difference.
            Will you join us in helping our displaced brothers and sisters?
          </p>

          <button type="button" onClick={onDonateClick} className="donate-bar-button">
            Get Involved Today
          </button>
        </div>

        {/* Right - Image */}
        <div className="flex justify-center">
          <img
            src={volunteerImg}
            alt="Human Releaf volunteer walking with a child at a refugee camp"
            className="w-full max-w-[460px] object-cover"
            loading="lazy"
            width={800}
            height={1024}
          />
        </div>
      </div>
    </section>
  );
};

export default AnswerTheCallSection;
