import { useState } from "react";
import FadeIn from "./FadeIn";
import videoPoster from "@/assets/hr/food-parcels.jpg";

const VIDEO_ID = "Sr2nbl0d9aU";

const VideoProofSection = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-sh-off-white py-16 sm:py-20 px-5">
      <div className="mx-auto max-w-[860px] text-center">
        <FadeIn>
          <h2 className="font-serif font-bold text-sh-text text-[26px] sm:text-[32px] leading-tight">
            See Our Work on the Ground
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-2 font-sans text-[15px] sm:text-[16px] text-sh-text-secondary">
            This is not a campaign video. This is what happens when your donation arrives.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative mt-8 w-full overflow-hidden rounded-lg border border-sh-border bg-black" style={{ aspectRatio: "16 / 9" }}>
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Spotlight Humanity field work in Gaza"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play video"
                className="group absolute inset-0 h-full w-full"
              >
                <img
                  src={videoPoster}
                  alt="Spotlight Humanity field team distributing food parcels to children in Gaza at golden hour"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="flex h-[72px] w-[72px] items-center justify-center rounded-full transition-colors"
                    style={{ background: "rgba(0,0,0,0.65)" }}
                  >
                    <svg
                      className="h-7 w-7 translate-x-[2px] text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
                <span className="absolute inset-0 transition-colors group-hover:bg-sh-green/20" />
              </button>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p className="mt-4 font-sans italic text-[13px] text-sh-text-muted">
            Filmed on the ground in Gaza by Spotlight Humanity field teams.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default VideoProofSection;
