import { Float, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { profile } from "../../data/profile";
import { PLATFORM_POSITIONS } from "../../utils/positions";
import { openPlatformDetail } from "../../utils/platformDetail";

export function AboutPlatform() {
  const pos = PLATFORM_POSITIONS.about;
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.3;
      outerRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.35;
    }
  });

  return (
    <group position={[pos.x, pos.y + 0.5, pos.z]}>
      {/* Floating holographic avatar construct */}
      <Float speed={1} floatIntensity={0.4}>
        <group position={[0, 5.5, 0]}>
          {/* Outer wireframe dodecahedron */}
          <group ref={outerRef}>
            <mesh>
              <dodecahedronGeometry args={[0.9, 0]} />
              <meshStandardMaterial
                color="#8b5cf6"
                emissive="#8b5cf6"
                emissiveIntensity={0.6}
                wireframe
                toneMapped={false}
              />
            </mesh>
          </group>
          {/* Inner glowing core */}
          <mesh ref={innerRef}>
            <icosahedronGeometry args={[0.35, 1]} />
            <meshBasicMaterial
              color="#a78bfa"
              toneMapped={false}
              transparent
              opacity={0.7}
            />
          </mesh>
          {/* Orbital rings */}
          <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[1.2, 0.015, 8, 32]} />
            <meshBasicMaterial
              color="#8b5cf6"
              toneMapped={false}
              transparent
              opacity={0.5}
            />
          </mesh>
          <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, Math.PI / 3]}>
            <torusGeometry args={[1.05, 0.015, 8, 32]} />
            <meshBasicMaterial
              color="#a78bfa"
              toneMapped={false}
              transparent
              opacity={0.35}
            />
          </mesh>
          <pointLight color="#8b5cf6" intensity={2} distance={10} />
        </group>
      </Float>

      {/* Floating data particles */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const r = 3.5;
        return (
          <Float key={i} speed={2 + i * 0.3} floatIntensity={0.4}>
            <mesh
              position={[
                Math.cos(angle) * r,
                1.5 + (i % 3) * 0.8,
                Math.sin(angle) * r,
              ]}
            >
              <octahedronGeometry args={[0.08, 0]} />
              <meshBasicMaterial
                color="#a78bfa"
                toneMapped={false}
                transparent
                opacity={0.6}
              />
            </mesh>
          </Float>
        );
      })}

      {/* Bio card */}
      <Float speed={1.5} floatIntensity={0.3}>
        <group position={[-3, 2.5, 2]}>
          <Html transform distanceFactor={8}>
            <div
              style={{
                width: "170px",
                padding: "10px 12px",
                background: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(139,92,246,0.2)",
                borderRadius: "6px",
                color: "#e0e0ff",
                fontFamily: "'Courier New', monospace",
                cursor: "pointer",
              }}
              onClick={() => openPlatformDetail("about")}
            >
              <div
                style={{
                  color: "#8b5cf6",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              >
                {"// ABOUT"}
              </div>
              <div
                style={{ color: "#00f0ff", fontSize: "12px", marginTop: "6px" }}
              >
                {profile.name}
              </div>
              <div
                style={{ color: "#808090", fontSize: "9px", marginTop: "2px" }}
              >
                {profile.title}
              </div>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "9px",
                  lineHeight: 1.5,
                  opacity: 0.6,
                }}
              >
                {profile.bio.slice(0, 80)}...
              </p>
            </div>
          </Html>
        </group>
      </Float>

      {/* Highlights card */}
      <Float speed={1.5} floatIntensity={0.3}>
        <group position={[3, 2.5, 2]}>
          <Html transform distanceFactor={8}>
            <div
              style={{
                width: "170px",
                padding: "10px 12px",
                background: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(167,139,250,0.2)",
                borderRadius: "6px",
                color: "#e0e0ff",
                fontFamily: "'Courier New', monospace",
                cursor: "pointer",
              }}
              onClick={() => openPlatformDetail("about")}
            >
              <div
                style={{
                  color: "#a78bfa",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              >
                {"// HIGHLIGHTS"}
              </div>
              <div
                style={{
                  marginTop: "6px",
                  fontSize: "9px",
                  lineHeight: 1.6,
                  opacity: 0.7,
                }}
              >
                {profile.highlights.slice(0, 2).map((h) => (
                  <div key={h} style={{ color: "#00ff88" }}>
                    + {h}
                  </div>
                ))}
              </div>
            </div>
          </Html>
        </group>
      </Float>

      {/* Links card */}
      <Float speed={1.5} floatIntensity={0.3}>
        <group position={[0, 1.5, 4]}>
          <Html transform distanceFactor={8}>
            <div
              style={{
                width: "140px",
                padding: "10px 12px",
                background: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(0,240,255,0.15)",
                borderRadius: "6px",
                color: "#e0e0ff",
                fontFamily: "'Courier New', monospace",
                cursor: "pointer",
              }}
              onClick={() => openPlatformDetail("about")}
            >
              <div
                style={{
                  color: "#00f0ff",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              >
                {"// CONNECT"}
              </div>
              <div
                style={{ marginTop: "6px", fontSize: "9px", lineHeight: 1.8 }}
              >
                <div style={{ color: "#00ff88", opacity: 0.7 }}>
                  &gt; github
                </div>
                <div style={{ color: "#a78bfa", opacity: 0.7 }}>
                  &gt; linkedin
                </div>
                <div style={{ color: "#00f0ff", opacity: 0.7 }}>&gt; email</div>
              </div>
            </div>
          </Html>
        </group>
      </Float>
    </group>
  );
}
