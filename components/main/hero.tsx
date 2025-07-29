'use client';

import { HeroContent } from "@/components/sub/hero-content";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative flex flex-col h-full w-full">
      <video
        autoPlay
        muted
        loop
        preload="none"
        className={
          `rotate-180 absolute left-0 w-full h-full object-cover -z-20 ` +
          (isMobile ? 'top-[-500px]' : 'top-[-340px]')
        }
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>
      {isMobile ? (
        <>
          <div style={{ height: 5 }} />
          <HeroContent />
        </>
      ) : (
        <HeroContent />
      )}
    </div>
  );
};
