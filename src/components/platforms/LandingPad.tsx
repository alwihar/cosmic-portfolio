import { Text3D, Center, Float, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { profile } from "../../data/profile";
import { PLATFORM_POSITIONS } from "../../utils/positions";
import { openPlatformDetail } from "../../utils/platformDetail";

export function LandingPad() {
  const pos = PLATFORM_POSITIONS.landing;
  const radarRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (radarRef.current) {
      radarRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group position={[pos.x, pos.y + 0.5, pos.z]}>
      {/* Rotating holographic radar compass */}
      <group ref={radarRef} position={[0, 6.5, 0]}>
        {/* Outer ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.03, 8, 32]} />
          <meshBasicMaterial
            color="#00f0ff"
            toneMapped={false}
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Inner ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.02, 8, 32]} />
          <meshBasicMaterial
            color="#00f0ff"
            toneMapped={false}
            transparent
            opacity={0.3}
          />
        </mesh>
        {/* Compass crosshairs */}
        {[0, Math.PI / 2, Math.PI / 4, -Math.PI / 4].map((angle, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, angle]}>
            <planeGeometry args={[4, 0.02]} />
            <meshBasicMaterial
              color="#00f0ff"
              toneMapped={false}
              transparent
              opacity={i < 2 ? 0.35 : 0.12}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
        {/* Sweep arm (brighter) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2, 0.05]} />
          <meshBasicMaterial
            color="#00f0ff"
            toneMapped={false}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Center beacon */}
        <mesh>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshBasicMaterial color="#00f0ff" toneMapped={false} />
        </mesh>
        <pointLight color="#00f0ff" intensity={1} distance={8} />
      </group>

      {/* Name */}
      <Float speed={1.5} floatIntensity={0.5}>
        <Center position={[0, 4, 0]}>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={1.5}
            height={0.3}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.01}
          >
            {profile.name}
            <meshBasicMaterial color="#00f0ff" toneMapped={false} />
          </Text3D>
        </Center>
      </Float>

      {/* Title */}
      <Float speed={1.5} floatIntensity={0.3}>
        <Center position={[0, 2.5, 0]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.45}
            height={0.1}
          >
            {profile.title}
            <meshBasicMaterial color="#ff00ff" toneMapped={false} />
          </Text3D>
        </Center>
      </Float>

      {/* Subtitle */}
      <Float speed={1} floatIntensity={0.2}>
        <Center position={[0, 1.5, 0]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.2}
            height={0.05}
          >
            {"Explore the station to learn more"}
            <meshBasicMaterial color="#6060a0" toneMapped={false} />
          </Text3D>
        </Center>
      </Float>

      {/* Interactive Terminal */}
      <Html transform position={[4, 2, -3]} distanceFactor={8}>
        <div
          style={{
            width: "120px",
            padding: "10px 12px",
            background: "rgba(0,0,0,0.85)",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: "6px",
            cursor: "pointer",
            fontFamily: "'Courier New', monospace",
          }}
          onClick={() => openPlatformDetail("terminal")}
        >
          <div
            style={{ color: "#00ff88", fontSize: "10px", fontWeight: "bold" }}
          >
            {"// TERMINAL"}
          </div>
          <div style={{ color: "#808090", fontSize: "9px", marginTop: "4px" }}>
            {">"} type 'help'
            <br />
            {">"} _
          </div>
        </div>
      </Html>
    </group>
  );
}
