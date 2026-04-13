import displacedImg from "@/assets/displaced-people.jpg";
import crisisImg from "@/assets/crisis-scene.jpg";

interface DesperatePleaProps {
  onDonateClick: () => void;
}

const DesperatePleaSection = ({ onDonateClick }: DesperatePleaProps) => {
  return (
    <section className="bg-background px-4 py-16">
      <div className="mx-auto max-w-[1080px] text-center">
        <h2 className="mb-6 text-[2.2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.8rem]">
          Desperate Plea: <span className="text-accent">Gaza's Children Cry</span>
          <br />
          For Food And Clean Water
        </h2>

        <div className="mx-auto max-w-[720px] space-y-4 text-xl leading-8 text-foreground/85">
          <p className="font-semibold">Do you hear them?</p>
          <p>Their voices echo through the shelter camps.</p>
          <p className="font-semibold">Do you see them?</p>
          <p>
            Countless people—men, women, children, orphans, the elderly, the injured, and the disabled—are
            struggling against the pain of hunger.
          </p>
          <p className="font-semibold">Will you help them?</p>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={onDonateClick}
            className="inline-flex w-full max-w-[780px] items-center justify-center bg-foreground py-5 text-2xl font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.01]"
          >
            HELP NOW
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <img
            src={displacedImg}
            alt="Displaced families waiting in line for food aid"
            className="h-[340px] w-full object-cover"
            loading="lazy"
            width={1024}
            height={768}
          />
          <img
            src={crisisImg}
            alt="Emergency medical response in a crisis zone"
            className="h-[340px] w-full object-cover"
            loading="lazy"
            width={1024}
            height={768}
          />
        </div>
      </div>
    </section>
  );
};

export default DesperatePleaSection;
