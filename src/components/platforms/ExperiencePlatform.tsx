import { Float, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { experience } from "../../data/experience";
import { PLATFORM_POSITIONS } from "../../utils/positions";
import { openPlatformDetail } from "../../utils/platformDetail";

export function ExperiencePlatform() {
  const pos = PLATFORM_POSITIONS.experience;
  const crystalRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (crystalRef.current) {
      const t = clock.getElapsedTime();
      crystalRef.current.rotation.y = t * 0.3;
      crystalRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
  });

  return (
    <group position={[pos.x, pos.y + 0.5, pos.z]}>
      {/* Floating crystal prism */}
      <Float speed={1} floatIntensity={0.3}>
        <group ref={crystalRef} position={[0, 7.5, 0]}>
          {/* Outer wireframe */}
          <mesh>
            <octahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial
              color="#ff6b6b"
              emissive="#ff6b6b"
              emissiveIntensity={0.8}
              wireframe
              toneMapped={false}
            />
          </mesh>
          {/* Inner solid core */}
          <mesh>
            <octahedronGeometry args={[0.3, 0]} />
            <meshBasicMaterial
              color="#ff6b6b"
              toneMapped={false}
              transparent
              opacity={0.6}
            />
          </mesh>
          <pointLight color="#ff6b6b" intensity={1.5} distance={8} />
        </group>
      </Float>

      {/* Compact experience cards */}
      {experience.map((entry, i) => {
        const ri = experience.length - 1 - i;
        const angle =
          ((ri - 1) / experience.length) * Math.PI * 0.8 - Math.PI * 0.4;
        const radius = 4;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <Float key={entry.id} speed={1.5} floatIntensity={0.2}>
            <group
              position={[x, 2 + ri * 0.5, z]}
              onClick={() => openPlatformDetail("experience")}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "default";
              }}
            >
              <mesh>
                <octahedronGeometry args={[0.2, 0]} />
                <meshStandardMaterial
                  color={entry.color}
                  emissive={entry.color}
                  emissiveIntensity={1.5}
                  toneMapped={false}
                />
              </mesh>
              {i < experience.length - 1 && (
                <mesh position={[0, 0.6, 0]}>
                  <cylinderGeometry args={[0.01, 0.01, 0.8, 4]} />
                  <meshBasicMaterial
                    color={entry.color}
                    toneMapped={false}
                    transparent
                    opacity={0.4}
                  />
                </mesh>
              )}
              <Html transform position={[1.2, 0, 0]} distanceFactor={8}>
                <div
                  style={{
                    width: "150px",
                    padding: "10px 12px",
                    background: "rgba(0,0,0,0.8)",
                    border: `1px solid ${entry.color}30`,
                    borderRadius: "6px",
                    color: "#e0e0ff",
                    fontFamily: "'Courier New', monospace",
                    cursor: "pointer",
                  }}
                  onClick={() => openPlatformDetail("experience")}
                >
                  <div
                    style={{
                      color: entry.color,
                      fontSize: "9px",
                      opacity: 0.6,
                    }}
                  >
                    {entry.period}
                  </div>
                  <div
                    style={{
                      color: entry.color,
                      fontSize: "11px",
                      fontWeight: "bold",
                      marginTop: "2px",
                    }}
                  >
                    {entry.role}
                  </div>
                  <div
                    style={{
                      color: "#808090",
                      fontSize: "10px",
                      marginTop: "2px",
                    }}
                  >
                    {entry.company}
                  </div>
                </div>
              </Html>
            </group>
          </Float>
        );
      })}
    </group>
  );
}
