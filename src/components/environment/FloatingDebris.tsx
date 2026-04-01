import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DEBRIS_COUNT = 40;
const _dummy = new THREE.Object3D();
const _axis = new THREE.Vector3();

interface DebrisItem {
  readonly orbitRadius: number;
  readonly orbitSpeed: number;
  readonly orbitOffset: number;
  readonly y: number;
  readonly scale: number;
  readonly rotAxis: THREE.Vector3;
  readonly rotSpeed: number;
}

export function FloatingDebris() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const items = useMemo<DebrisItem[]>(() =>
    Array.from({ length: DEBRIS_COUNT }, () => ({
      orbitRadius: 60 + Math.random() * 80,
      orbitSpeed: 0.01 + Math.random() * 0.02,
      orbitOffset: Math.random() * Math.PI * 2,
      y: (Math.random() - 0.5) * 40 - 20,
      scale: 0.3 + Math.random() * 1.2,
      rotAxis: new THREE.Vector3(
        Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5,
      ).normalize(),
      rotSpeed: 0.2 + Math.random() * 0.8,
    })),
  []);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < DEBRIS_COUNT; i++) {
      const item = items[i];
      const angle = t * item.orbitSpeed + item.orbitOffset;
      _dummy.position.set(
        Math.cos(angle) * item.orbitRadius,
        item.y + Math.sin(t * 0.3 + i) * 2,
        Math.sin(angle) * item.orbitRadius - 40,
      );
      _dummy.scale.setScalar(item.scale);
      _axis.copy(item.rotAxis);
      _dummy.quaternion.setFromAxisAngle(_axis, t * item.rotSpeed);
      _dummy.updateMatrix();
      mesh.setMatrixAt(i, _dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, DEBRIS_COUNT]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#1a1a2e"
        emissive="#2a2a4a"
        emissiveIntensity={0.3}
        roughness={0.9}
        metalness={0.1}
      />
    </instancedMesh>
  );
}
