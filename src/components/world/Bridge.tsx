import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  energyBridgeVertex,
  energyBridgeFragment,
} from "../../shaders/energyBridge";

const WALL_HEIGHT = 3;
const WALL_THICKNESS = 0.5;
const SURFACE_Y_OFFSET = 0.175;
const WALL_MARGIN = -0.5;
/** Extra length added to bridge collider on each end to prevent fall-through gaps */
const COLLIDER_OVERLAP = 2.0;
/** Reduce visual trim so bridge surface extends slightly into the platform */
const VISUAL_OVERLAP = 0.6;

interface BridgeProps {
  readonly from: THREE.Vector3;
  readonly to: THREE.Vector3;
  readonly color?: string;
  readonly width?: number;
  readonly fromSize: [number, number, number];
  readonly toSize: [number, number, number];
}

function computeEdgeDist(
  origin: THREE.Vector3,
  target: THREE.Vector3,
  size: [number, number, number],
): number {
  const dx = target.x - origin.x;
  const dz = target.z - origin.z;
  const halfW = size[0] / 2;
  const halfD = size[2] / 2;
  const tX = halfW / Math.abs(dx || 0.0001);
  const tZ = halfD / Math.abs(dz || 0.0001);
  const t = Math.min(tX, tZ);
  return t * Math.sqrt(dx * dx + dz * dz);
}

