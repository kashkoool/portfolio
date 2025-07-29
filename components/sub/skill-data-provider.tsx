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

  // Optimize image dimensions for mobile
  const optimizedWidth = isMobile ? Math.min(width, 60) : width;
  const optimizedHeight = isMobile ? Math.min(height, 60) : height;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={imageVariants}
      className="inline-flex items-center justify-center"
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
        loading={index > 2 ? 'lazy' : 'eager'} // Only first 3 images eager load
        priority={index < 3} // Prioritize first few images
        sizes={isMobile ? "60px" : "80px"} // Optimize for mobile
      />
    </motion.div>
  );
};
