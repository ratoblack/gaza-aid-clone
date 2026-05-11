import SHFooter from "@/components/sh/SHFooter";

interface Props {
  onDonateClick?: () => void;
}

// Legacy wrapper kept for backwards-compatibility with pages that still
// import `Footer`. Renders the canonical Spotlight Humanity footer.
const Footer = (_props: Props) => <SHFooter />;

export default Footer;
