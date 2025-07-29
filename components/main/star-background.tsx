"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import { useState, useRef, Suspense, useEffect } from "react";
import type { Points as PointsType } from "three";

export const StarBackground = (props: PointsProps) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere, setSphere] = useState<Float32Array | null>(null);

  useEffect(() => {
    // Detect mobile/iOS device
    const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const numPoints = isMobile ? 500 : 5000;
    const positions = new Float32Array(numPoints);

    // Simple and reliable star generation
    for (let i = 0; i < numPoints; i += 3) {
      // Generate points uniformly distributed in a sphere
      // Using rejection sampling method
      let x, y, z;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
      } while (x * x + y * y + z * z > 1);

      // Scale by radius
      const scale = 1.2;
      positions[i] = x * scale;
      positions[i + 1] = y * scale;
      positions[i + 2] = z * scale;
    }

    // Validate the array before setting it
    let hasNaN = false;
    for (let i = 0; i < positions.length; i++) {
      if (!isFinite(positions[i])) {
        hasNaN = true;
        break;
      }
    }

    if (!hasNaN) {
      setSphere(positions);
    } else {
      console.warn('Generated positions contain invalid values, retrying...');
      // Retry after a short delay
      setTimeout(() => {
        setSphere(new Float32Array(numPoints).map(() => (Math.random() - 0.5) * 2.4));
      }, 100);
    }
  }, []);

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
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => {
  return (
    <div className="w-full h-auto fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </div>
  );
};
