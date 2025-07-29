import { Hero } from "@/components/main/hero";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Progressive loading with intersection observer
const Skills = dynamic(() => import("@/components/main/skills").then(mod => ({ default: mod.Skills })), { 
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-48 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-32"></div>
      </div>
    </div>
  )
});

const Encryption = dynamic(() => import("@/components/main/encryption").then(mod => ({ default: mod.Encryption })), { 
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-48 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-32"></div>
      </div>
    </div>
  )
});

const Projects = dynamic(() => import("@/components/main/projects").then(mod => ({ default: mod.Projects })), { 
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-48 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-32"></div>
      </div>
    </div>
  )
});

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading Skills...</div>}>
          <Skills />
        </Suspense>
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading Encryption...</div>}>
          <Encryption />
        </Suspense>
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading Projects...</div>}>
          <Projects />
        </Suspense>
      </div>
    </main>
  );
}