/* ── Glowing edge rail ── */
function EdgeRail({
  side,
  width,
  length,
  color,
}: {
  side: "left" | "right";
  width: number;
  length: number;
  color: string;
}) {
  const x = side === "left" ? -width / 2 + 0.06 : width / 2 - 0.06;
  return (
    <group position={[x, 0.09, 0]}>
      {/* Rail body */}
      <mesh>
        <boxGeometry args={[0.08, 0.06, length]} />
        <meshBasicMaterial
          color={color}
          toneMapped={false}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Rail glow */}
      <mesh>
        <boxGeometry args={[0.2, 0.02, length]} />
        <meshBasicMaterial
          color={color}
          toneMapped={false}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

/* ── Cross markers at intervals ── */
function CrossMarkers({
  width,
  length,
  color,
}: {
  width: number;
  length: number;
  color: string;
}) {
  const count = Math.max(1, Math.floor(length / 5));
  const spacing = length / (count + 1);
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const z = -length / 2 + (i + 1) * spacing;
        return (
          <group key={i} position={[0, 0.08, z]}>
            {/* Cross bar */}
            <mesh>
              <boxGeometry args={[width * 0.6, 0.015, 0.06]} />
              <meshBasicMaterial
                color={color}
                toneMapped={false}
                transparent
                opacity={0.25}
              />
            </mesh>
            {/* Node lights on each end */}
            <mesh position={[-width / 2 + 0.12, 0.03, 0]}>
              <sphereGeometry args={[0.06, 6, 6]} />
              <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
            <mesh position={[width / 2 - 0.12, 0.03, 0]}>
              <sphereGeometry args={[0.06, 6, 6]} />
              <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

/* ── Pulsing center strip ── */
function CenterStrip({
  length,
  color,
  pulseRef,
}: {
  length: number;
  color: string;
  pulseRef: React.RefObject<THREE.Mesh | null>;
}) {
  return (
    <mesh ref={pulseRef} position={[0, 0.078, 0]}>
      <boxGeometry args={[0.12, 0.01, length * 0.9]} />
      <meshBasicMaterial
        color={color}
        toneMapped={false}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

export function Bridge({
  from,
  to,
  color = "#00f0ff",
  width = 3,
  fromSize,
  toSize,
}: BridgeProps) {
  const pulseRef = useRef<THREE.Mesh>(null);

  const bridgeMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: energyBridgeVertex,
        fragmentShader: energyBridgeFragment,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uTime: { value: 0 },
          uIntensity: { value: 0.8 },
        },
        transparent: true,
        depthWrite: false,
      }),
    [color],
  );

  const {
    position,
    rotation,
    length,
    colliderLength,
    wallLength,
    wallOffsetZ,
    visualLength,
    visualOffsetZ,
  } = useMemo(() => {
    const midpoint = new THREE.Vector3()
      .addVectors(from, to)
      .multiplyScalar(0.5);
    midpoint.y += SURFACE_Y_OFFSET;
    const direction = new THREE.Vector3().subVectors(to, from);
    const bridgeLength = direction.length();
    const angle = Math.atan2(direction.x, direction.z);

    // Platform edge distances for trimming visuals
    const edgeFrom = computeEdgeDist(from, to, fromSize);
    const edgeTo = computeEdgeDist(to, from, toSize);

    // Decorative visuals trimmed to platform edges, with overlap to prevent
    // visible gaps at bridge-platform junctions
    const vLen = Math.max(
      0,
      bridgeLength - (edgeFrom - VISUAL_OVERLAP) - (edgeTo - VISUAL_OVERLAP),
    );
    const vOffset = (edgeFrom - edgeTo) / 2;

    // Wall trimming (extra margin so walls don't block platform movement)
    const trimFrom = edgeFrom + WALL_MARGIN;
    const trimTo = edgeTo + WALL_MARGIN;
    const wLen = Math.max(0, bridgeLength - trimFrom - trimTo);
    const wOffset = (trimFrom - trimTo) / 2;

    // Floor collider extends beyond center-to-center span to overlap
    // with platform colliders, preventing fall-through at seams
    const colliderLen = bridgeLength + COLLIDER_OVERLAP * 2;

    return {
      position: midpoint,
      rotation: [0, angle, 0] as const,
      length: bridgeLength,
      colliderLength: colliderLen,
      wallLength: wLen,
      wallOffsetZ: wOffset,
      visualLength: vLen,
      visualOffsetZ: vOffset,
    };
  }, [from, to, fromSize, toSize]);

  useFrame(({ clock }) => {
    bridgeMaterial.uniforms.uTime.value = clock.getElapsedTime();
    if (pulseRef.current) {
      const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.2 + Math.sin(clock.getElapsedTime() * 2) * 0.15;
    }
  });

  return (
    <RigidBody
      type="fixed"
      position={position.toArray() as [number, number, number]}
      rotation={[...rotation]}
      colliders={false}
    >
      {/* Main dark surface, lowered slightly to sit under platforms */}
      <mesh position={[0, -0.04, 0]} receiveShadow material={bridgeMaterial}>
        <boxGeometry args={[width, 0.15, length]} />
      </mesh>

      {/* Decorative elements — trimmed to only show between platforms */}
      <group position={[0, 0, visualOffsetZ]}>
        {/* Translucent top layer */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[width - 0.2, 0.01, visualLength]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.04}
            toneMapped={false}
          />
        </mesh>

        {/* Glowing edge rails */}
        <EdgeRail
          side="left"
          width={width}
          length={visualLength}
          color={color}
        />
        <EdgeRail
          side="right"
          width={width}
          length={visualLength}
          color={color}
        />

        {/* Pulsing center strip */}
        <CenterStrip length={visualLength} color={color} pulseRef={pulseRef} />

        {/* Cross markers with node lights */}
        <CrossMarkers width={width} length={visualLength} color={color} />
      </group>

      {/* Floor collider extends past platform edges to prevent fall-through */}
      <CuboidCollider args={[width / 2, 0.075, colliderLength / 2]} />

      {/* Side wall colliders */}
      {wallLength > 0 && (
        <>
          <CuboidCollider
            position={[-width / 2, WALL_HEIGHT / 2, wallOffsetZ]}
            args={[WALL_THICKNESS / 2, WALL_HEIGHT / 2, wallLength / 2]}
          />
          <CuboidCollider
            position={[width / 2, WALL_HEIGHT / 2, wallOffsetZ]}
            args={[WALL_THICKNESS / 2, WALL_HEIGHT / 2, wallLength / 2]}
          />
        </>
      )}

      {/* Corner blockers at each bridge-platform junction.
          These are wider colliders at each end to seal the diagonal gaps
          between the rotated bridge walls and axis-aligned platform walls. */}
      <CuboidCollider
        position={[-width / 2, WALL_HEIGHT / 2, -length / 2]}
        args={[WALL_THICKNESS, WALL_HEIGHT / 2, WALL_THICKNESS]}
      />
      <CuboidCollider
        position={[width / 2, WALL_HEIGHT / 2, -length / 2]}
        args={[WALL_THICKNESS, WALL_HEIGHT / 2, WALL_THICKNESS]}
      />
      <CuboidCollider
        position={[-width / 2, WALL_HEIGHT / 2, length / 2]}
        args={[WALL_THICKNESS, WALL_HEIGHT / 2, WALL_THICKNESS]}
      />
      <CuboidCollider
        position={[width / 2, WALL_HEIGHT / 2, length / 2]}
        args={[WALL_THICKNESS, WALL_HEIGHT / 2, WALL_THICKNESS]}
      />
    </RigidBody>
  );
}
