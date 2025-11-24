import { Hero } from "@/components/main/hero";
import dynamic from "next/dynamic";
import { LazySection } from "@/components/sub/lazy-section";

// Dynamically import sections for code splitting - immediate loading to avoid CLS
const Skills = dynamic(() => import("@/components/main/skills").then(mod => ({ default: mod.Skills })), { 
  ssr: false,
});

const Encryption = dynamic(() => import("@/components/main/encryption").then(mod => ({ default: mod.Encryption })), { 
  ssr: false,
});

const Projects = dynamic(() => import("@/components/main/projects").then(mod => ({ default: mod.Projects })), { 
  ssr: false,
});

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        {/* Hero loads immediately - it's above the fold */}
        <Hero />
        
        {/* Sections load immediately via LazySection to avoid CLS - no sequential delays */}
        <LazySection rootMargin="500px" minHeight="500px">
          <Skills />
        </LazySection>
        
        <LazySection rootMargin="500px" minHeight="400px">
          <Encryption />
        </LazySection>
        
        <LazySection rootMargin="500px" minHeight="600px">
          <Projects />
        </LazySection>
      </div>
    </main>
  );
}
