import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground px-4 py-14">
      <div className="mx-auto max-w-[1080px] text-center">
        <div className="mb-5 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-primary-foreground/70 bg-primary-foreground/5">
            <Heart className="h-10 w-10 text-primary-foreground" />
          </div>
        </div>

        <p className="text-base text-primary-foreground/85">
          Copyright © {new Date().getFullYear()} | All Rights Reserved | Human Releaf |{" "}
          <a href="#" className="text-accent hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
