"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useMemo } from "react";

type SkillDataProviderProps = {
  src: string;
  name: string;
  width: number;
  height: number;
  index: number;
};

export const SkillDataProvider = ({
  src,
  name,
  width,
  height,
  index,
}: SkillDataProviderProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px 0px',
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android|Mobile|Tablet/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    checkMobile();
  }, []);

  // Simplified animation variants for better performance
  const imageVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: Math.min(index * 0.02, 0.2), // Reduced delay and cap
        duration: 0.2, // Faster animation
      },
    },
  }), [index]);

  // Optimize image dimensions for mobile - reduced from 60px to 48px
  const optimizedWidth = isMobile ? Math.min(width, 48) : width;
  const optimizedHeight = isMobile ? Math.min(height, 48) : height;

  // Use CSS transitions on mobile instead of Framer Motion for better performance
  if (isMobile) {
    return (
      <div
        ref={ref}
        className={`inline-flex items-center justify-center transition-all duration-300 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        style={{ 
          willChange: 'transform, opacity',
          transitionDelay: `${Math.min(index * 20, 200)}ms`
        }}
      >
        <Image
          src={`/skills/${src}`}
          width={optimizedWidth}
          height={optimizedHeight}
          alt={name}
          className="object-contain w-auto h-auto"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
          loading="lazy" // All images lazy on mobile
          priority={false} // No priority on mobile
          fetchPriority="low" // Low priority for all images on mobile
          decoding="async"
          sizes="48px" // Optimized for mobile
        />
      </div>
    );
  }

  // Desktop: Use Framer Motion
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={imageVariants}
      className="inline-flex items-center justify-center"
      style={{ willChange: 'transform, opacity' }}
    >
      <Image
        src={`/skills/${src}`}
        width={optimizedWidth}
        height={optimizedHeight}
        alt={name}
        className="object-contain w-auto h-auto"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
        loading={index > 2 ? 'lazy' : 'eager'}
        priority={index < 3}
        fetchPriority={index < 3 ? 'high' : 'low'}
        decoding="async"
        sizes="80px"
      />
    </motion.div>
  );
};
