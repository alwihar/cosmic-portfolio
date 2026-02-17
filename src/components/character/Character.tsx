import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export function Character() {
  const visorRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(t * 3) * 0.15;
    }
    if (visorRef.current) {
      const mat = visorRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.7 + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <group>
      {/* Body */}
      <mesh castShadow position={[0, 0, 0]}>
        <capsuleGeometry args={[0.25, 0.4, 8, 16]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Head */}
      <mesh castShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[0.4, 0.35, 0.35]} />
        <meshStandardMaterial color="#16213e" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Visor */}
      <mesh ref={visorRef} position={[0, 0.55, 0.18]}>
        <boxGeometry args={[0.35, 0.12, 0.02]} />
        <meshBasicMaterial color="#00f0ff" toneMapped={false} transparent opacity={0.8} />
      </mesh>
      {/* Antenna */}
      <group ref={antennaRef} position={[0, 0.78, 0]}>
        <mesh>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <Float speed={6} floatIntensity={0.3} floatingRange={[0, 0.05]}>
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#ff00ff" toneMapped={false} />
          </mesh>
        </Float>
      </group>
      {/* Jetpack nozzles */}
      <mesh position={[-0.15, -0.1, -0.2]}>
        <cylinderGeometry args={[0.06, 0.04, 0.15, 8]} />
        <meshStandardMaterial color="#2a2a4a" emissive="#ff4400" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.15, -0.1, -0.2]}>
        <cylinderGeometry args={[0.06, 0.04, 0.15, 8]} />
        <meshStandardMaterial color="#2a2a4a" emissive="#ff4400" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}
