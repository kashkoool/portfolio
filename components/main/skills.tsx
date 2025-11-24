'use client';

import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";
import { useEffect, useState, useMemo, useRef } from "react";

import {
  BACKEND_SKILL,
  FRONTEND_SKILL,
  FULLSTACK_SKILL,
  OTHER_SKILL,
  SKILL_DATA,
} from "@/constants";

export const Skills = () => {
  // Check mobile synchronously to prevent video from rendering on mobile
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return /iPhone|iPad|iPod|Android|Mobile|Tablet/i.test(navigator.userAgent);
  });
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android|Mobile|Tablet/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const skillsSectionRef = useRef<HTMLElement>(null);

  // Memoize skill arrays - mobile shows only unique skills, desktop shows more
  const mobileSkills = useMemo(() => {
    if (!isMobile) {
      // Desktop: show more skills per category
      return {
        skillData: SKILL_DATA.slice(0, 8),
        frontend: FRONTEND_SKILL.slice(0, 8),
        backend: BACKEND_SKILL.slice(0, 8),
        fullstack: FULLSTACK_SKILL.slice(0, 8),
        other: OTHER_SKILL.slice(0, 8),
        allUnique: [] // Empty array for desktop
      };
    }
    
    // Mobile: Combine all skills, deduplicate by skill_name, and show unique ones only
    // This prevents the same skill from appearing multiple times across categories
    const allSkills = [
      ...SKILL_DATA,
      ...FRONTEND_SKILL,
      ...BACKEND_SKILL,
      ...FULLSTACK_SKILL,
      ...OTHER_SKILL
    ];
    
    // Deduplicate by skill_name using a Map (preserves order)
    const uniqueSkillsMap = new Map();
    allSkills.forEach(skill => {
      if (!uniqueSkillsMap.has(skill.skill_name)) {
        uniqueSkillsMap.set(skill.skill_name, skill);
      }
    });
    
    // Convert back to array and take first 8-10 unique skills for mobile
    const uniqueSkills = Array.from(uniqueSkillsMap.values()).slice(0, 10);
    
    // Return as single array for mobile (no separate categories to avoid duplicates)
    return {
      allUnique: uniqueSkills,
      skillData: [],
      frontend: [],
      backend: [],
      fullstack: [],
      other: []
    };
  }, [isMobile]);

  return (
    <section
      ref={skillsSectionRef}
      id="skills"
      className={`flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden ${
        isMobile 
          ? 'py-10 px-4' // Better mobile spacing
          : 'py-20'
      }`}
      style={isMobile ? {} : { transform: "scale(0.9)" }}
    >
      <SkillText />

      {isMobile ? (
        // Mobile: Show all unique skills in a single row (no duplicates)
        <div className="flex flex-row justify-around flex-wrap items-center mt-6 gap-8">
          {mobileSkills.allUnique.map((skill, i) => (
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
      ) : (
        // Desktop: Show skills in separate categories
        <>
          <div className="flex flex-row justify-around flex-wrap items-center mt-4 gap-5">
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

          <div className="flex flex-row justify-around flex-wrap items-center mt-4 gap-5">
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
          <div className="flex flex-row justify-around flex-wrap items-center mt-4 gap-5">
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
          <div className="flex flex-row justify-around flex-wrap items-center mt-4 gap-5">
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
          <div className="flex flex-row justify-around flex-wrap items-center mt-4 gap-5">
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
        </>
      )}

      {/* Video background - completely disabled on mobile to save ~2.2MB */}
      {!isMobile && (
        <div className="w-full h-full absolute">
          <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
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
          </div>
        </div>
      )}
    </section>
  );
};
