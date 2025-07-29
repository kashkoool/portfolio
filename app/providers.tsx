"use client";

import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/main/navbar';
import { Footer } from '@/components/main/footer';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

// Dynamically import StarsCanvas with no SSR to reduce initial bundle
const StarsCanvas = dynamic(() => import('@/components/main/star-background').then(mod => ({ default: mod.StarsCanvas })), { 
  ssr: false,
  loading: () => null // No loading state to avoid layout shift
});

export function Providers({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

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

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className={inter.className}>
        {/* Render StarsCanvas on both mobile and desktop - mobile has 25 stars, desktop has 1000 */}
        {isClient && <StarsCanvas />}
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
