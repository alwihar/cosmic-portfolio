import { RigidBody } from "@react-three/rapier";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { neonEdgeVertexShader, neonEdgeFragmentShader } from "../../shaders/neonGlow.ts";

interface PlatformProps {
  readonly position: THREE.Vector3;
  readonly size?: [number, number, number];
  readonly color?: string;
  readonly label?: string;
}

export function Platform({
  position,
  size = [12, 0.5, 12],
  color = "#00f0ff",
}: PlatformProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: 2.0 },
    }),
    [color]
  );

  return (
    <RigidBody type="fixed" position={position.toArray() as [number, number, number]}>
      <mesh ref={meshRef} receiveShadow>
        <boxGeometry args={size} />
        <shaderMaterial
          vertexShader={neonEdgeVertexShader}
          fragmentShader={neonEdgeFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <mesh position={[0, size[1] / 2 + 0.02, 0]}>
        <boxGeometry args={[size[0] + 0.1, 0.04, size[2] + 0.1]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </RigidBody>
  );
}
