import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { PLATFORM_POSITIONS } from "../../utils/positions";
import { openPlatformDetail } from "../../utils/platformDetail";

export function Observatory() {
  const pos = PLATFORM_POSITIONS.observatory;
  const telescopeRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (telescopeRef.current) {
      telescopeRef.current.rotation.y = Math.sin(t * 0.2) * 0.5;
      telescopeRef.current.rotation.x = Math.sin(t * 0.15) * 0.1 - 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group
      position={[pos.x, pos.y + 0.5, pos.z]}
      onClick={() => openPlatformDetail("observatory")}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      {/* Telescope */}
      <group ref={telescopeRef} position={[0, 2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.2, 2.5, 8]} />
          <meshStandardMaterial color="#1a1a3e" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.3, 0]}>
          <sphereGeometry args={[0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#00aaff"
            emissive="#0066ff"
            emissiveIntensity={2}
            transparent
            opacity={0.7}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Rotating ring */}
      <mesh ref={ringRef} position={[0, 2, 0]}>
        <torusGeometry args={[1.5, 0.03, 8, 32]} />
        <meshBasicMaterial color="#4488ff" toneMapped={false} transparent opacity={0.6} />
      </mesh>

      {/* Base pedestal */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.4, 0.6, 1, 8]} />
        <meshStandardMaterial
          color="#1a1a3e"
          emissive="#4488ff"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Floating star markers */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <Float key={i} speed={1 + i * 0.3} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
            <mesh position={[Math.cos(angle) * 3, 3 + Math.sin(angle * 2), Math.sin(angle) * 3]}>
              <octahedronGeometry args={[0.08, 0]} />
              <meshBasicMaterial color="#4488ff" toneMapped={false} transparent opacity={0.8} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}
