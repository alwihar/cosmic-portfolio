import { Float, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { PLATFORM_POSITIONS } from "../../utils/positions";
import { openPlatformDetail } from "../../utils/platformDetail";

export function CommsTower() {
  const pos = PLATFORM_POSITIONS.contact;
  const dishRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (dishRef.current) {
      dishRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group
      position={[pos.x, pos.y + 0.5, pos.z]}
      onClick={() => openPlatformDetail("contact")}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      {/* Tower pole */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.15, 0.3, 4, 8]} />
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#ffaa00"
          emissiveIntensity={0.15}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Glowing rings along the pole */}
      {[1, 2, 3].map((i) => (
        <group key={i} position={[0, i * 1.2, 0]}>
          <mesh>
            <torusGeometry args={[0.25, 0.03, 8, 16]} />
            <meshBasicMaterial color="#ffaa00" toneMapped={false} />
          </mesh>
          <pointLight color="#ffaa00" intensity={0.6} distance={4} />
        </group>
      ))}

      {/* Rotating dish */}
      <group ref={dishRef} position={[0, 4.5, 0]}>
        <mesh rotation={[Math.PI * 0.25, 0, 0]}>
          <coneGeometry args={[0.8, 0.4, 16, 1, true]} />
          <meshStandardMaterial
            color="#2a2a4a"
            emissive="#ffaa00"
            emissiveIntensity={0.6}
            side={THREE.DoubleSide}
            metalness={0.8}
          />
        </mesh>
        <pointLight color="#ffaa00" intensity={1.5} distance={8} />
      </group>

      {/* Beacon on top */}
      <Float speed={3} floatIntensity={0.2}>
        <mesh position={[0, 5.2, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial color="#ffaa00" toneMapped={false} />
        </mesh>
        <pointLight
          position={[0, 5.2, 0]}
          color="#ffaa00"
          intensity={3}
          distance={18}
        />
      </Float>

      {/* Compact contact card */}
      <Html transform position={[-2.5, 2.5, 2]} distanceFactor={8}>
        <div
          style={{
            width: "130px",
            padding: "10px 12px",
            background: "rgba(0,0,0,0.8)",
            border: "1px solid rgba(255,170,0,0.2)",
            borderRadius: "6px",
            color: "#e0e0ff",
            fontFamily: "'Courier New', monospace",
            cursor: "pointer",
          }}
          onClick={() => openPlatformDetail("contact")}
        >
          <div
            style={{ color: "#ffaa00", fontSize: "11px", fontWeight: "bold" }}
          >
            {"// CONTACT"}
          </div>
          <div style={{ marginTop: "6px", fontSize: "9px", lineHeight: 1.8 }}>
            <div style={{ color: "#00f0ff", opacity: 0.7 }}>&gt; email</div>
            <div style={{ color: "#00ff88", opacity: 0.7 }}>&gt; github</div>
            <div style={{ color: "#ff00ff", opacity: 0.7 }}>&gt; linkedin</div>
          </div>
        </div>
      </Html>
    </group>
  );
}
