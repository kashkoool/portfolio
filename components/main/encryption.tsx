"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { slideInFromTop } from "@/lib/motion";

export const Encryption = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  return (
    <div className={`flex flex-row relative items-center justify-center w-full h-full -z-20 ${
      isMobile 
        ? 'py-16 min-h-[60vh]' // Smaller height for mobile
        : 'min-h-screen'
    }`}>
      <div className="absolute w-auto h-auto top-0 z-[5]">
        <motion.div
          variants={slideInFromTop}
          className={`font-medium text-center text-gray-200 ${
            isMobile 
              ? 'text-2xl' // Smaller text for mobile
              : 'text-[40px]'
          }`}
        >
          Performance{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            &
          </span>{" "}
          security.
        </motion.div>
      </div>

      <div className={`flex flex-col items-center justify-center absolute z-[20] w-auto h-auto ${
        isMobile 
          ? 'translate-y-[-20px]' // Less translation for mobile
          : 'translate-y-[-50px]'
      }`}>
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
          <Image
            src="/lock-top.png"
            alt="Lock top"
            width={isMobile ? 36 : 50}
            height={isMobile ? 36 : 50}
            className={`transition-all duration-200 group-hover:translate-y-11 ${
              isMobile ? 'translate-y-3' : 'translate-y-5'
            }`}
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: isMobile ? '36px' : '50px',
              maxHeight: isMobile ? '36px' : '50px',
            }}
          />
          <Image
            src="/lock-main.png"
            alt="Lock main"
            width={isMobile ? 50 : 70}
            height={isMobile ? 50 : 70}
            className="z-10"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: isMobile ? '50px' : '70px',
              maxHeight: isMobile ? '50px' : '70px',
            }}
          />
        </div>

        <div className="Welcome-box px-[15px] py-[4px] z-[20] border my-[20px] border-[#7042F88B] opacity-[0.9]">
          <h1 className="Welcome-text text-[12px]">Encryption</h1>
        </div>
      </div>

      <div className={`absolute z-[20] bottom-[10px] px-[5px] ${
        isMobile ? 'px-4' : ''
      }`}>
        <div className={`cursive font-medium text-center text-gray-300 ${
          isMobile 
            ? 'text-base' // Smaller text for mobile
            : 'text-[20px]'
        }`}>
          Secure your data with end-to-end encryption.
        </div>
      </div>

      <div className="w-full flex items-start justify-center absolute">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="none"
          className={`w-full opacity-50 ${
            isMobile 
              ? 'h-[120px] object-cover' // Fixed height for mobile
              : 'h-auto'
          }`}
        >
          <source src="/videos/encryption-bg.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
};
