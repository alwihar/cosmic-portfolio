import { Html, Float } from "@react-three/drei";
import * as THREE from "three";

interface HoloPanelProps {
  readonly position: [number, number, number];
  readonly children: React.ReactNode;
  readonly color?: string;
  readonly width?: number;
}

export function HoloPanel({ position, children, color = "#00f0ff", width = 200 }: HoloPanelProps) {
  return (
    <Float speed={2} floatIntensity={0.3} rotationIntensity={0.1}>
      <group position={position}>
        <mesh>
          <planeGeometry args={[width / 80, width / 120]} />
          <meshBasicMaterial color={color} transparent opacity={0.05} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        <Html
          transform
          distanceFactor={8}
          style={{
            width: `${width}px`,
            padding: "16px",
            background: `linear-gradient(135deg, rgba(0,0,0,0.85), rgba(10,10,40,0.85))`,
            border: `1px solid ${color}40`,
            borderRadius: "8px",
            color: "#e0e0ff",
            fontFamily: "'Courier New', monospace",
            fontSize: "13px",
            backdropFilter: "blur(10px)",
            boxShadow: `0 0 20px ${color}20`,
            pointerEvents: "auto",
          }}
        >
          {children}
        </Html>
      </group>
    </Float>
  );
}
