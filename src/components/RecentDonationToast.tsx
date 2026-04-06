import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { MapPin } from "lucide-react";

const donors = [
  { name: "Fatima A.", amount: "$12/month", location: "Portland, United States" },
  { name: "Ahmed K.", amount: "$25", location: "London, United Kingdom" },
  { name: "Sarah M.", amount: "$50", location: "Toronto, Canada" },
  { name: "Omar R.", amount: "$18/month", location: "Dubai, UAE" },
  { name: "Jessica L.", amount: "$100", location: "Sydney, Australia" },
  { name: "Muhammad H.", amount: "$30/month", location: "Chicago, United States" },
  { name: "Aisha B.", amount: "$15", location: "Berlin, Germany" },
  { name: "Ryan S.", amount: "$75", location: "New York, United States" },
  { name: "Yusuf T.", amount: "$20/month", location: "Istanbul, Turkey" },
  { name: "Mariam N.", amount: "$40", location: "Paris, France" },
  { name: "David W.", amount: "$60", location: "Los Angeles, United States" },
  { name: "Khadija F.", amount: "$10/month", location: "Kuala Lumpur, Malaysia" },
];

const RecentDonationToast = () => {
  const indexRef = useRef(Math.floor(Math.random() * donors.length));

  useEffect(() => {
    const showDonation = () => {
      const donor = donors[indexRef.current % donors.length];
      indexRef.current++;

      toast(
        <div className="flex items-center gap-3">
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
        { duration: 5000 }
      );
    };

    // Show first one after 5s
    const initialTimeout = setTimeout(showDonation, 5000);
    // Then every 20s
    const interval = setInterval(showDonation, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default RecentDonationToast;
