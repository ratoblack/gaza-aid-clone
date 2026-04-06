import heroImage1 from "@/assets/hero-1.png";
import heroImage3 from "@/assets/hero-3.png";

interface ContentProps {
  onDonateClick: () => void;
}

const ContentSection = ({ onDonateClick }: ContentProps) => {
  return (
    <section className="bg-background px-4 pb-12 pt-1">
      <div className="mx-auto max-w-[1080px]">
        <p className="mb-8 text-center text-xl font-medium text-foreground/85 sm:text-[2rem]">
          We must act now to help our brothers and sisters.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <img
            src={heroImage1}
            alt="Human Releaf volunteers preparing food packs for families in Gaza"
            className="h-[290px] w-full object-cover"
            loading="lazy"
          />
          <img
            src={heroImage3}
            alt="Human Releaf water trucks bringing clean water to Gaza"
            className="h-[290px] w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="mt-5 flex justify-center">
          <button type="button" onClick={onDonateClick} className="donate-bar-button">
            Water Is The Best Charity : Give Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
