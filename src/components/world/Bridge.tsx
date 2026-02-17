import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
import * as THREE from "three";

interface BridgeProps {
  readonly from: THREE.Vector3;
  readonly to: THREE.Vector3;
  readonly color?: string;
  readonly width?: number;
}

export function Bridge({ from, to, color = "#00f0ff", width = 2 }: BridgeProps) {
  const { position, rotation, length } = useMemo(() => {
    const midpoint = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
    const direction = new THREE.Vector3().subVectors(to, from);
    const bridgeLength = direction.length();
    const angle = Math.atan2(direction.x, direction.z);

    return {
      position: midpoint,
      rotation: [0, angle, 0] as const,
      length: bridgeLength,
    };
  }, [from, to]);

  return (
    <RigidBody type="fixed" position={position.toArray() as [number, number, number]} rotation={[...rotation]}>
      <mesh receiveShadow>
        <boxGeometry args={[width, 0.15, length]} />
        <meshStandardMaterial
          color="#050510"
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-width / 2, 0.1, 0]}>
        <boxGeometry args={[0.06, 0.06, length]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh position={[width / 2, 0.1, 0]}>
        <boxGeometry args={[0.06, 0.06, length]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </RigidBody>
  );
}
