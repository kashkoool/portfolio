'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/main/navbar';
import { Footer } from '@/components/main/footer';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

export function Providers({ children }: { children: ReactNode }) {
  const StarsCanvas = dynamic(() => import('@/components/main/star-background').then(mod => mod.StarsCanvas), { ssr: false });
  // Detect iOS device
  const isIOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className={inter.className}>
        {!isIOS && <StarsCanvas />}
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
