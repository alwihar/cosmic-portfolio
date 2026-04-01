import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BURST_COUNT = 20;
const BURST_DURATION = 0.4;

const _dummy = new THREE.Object3D();

export function useDashBurst() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const activeRef = useRef(false);
  const timerRef = useRef(BURST_DURATION);
  const velocities = useRef<THREE.Vector3[]>(
    Array.from({ length: BURST_COUNT }, () => new THREE.Vector3()),
  );
  const particlePositions = useRef<THREE.Vector3[]>(
    Array.from({ length: BURST_COUNT }, () => new THREE.Vector3(0, -100, 0)),
  );

  const trigger = useCallback((origin: THREE.Vector3) => {
    activeRef.current = true;
    timerRef.current = 0;
    for (let i = 0; i < BURST_COUNT; i++) {
      particlePositions.current[i].copy(origin);
      particlePositions.current[i].y -= 0.2;
      const angle = (i / BURST_COUNT) * Math.PI * 2;
      const speed = 2 + Math.random() * 3;
      velocities.current[i].set(
        Math.cos(angle) * speed,
        (Math.random() - 0.3) * 2,
        Math.sin(angle) * speed,
      );
    }
  }, []);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh || !activeRef.current) return;

    timerRef.current += delta;
    const t = timerRef.current / BURST_DURATION;

    if (t >= 1) {
      activeRef.current = false;
      for (let i = 0; i < BURST_COUNT; i++) {
        _dummy.position.set(0, -100, 0);
        _dummy.scale.setScalar(0.001);
        _dummy.updateMatrix();
        mesh.setMatrixAt(i, _dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      return;
    }

    for (let i = 0; i < BURST_COUNT; i++) {
      particlePositions.current[i].addScaledVector(velocities.current[i], delta);
      _dummy.position.copy(particlePositions.current[i]);
      _dummy.scale.setScalar(0.05 * (1 - t));
      _dummy.updateMatrix();
      mesh.setMatrixAt(i, _dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  const node = (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, BURST_COUNT]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial
        color="#ff00ff"
        transparent
        opacity={0.6}
        toneMapped={false}
        depthWrite={false}
      />
    </instancedMesh>
  );

  return { trigger, node };
}
