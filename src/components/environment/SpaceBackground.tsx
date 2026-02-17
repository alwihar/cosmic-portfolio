import { Stars } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points } from "three";

export function SpaceBackground() {
  const starsRef = useRef<Points>(null);

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={200}
      depth={100}
      count={5000}
      factor={4}
      saturation={0.2}
      fade
      speed={0.5}
    />
  );
}
