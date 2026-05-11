const UrgencyBar = () => (
  <div className="fixed top-0 left-0 right-0 z-40 w-full bg-sh-red text-white text-center font-sans font-bold text-[11px] sm:text-[13px] tracking-wide leading-[36px] h-9 px-3 sm:px-4 overflow-hidden whitespace-nowrap">
    <span aria-hidden="true">⚠ </span>
    <span className="sm:hidden">EMERGENCY — Donate now. Aid arrives within 48h.</span>
    <span className="hidden sm:inline">
      EMERGENCY APPEAL — Families in Gaza have not eaten today. Your donation reaches them within 48 hours.
    </span>
  </div>
);

export default UrgencyBar;
