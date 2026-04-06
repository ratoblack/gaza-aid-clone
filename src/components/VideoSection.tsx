interface VideoProps {
  onDonateClick: () => void;
}

const VideoSection = ({ onDonateClick }: VideoProps) => {
  return (
    <section className="px-4 pb-12">
      <div className="mx-auto max-w-[1080px]">
        <div className="video-shell relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/I_Mdh9JbWKU?rel=0&modestbranding=1"
            title="The People of Gaza Are Asking..."
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-6 flex justify-center">
          <button type="button" onClick={onDonateClick} className="donate-bar-button">
            Donate Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
