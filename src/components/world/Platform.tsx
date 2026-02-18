import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
import * as THREE from "three";
import {
  neonEdgeVertexShader,
  neonEdgeFragmentShader,
} from "../../shaders/neonGlow.ts";

export type PlatformVariant =
  | "octagon"
  | "hex"
  | "tiered"
  | "circle"
  | "dodecagon"
  | "diamond"
  | "dome";

interface PlatformProps {
  readonly position: THREE.Vector3;
  readonly size?: [number, number, number];
  readonly color?: string;
  readonly variant?: PlatformVariant;
}

interface VisualProps {
  readonly w: number;
  readonly h: number;
  readonly d: number;
  readonly color: string;
}

/* Reusable neon edge shader material */
function NeonShader({ color }: { readonly color: string }) {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: 2.0 },
    }),
    [color],
  );
  return (
    <shaderMaterial
      vertexShader={neonEdgeVertexShader}
      fragmentShader={neonEdgeFragmentShader}
      uniforms={uniforms}
    />
  );
}

/* Glowing edge ring for cylindrical shapes */
function EdgeRing({
  radius,
  color,
  segments,
  y = 0,
}: {
  readonly radius: number;
  readonly color: string;
  readonly segments: number;
  readonly y?: number;
}) {
  return (
    <mesh position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.04, 4, segments]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

/* ─── Octagon (Hub/Landing) ─── */
function OctagonPlatform({ w, h, d, color }: VisualProps) {
  const r = Math.min(w, d) / 2;
  return (
    <group>
      <mesh receiveShadow>
        <cylinderGeometry args={[r, r, h, 8]} />
        <NeonShader color={color} />
      </mesh>
      <EdgeRing radius={r} color={color} segments={8} y={h / 2 + 0.02} />
      {/* Landing pad concentric rings */}
      <mesh position={[0, h / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.7, 32]} />
        <meshBasicMaterial
          color={color}
          toneMapped={false}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, h / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.35, 32]} />
        <meshBasicMaterial
          color={color}
          toneMapped={false}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Cross-hair lines on surface */}
      {[0, Math.PI / 2].map((rot) => (
        <mesh
          key={rot}
          position={[0, h / 2 + 0.01, 0]}
          rotation={[-Math.PI / 2, 0, rot]}
        >
          <planeGeometry args={[r * 1.8, 0.03]} />
          <meshBasicMaterial
            color={color}
            toneMapped={false}
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Hexagon (About) ─── */
function HexPlatform({ w, h, color }: VisualProps) {
  const r = w / 2;
  return (
    <group>
      <mesh receiveShadow>
        <cylinderGeometry args={[r, r * 1.04, h, 6]} />
        <NeonShader color={color} />
      </mesh>
      <EdgeRing radius={r} color={color} segments={6} y={h / 2 + 0.02} />
      {/* Crystal spires at vertices */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * (r - 0.3),
              h / 2 + 0.4,
              Math.sin(angle) * (r - 0.3),
            ]}
          >
            <coneGeometry args={[0.12, 0.8, 4]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              transparent
              opacity={0.6}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─── Tiered / Stepped (Projects) ─── */
function TieredPlatform({ w, h, d, color }: VisualProps) {
  const r = Math.min(w, d) / 2;
  // Three concentric decagon tiers sharing the same top, extending deeper below
  const tiers = [
    { radius: r, th: h, ty: 0 },
    { radius: r * 0.72, th: h + 0.5, ty: -0.25 },
    { radius: r * 0.45, th: h + 1.0, ty: -0.5 },
  ];
  return (
    <group>
      {tiers.map((tier, i) => (
        <mesh key={i} position={[0, tier.ty, 0]} receiveShadow>
          <cylinderGeometry args={[tier.radius, tier.radius, tier.th, 10]} />
          <NeonShader color={color} />
        </mesh>
      ))}
      <EdgeRing radius={r} color={color} segments={10} y={h / 2 + 0.02} />
      {/* Inner ring accent */}
      <mesh position={[0, h / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[r * 0.7, r * 0.73, 10]} />
        <meshBasicMaterial
          color={color}
          toneMapped={false}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ─── Circular Arena (Skills) ─── */
function CirclePlatform({ w, h, d, color }: VisualProps) {
  const r = Math.min(w, d) / 2;
  return (
    <group>
      <mesh receiveShadow>
        <cylinderGeometry args={[r, r, h, 32]} />
        <NeonShader color={color} />
      </mesh>
      <EdgeRing radius={r} color={color} segments={32} y={h / 2 + 0.02} />
      {/* Inner concentric ring */}
      <mesh position={[0, h / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[r * 0.45, r * 0.5, 32]} />
        <meshBasicMaterial
          color={color}
          toneMapped={false}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Outer subtle ring */}
      <mesh position={[0, h / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[r * 0.8, r * 0.83, 32]} />
        <meshBasicMaterial
          color={color}
          toneMapped={false}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ─── Dodecagon (Experience) ─── */
function DodecagonPlatform({ w, h, d, color }: VisualProps) {
  const r = Math.min(w, d) / 2;
  return (
    <group>
      <mesh receiveShadow>
        <cylinderGeometry args={[r, r, h, 12]} />
        <NeonShader color={color} />
      </mesh>
      <EdgeRing radius={r} color={color} segments={12} y={h / 2 + 0.02} />
      {/* Timeline ring */}
      <mesh position={[0, h / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[r * 0.55, r * 0.62, 12]} />
        <meshBasicMaterial
          color={color}
          toneMapped={false}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Vertex marker dots */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * (r - 0.15),
              h / 2 + 0.03,
              Math.sin(angle) * (r - 0.15),
            ]}
          >
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshBasicMaterial
              color={color}
              toneMapped={false}
              transparent
              opacity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─── Diamond (Contact) ─── */
function DiamondPlatform({ w, h, d, color }: VisualProps) {
  const r = (Math.max(w, d) / 2) * 0.85;
  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      <mesh receiveShadow>
        <cylinderGeometry args={[r, r * 0.92, h, 4]} />
        <NeonShader color={color} />
      </mesh>
      <EdgeRing radius={r} color={color} segments={4} y={h / 2 + 0.02} />
      {/* Glowing antenna nubs at each point */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * (r * 0.85),
              h / 2 + 0.25,
              Math.sin(angle) * (r * 0.85),
            ]}
          >
            <cylinderGeometry args={[0.04, 0.08, 0.5, 4]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.8}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─── Dome (Observatory) ─── */
function DomePlatform({ w, h, d, color }: VisualProps) {
  const r = Math.min(w, d) / 2;
  return (
    <group>
      <mesh receiveShadow>
        <cylinderGeometry args={[r, r, h, 32]} />
        <NeonShader color={color} />
      </mesh>
      <EdgeRing radius={r} color={color} segments={32} y={h / 2 + 0.02} />
      {/* Dome bubble at center */}
      <mesh position={[0, h / 2 + 0.5, 0]}>
        <sphereGeometry args={[1.8, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#1a1a3e"
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.35}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Ring around dome */}
      <EdgeRing radius={1.8} color={color} segments={32} y={h / 2 + 0.02} />
    </group>
  );
}

/* ─── Main Platform Component ─── */
export function Platform({
  position,
  size = [12, 0.5, 12],
  color = "#00f0ff",
  variant = "octagon",
}: PlatformProps) {
  const [w, h, d] = size;
  const props: VisualProps = { w, h, d, color };

  return (
    <RigidBody
      type="fixed"
      position={position.toArray() as [number, number, number]}
      colliders={false}
    >
      <CuboidCollider args={[w / 2, h / 2, d / 2]} />
      {variant === "octagon" && <OctagonPlatform {...props} />}
      {variant === "hex" && <HexPlatform {...props} />}
      {variant === "tiered" && <TieredPlatform {...props} />}
      {variant === "circle" && <CirclePlatform {...props} />}
      {variant === "dodecagon" && <DodecagonPlatform {...props} />}
      {variant === "diamond" && <DiamondPlatform {...props} />}
      {variant === "dome" && <DomePlatform {...props} />}
    </RigidBody>
  );
}
