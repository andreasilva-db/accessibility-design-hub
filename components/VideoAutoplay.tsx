"use client";

import { useEffect, useRef } from "react";

/**
 * Plays the video automatically (muted) when it enters the viewport.
 * Pauses again when it scrolls out. The user can unmute via the controls.
 * Muted is required by browsers for autoplay without user interaction.
 */
export function VideoAutoplay() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay blocked by browser policy — controls still work
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    /* eslint-disable-next-line jsx-a11y/media-has-caption */
    <video
      ref={videoRef}
      src="/why-accessibility.mp4"
      controls
      playsInline
      muted
      preload="metadata"
      className="h-full w-full object-cover"
      aria-label="Video: why digital accessibility matters beyond UI"
    />
  );
}
