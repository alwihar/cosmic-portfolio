import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { HoloPanel } from "../shared/HoloPanel";
import { profile } from "../../data/profile";
import { PLATFORM_POSITIONS } from "../../utils/positions";

export function CommsTower() {
  const pos = PLATFORM_POSITIONS.contact;
  const dishRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (dishRef.current) {
      dishRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group position={[pos.x, pos.y + 0.5, pos.z]}>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.15, 0.3, 4, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
      </mesh>

      {[1, 2, 3].map((i) => (
        <mesh key={i} position={[0, i * 1.2, 0]}>
          <torusGeometry args={[0.25, 0.03, 8, 16]} />
          <meshBasicMaterial color="#ffaa00" toneMapped={false} />
        </mesh>
      ))}

      <group ref={dishRef} position={[0, 4.5, 0]}>
        <mesh rotation={[Math.PI * 0.25, 0, 0]}>
          <coneGeometry args={[0.8, 0.4, 16, 1, true]} />
          <meshStandardMaterial color="#2a2a4a" emissive="#ffaa00" emissiveIntensity={0.3} side={THREE.DoubleSide} metalness={0.8} />
        </mesh>
      </group>

      <Float speed={3} floatIntensity={0.2}>
        <mesh position={[0, 5.2, 0]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color="#ffaa00" toneMapped={false} />
        </mesh>
        <pointLight position={[0, 5.2, 0]} color="#ffaa00" intensity={2} distance={15} />
      </Float>

      <HoloPanel position={[-3, 2.5, 2]} color="#ffaa00" width={250}>
        <div>
          <h3 style={{ color: "#ffaa00", margin: "0 0 12px 0", fontSize: "14px" }}>// TRANSMISSION CONSOLE</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <a href={`mailto:${profile.social.email}`} style={{ color: "#00f0ff", textDecoration: "none", fontSize: "13px" }}>&gt; EMAIL: {profile.social.email}</a>
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" style={{ color: "#00ff88", textDecoration: "none", fontSize: "13px" }}>&gt; GITHUB: {profile.social.github.split("/").pop()}</a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#ff00ff", textDecoration: "none", fontSize: "13px" }}>&gt; LINKEDIN: {profile.social.linkedin.split("/").pop()}</a>
          </div>
          <p style={{ marginTop: "12px", fontSize: "11px", opacity: 0.6 }}>Signal strength: STRONG | Ready to connect</p>
        </div>
      </HoloPanel>
    </group>
  );
}
