"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const SkillText = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <div
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">
        Mastering Modern Development Skills
        </h1>
      </div>

      <div
        className={`text-white font-medium mt-[10px] text-center mb-[15px] ${
          isMobile 
            ? 'text-xl' // Smaller text for mobile
            : 'text-[30px]'
        }`}
      >
        Making apps with modern technologies.
      </div>

      <div
        className={`cursive text-gray-200 mb-10 mt-[10px] text-center ${
          isMobile 
            ? 'text-base' // Smaller text for mobile
            : 'text-[20px]'
        }`}
      >
        Never miss a task, deadline or idea.
      </div>
    </div>
  );
};
