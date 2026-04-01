import { Float, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { projects } from "../../data/projects";
import { PLATFORM_POSITIONS } from "../../utils/positions";
import { openPlatformDetail } from "../../utils/platformDetail";

export function HoloGallery() {
  const pos = PLATFORM_POSITIONS.projects;
  const radius = 4;

  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.6;
      ring1Ref.current.rotation.y = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.5;
      ring2Ref.current.rotation.z = t * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.4;
      ring3Ref.current.rotation.x = t * 0.25;
    }
  });

  return (
    <group position={[pos.x, pos.y + 0.5, pos.z]}>
      {/* Gyroscope */}
      <Float speed={1.2} floatIntensity={0.4}>
        <group position={[0, 5.5, 0]}>
          <mesh ref={ring1Ref}>
            <torusGeometry args={[1.1, 0.03, 8, 32]} />
            <meshBasicMaterial
              color="#e040fb"
              toneMapped={false}
              transparent
              opacity={0.7}
            />
          </mesh>
          <mesh ref={ring2Ref}>
            <torusGeometry args={[0.85, 0.03, 8, 32]} />
            <meshBasicMaterial
              color="#ea80fc"
              toneMapped={false}
              transparent
              opacity={0.5}
            />
          </mesh>
          <mesh ref={ring3Ref}>
            <torusGeometry args={[0.6, 0.03, 8, 32]} />
            <meshBasicMaterial
              color="#aa00ff"
              toneMapped={false}
              transparent
              opacity={0.5}
            />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.2, 0]} />
            <meshBasicMaterial color="#e040fb" toneMapped={false} />
          </mesh>
          <pointLight color="#e040fb" intensity={1.5} distance={8} />
        </group>
      </Float>

      {/* Compact project cards — major projects arranged in a circle */}
      {projects
        .filter((p) => p.type === "major")
        .map((project, i, arr) => {
          const angle = (i / arr.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <Float key={project.id} speed={1.5} floatIntensity={0.2}>
              <group
                position={[x, 2.5, z]}
                onClick={() => openPlatformDetail("projects")}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "default";
                }}
              >
                <mesh>
                  <planeGeometry args={[2.2, 1.2]} />
                  <meshBasicMaterial
                    color="#e040fb"
                    transparent
                    opacity={0.06}
                    toneMapped={false}
                  />
                </mesh>
                <Html transform position={[0, 0, 0.01]} distanceFactor={8}>
                  <div
                    style={{
                      width: "160px",
                      padding: "10px 12px",
                      background: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px",
                      color: "#e0e0ff",
                      fontFamily: "'Courier New', monospace",
                      cursor: "pointer",
                    }}
                    onClick={() => openPlatformDetail("projects")}
                  >
                    <div
                      style={{
                        color: "#00f0ff",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    >
                      {project.title}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "3px",
                        flexWrap: "wrap",
                        marginTop: "6px",
                      }}
                    >
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          style={{
                            padding: "1px 5px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "3px",
                            fontSize: "8px",
                            color: "#a0a0c0",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Html>
                <mesh position={[0, -1.2, 0]}>
                  <cylinderGeometry args={[0.1, 0.2, 1, 8]} />
                  <meshStandardMaterial
                    color="#1a1a2e"
                    emissive="#e040fb"
                    emissiveIntensity={0.3}
                    metalness={0.9}
                    roughness={0.2}
                  />
                </mesh>
              </group>
            </Float>
          );
        })}
    </group>
  );
}
