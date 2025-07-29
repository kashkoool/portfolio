"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

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
    rootMargin: '0px 0px -50px 0px',
  });

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    },
  };

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
        width={width}
        height={height}
        alt={name}
        className="object-contain w-auto h-auto"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
        loading={index > 5 ? 'lazy' : 'eager'}
        priority={index < 3} // Prioritize first few images
      />
    </motion.div>
  );
};
