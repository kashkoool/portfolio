"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import { useState, useRef, Suspense, useEffect, useMemo } from "react";
import type { Points as PointsType } from "three";

export const StarBackground = (props: PointsProps) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere, setSphere] = useState<Float32Array | null>(null);

  // Memoize mobile detection to avoid recalculation
  const isMobile = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    return /iPhone|iPad|iPod|Android|Mobile|Tablet/i.test(navigator.userAgent);
  }, []);

  // Memoize star generation to avoid recalculation
  const generateStars = useMemo(() => {
    const numPoints = isMobile ? 25 : 1000; // Reduced from 5000 to 1000 for desktop
    const positions = new Float32Array(numPoints * 3);

    for (let i = 0; i < numPoints * 3; i += 3) {
      let x, y, z;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
      } while (x * x + y * y + z * z > 1);

      const scale = isMobile ? 0.8 : 1.2; // Smaller scale for mobile
      positions[i] = x * scale;
      positions[i + 1] = y * scale;
      positions[i + 2] = z * scale;
    }

    return positions;
  }, [isMobile]);

  useEffect(() => {
    setSphere(generateStars);
  }, [generateStars]);

  // Same rotation speed for both mobile and desktop
  useFrame((_state, delta) => {
    if (ref.current && sphere) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  if (!sphere) {
    return null;
  }

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={sphere}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={isMobile ? 0.004 : 0.002} // Larger points for mobile visibility
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render on server or if not client
  if (!isClient) return null;

  return (
    <div className="w-full h-auto fixed inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        gl={{ 
          antialias: false, // Disable antialiasing for performance
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </div>
  );
};
