"use client";

import { ReactNode, useEffect, useState, useRef } from 'react';

type LazySectionProps = {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  minHeight?: string;
};

/**
 * LazySection component that loads content only when it's about to enter the viewport.
 * Uses Intersection Observer API for efficient progressive loading.
 * Automatically uses 500px rootMargin on mobile for better perceived performance.
 */
export const LazySection = ({
  children,
  fallback,
  rootMargin = '200px', // Load 200px before entering viewport (desktop default)
  threshold = 0.01, // Trigger when 1% is visible
  minHeight = '400px', // Prevent layout shift
}: LazySectionProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android|Mobile|Tablet/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    checkMobile();
  }, []);

  // Use 500px rootMargin on mobile for better perceived performance
  const effectiveRootMargin = isMobile ? '500px' : rootMargin;
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad) {
            setShouldLoad(true);
            // Small delay to ensure smooth transition
            setTimeout(() => setIsVisible(true), 50);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: effectiveRootMargin,
        threshold,
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [effectiveRootMargin, threshold, shouldLoad]);

  return (
    <div
      ref={sectionRef}
      style={{ minHeight: !shouldLoad ? minHeight : 'auto' }}
      className="w-full"
    >
      {shouldLoad && isVisible ? (
        <div className="animate-fade-in">{children}</div>
      ) : (
        fallback || (
          <div className="h-96 flex items-center justify-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-32"></div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

