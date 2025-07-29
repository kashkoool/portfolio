"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className={`flex flex-row items-center justify-center w-full z-[20] ${
        isMobile 
          ? 'px-4 mt-20' // Better mobile spacing
          : 'px-20 mt-40'
      }`}
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <div
          className={`Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] ${
            isMobile ? 'text-center' : ''
          }`}
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Software Engineer Portfolio
          </h1>
        </div>

        <div
          className={`flex flex-col gap-6 mt-6 text-bold text-white max-w-[600px] w-auto h-auto ${
            isMobile 
              ? 'text-3xl gap-4' // Smaller text and gap for mobile
              : 'text-6xl'
          }`}
        >
          <span>
            {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Smart solutions
            </span>{" "}
            that shape the future & exceptional
            <div></div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              project experiences
            </span>{" "}
          </span>
        </div>

        <p
          className={`text-gray-400 my-5 max-w-[600px] ${
            isMobile 
              ? 'text-base leading-relaxed' // Better mobile text
              : 'text-lg'
          }`}
        >
          Adaptable Software Engineer with hands-on experience in designing scalable web systems, managing complex data systems,and implementing automation solutions. 
          Explore my projects to see how I bring ideas to life.
        </p>

        <a
          className={`py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] ${
            isMobile ? 'w-full' : ''
          }`}
        >
          Learn more
        </a>
      </div>
    </div>
  );
};
