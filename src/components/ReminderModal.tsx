import { useState } from "react";
import { Bell, ChevronLeft, Heart } from "lucide-react";

interface ReminderModalProps {
  isOpen: boolean;
  onBack: () => void;
  onClose: () => void;
}

const ReminderModal = ({ isOpen, onBack, onClose }: ReminderModalProps) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="reminder-panel w-full max-w-[390px] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-primary-foreground/10 px-5 py-4">
          <button type="button" onClick={onBack} className="text-panel-foreground" aria-label="Back to donation modal">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="text-xl font-semibold text-panel-foreground">Maybe next time?</h3>
          <div className="h-5 w-5" />
        </div>

        <div className="px-7 py-10 text-center">
          <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[1.35rem] bg-primary-foreground/6">
            <Bell className="h-10 w-10 text-[#f6bd3e]" />
            <div className="absolute -right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#49a7f6] text-white">
              <Heart className="h-3.5 w-3.5 fill-current" />
            </div>
          </div>

          <p className="mx-auto mb-7 max-w-[250px] text-[1.05rem] leading-8 text-panel-foreground/90">
            Please leave your email address below and we’ll send you a gentle reminder later.
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="mb-8 h-14 w-full rounded-xl border border-ring bg-transparent px-4 text-panel-foreground outline-none placeholder:text-panel-foreground/45 focus:border-ring"
          />

          <div className="space-y-3">
            <button type="button" onClick={onClose} className="payment-primary-button text-lg">
              Remind me later
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-14 w-full items-center justify-center rounded-xl bg-background text-lg font-medium text-foreground transition-colors hover:bg-muted"
            >
              No, thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;
