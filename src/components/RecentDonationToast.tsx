import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { MapPin } from "lucide-react";

type Donor = {
  name: string;
  amount: string;
  location: string;
  flag: string;
  recurring?: boolean;
};

const donors: Donor[] = [
  // United States 🇺🇸 (USD)
  { name: "Sarah M.", amount: "$50", location: "New York, United States", flag: "🇺🇸" },
  { name: "Muhammad H.", amount: "$30/month", location: "Chicago, United States", flag: "🇺🇸", recurring: true },
  { name: "Jessica L.", amount: "$100", location: "Los Angeles, United States", flag: "🇺🇸" },
  { name: "Ahmed K.", amount: "$25", location: "Houston, United States", flag: "🇺🇸" },
  { name: "David W.", amount: "$60", location: "Seattle, United States", flag: "🇺🇸" },
  { name: "Fatima A.", amount: "$12/month", location: "Portland, United States", flag: "🇺🇸", recurring: true },

  // United Kingdom 🇬🇧 (GBP)
  { name: "Yusuf R.", amount: "£20", location: "London, United Kingdom", flag: "🇬🇧" },
  { name: "Aisha B.", amount: "£15/month", location: "Manchester, United Kingdom", flag: "🇬🇧", recurring: true },
  { name: "James P.", amount: "£40", location: "Birmingham, United Kingdom", flag: "🇬🇧" },
  { name: "Khadija N.", amount: "£10/month", location: "Leeds, United Kingdom", flag: "🇬🇧", recurring: true },

  // Ireland 🇮🇪 (EUR)
  { name: "Liam O.", amount: "€25", location: "Dublin, Ireland", flag: "🇮🇪" },
  { name: "Mariam C.", amount: "€50", location: "Cork, Ireland", flag: "🇮🇪" },
  { name: "Sean K.", amount: "€15/month", location: "Galway, Ireland", flag: "🇮🇪", recurring: true },

  // Qatar 🇶🇦 (QAR)
  { name: "Omar A.", amount: "QAR 100", location: "Doha, Qatar", flag: "🇶🇦" },
  { name: "Hassan M.", amount: "QAR 250", location: "Doha, Qatar", flag: "🇶🇦" },
  { name: "Layla S.", amount: "QAR 50/month", location: "Al Rayyan, Qatar", flag: "🇶🇦", recurring: true },
];

const RecentDonationToast = () => {
  const indexRef = useRef(Math.floor(Math.random() * donors.length));

  useEffect(() => {
    const showDonation = () => {
      const donor = donors[indexRef.current % donors.length];
      indexRef.current++;

      toast(
        <div className="flex items-center gap-3">
          <span className="text-2xl leading-none" aria-hidden="true">{donor.flag}</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium leading-5">
              <span className="font-bold text-primary">{donor.name}</span> just donated{" "}
              <span className="font-bold text-primary">{donor.amount}</span> 😊
            </p>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{donor.location}</span>
            </div>
          </div>
        </div>,
        { duration: 5000, position: "bottom-left" }
      );
    };

    const initialTimeout = setTimeout(showDonation, 5000);
    const interval = setInterval(showDonation, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default RecentDonationToast;
