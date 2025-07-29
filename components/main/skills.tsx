'use client';

import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";
import { useEffect, useState, useMemo } from "react";

import {
  BACKEND_SKILL,
  FRONTEND_SKILL,
  FULLSTACK_SKILL,
  OTHER_SKILL,
  SKILL_DATA,
} from "@/constants";

export const Skills = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android|Mobile|Tablet/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Memoize skill arrays to avoid recalculation
  const mobileSkills = useMemo(() => {
    if (!isMobile) return {
      skillData: SKILL_DATA.slice(0, 8), // Reduced from all to 8 for desktop
      frontend: FRONTEND_SKILL.slice(0, 8),
      backend: BACKEND_SKILL.slice(0, 8),
      fullstack: FULLSTACK_SKILL.slice(0, 8),
      other: OTHER_SKILL.slice(0, 8)
    };
    
    return {
      skillData: SKILL_DATA.slice(0, 2), // Reduced from 3 to 2 skills on mobile
      frontend: FRONTEND_SKILL.slice(0, 2),
      backend: BACKEND_SKILL.slice(0, 2),
      fullstack: FULLSTACK_SKILL.slice(0, 2),
      other: OTHER_SKILL.slice(0, 2)
    };
  }, [isMobile]);

  return (
    <section
      id="skills"
      className={`flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden ${
        isMobile 
          ? 'py-10 px-4' // Better mobile spacing
          : 'py-20'
      }`}
      style={isMobile ? {} : { transform: "scale(0.9)" }}
    >
      <SkillText />

      <div className={`flex flex-row justify-around flex-wrap items-center ${
        isMobile 
          ? 'mt-6 gap-8' // Better mobile spacing
          : 'mt-4 gap-5'
      }`}>
        {mobileSkills.skillData.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      <div className={`flex flex-row justify-around flex-wrap items-center ${
        isMobile 
          ? 'mt-6 gap-8' // Better mobile spacing
          : 'mt-4 gap-5'
      }`}>
        {mobileSkills.frontend.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>
      <div className={`flex flex-row justify-around flex-wrap items-center ${
        isMobile 
          ? 'mt-6 gap-8' // Better mobile spacing
          : 'mt-4 gap-5'
      }`}>
        {mobileSkills.backend.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>
      <div className={`flex flex-row justify-around flex-wrap items-center ${
        isMobile 
          ? 'mt-6 gap-8' // Better mobile spacing
          : 'mt-4 gap-5'
      }`}>
        {mobileSkills.fullstack.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>
      <div className={`flex flex-row justify-around flex-wrap items-center ${
        isMobile 
          ? 'mt-6 gap-8' // Better mobile spacing
          : 'mt-4 gap-5'
      }`}>
        {mobileSkills.other.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          {!isMobile && (
            <video
              className="w-full h-full object-cover"
              preload="none"
              playsInline
              loop
              muted
              autoPlay
            >
              <source src="/videos/skills-bg.webm" type="video/webm" />
            </video>
          )}
        </div>
      </div>
    </section>
  );
};
