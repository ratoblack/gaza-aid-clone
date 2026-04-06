import logo from "@/assets/logo.png";

interface HeaderProps {
  onDonateClick: () => void;
}

const Header = ({ onDonateClick }: HeaderProps) => {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-primary shadow-sm">
      <div className="mx-auto flex max-w-[1080px] items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-0">
          <div className="flex h-[86px] items-center pr-4 sm:pr-5">
            <img src={logo} alt="Human Releaf" className="h-20 w-20 sm:h-14 sm:w-14 object-contain" />
          </div>
          <div className="hidden h-14 border-r border-dashed border-primary-foreground/65 sm:block" />
          <div className="pl-3 sm:pl-5">
            <p className="text-2xl font-semibold tracking-tight text-primary-foreground sm:text-[2rem]">
              Human Releaf
            </p>
          </div>
        </div>

        <button type="button" onClick={onDonateClick} className="header-donate-button text-xs px-3 py-1.5 sm:text-base sm:px-4 sm:py-2">
          DONATE NOW
        </button>
      </div>
    </header>
  );
};

export default Header;
