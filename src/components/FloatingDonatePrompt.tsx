import { Heart } from "lucide-react";

interface FloatingDonatePromptProps {
  visible: boolean;
  onDonateClick: () => void;
  onDismiss: () => void;
}

const FloatingDonatePrompt = ({ visible, onDonateClick, onDismiss }: FloatingDonatePromptProps) => {
  if (!visible) return null;

  return (
    <div className="floating-prompt fixed bottom-4 right-4 z-30 hidden overflow-hidden md:flex">
      <div className="flex items-center gap-3 px-5 py-4">
        <Heart className="h-6 w-6 fill-current text-accent" />
        <p className="max-w-[210px] text-[1.02rem] leading-7 text-foreground">
          Complete your $40 gift to make a difference
        </p>
      </div>

      <div className="flex min-w-[120px] flex-col border-l border-border">
        <button type="button" onClick={onDonateClick} className="floating-prompt-action flex-1 px-5 py-4 text-base font-semibold">
          I’m ready
        </button>
        <button type="button" onClick={onDismiss} className="floating-prompt-action border-t border-border px-5 py-4 text-base font-medium text-foreground/72">
          Not today
        </button>
      </div>
    </div>
  );
};

export default FloatingDonatePrompt;
