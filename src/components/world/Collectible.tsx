import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "../../store/gameStore";
import { playSfx } from "../../audio/sfxManager";

interface CollectibleProps {
  readonly id: string;
  readonly position: [number, number, number];
  readonly color?: string;
}

export function Collectible({
  id,
  position,
  color = "#ffaa00",
}: CollectibleProps) {
  const collected = useGameStore((s) => s.collectedOrbs.has(id));
  const collectOrb = useGameStore((s) => s.collectOrb);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const collectedCount = useGameStore((s) => s.collectedOrbs.size);

  const outerRef = useRef<THREE.Mesh>(null);
  const [collecting, setCollecting] = useState(false);
  const scaleRef = useRef(1);

  useFrame(({ clock }) => {
    if (outerRef.current && !collected && !collecting) {
      outerRef.current.rotation.y = clock.getElapsedTime() * 2;
      outerRef.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.3;
    }
    if (collecting && outerRef.current) {
      scaleRef.current *= 0.88;
      outerRef.current.scale.setScalar(scaleRef.current);
      if (scaleRef.current < 0.01) {
        collectOrb(id);
        const newCount = collectedCount + 1;
        if (newCount >= 5) unlockAchievement("collector");
        if (newCount >= 12) unlockAchievement("completionist");
      }
    }
  });

  if (collected) return null;

  return (
    <Float speed={0.8} floatIntensity={0.25}>
      <group position={position}>
        {/* Invisible larger hitbox for easy clicking */}
        <mesh
          onClick={() => {
            if (!collecting) {
              setCollecting(true);
              playSfx("pickup");
            }
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
          }}
        >
          <sphereGeometry args={[0.7, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        {/* Visible wireframe */}
        <mesh ref={outerRef}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.5}
            wireframe
            toneMapped={false}
          />
        </mesh>
        {/* Inner glow core */}
        <mesh>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshBasicMaterial
            color={color}
            toneMapped={false}
            transparent
            opacity={0.8}
          />
        </mesh>
        <pointLight color={color} intensity={2} distance={6} />
      </group>
    </Float>
  );
}
