'use client';

import { HeroContent } from "@/components/sub/hero-content";
import { useEffect, useState, useMemo } from "react";

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android|Mobile|Tablet/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Memoize video classes to avoid recalculation
  const videoClasses = useMemo(() => {
    const baseClasses = "rotate-180 absolute left-0 w-full h-full object-cover -z-20 opacity-50";
    const topClass = isMobile ? 'top-[-50px]' : 'top-[-340px]'; // Better mobile positioning
    return `${baseClasses} ${topClass}`;
  }, [isMobile]);

  if (!isClient) {
    return (
      <div className="relative flex flex-col h-full w-full">
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full w-full">
      {!isMobile && (
        <video
          autoPlay
          muted
          loop
          preload="metadata" // Only load metadata initially
          className={videoClasses}
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/videos/blackhole.webm" type="video/webm" />
        </video>
      )}
      {isMobile ? (
        <>
          <div style={{ height: 10 }} /> {/* Better spacing for mobile */}
          <HeroContent />
        </>
      ) : (
        <HeroContent />
      )}
    </div>
  );
};
