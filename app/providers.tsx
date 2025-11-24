"use client";

import { ReactNode, useEffect, useState, useRef } from 'react';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/main/navbar';
import { Footer } from '@/components/main/footer';
import dynamic from 'next/dynamic';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Optimize font loading
  preload: true,
});

// Dynamically import StarsCanvas with no SSR to reduce initial bundle
const StarsCanvas = dynamic(() => import('@/components/main/star-background').then(mod => ({ default: mod.StarsCanvas })), { 
  ssr: false,
  loading: () => null // No loading state to avoid layout shift
});

export function Providers({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [shouldLoadStars, setShouldLoadStars] = useState(false);
  const starsContainerRef = useRef<HTMLDivElement>(null);

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

  // Delay loading stars and use Intersection Observer - DISABLED ON MOBILE
  useEffect(() => {
    if (!isClient) return;
    
    // Completely disable StarsCanvas on mobile to save ~500KB+ JavaScript bundle
    if (isMobile) {
      return; // Don't load stars on mobile
    }

    let delayTimer: NodeJS.Timeout;
    let fallbackTimer: NodeJS.Timeout;
    let observer: IntersectionObserver | null = null;

    // Delay initial load by 1-2 seconds to prioritize critical content
    delayTimer = setTimeout(() => {
      // Use Intersection Observer to load when in viewport or after delay
      if (starsContainerRef.current) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setShouldLoadStars(true);
                if (observer) {
                  observer.disconnect();
                  observer = null;
                }
              }
            });
          },
          { threshold: 0.1, rootMargin: '50px' }
        );
        observer.observe(starsContainerRef.current);
        
        // Fallback: load after 2 seconds even if not intersecting
        fallbackTimer = setTimeout(() => {
          setShouldLoadStars(true);
          if (observer) {
            observer.disconnect();
            observer = null;
          }
        }, 2000);
      } else {
        // Fallback: load after delay if container not found
        setShouldLoadStars(true);
      }
    }, 1500); // 1.5 second delay

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [isClient, isMobile]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className={inter.className}>
        {/* Lazy load StarsCanvas with Intersection Observer - DISABLED ON MOBILE for performance */}
        {!isMobile && <div ref={starsContainerRef} className="fixed inset-0 -z-10" aria-hidden="true" />}
        {isClient && !isMobile && shouldLoadStars && <StarsCanvas />}
        {/* Navbar and Footer load immediately to avoid CLS */}
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
