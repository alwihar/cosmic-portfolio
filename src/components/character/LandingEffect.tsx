import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CharacterMovementState } from "../../hooks/useCharacterState";

const RING_COUNT = 16;
const RING_DURATION = 0.6;

const _dummy = new THREE.Object3D();

interface LandingEffectProps {
  readonly stateRef: React.RefObject<CharacterMovementState>;
}

export function LandingEffect({ stateRef }: LandingEffectProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const activeRef = useRef(false);
  const timerRef = useRef(RING_DURATION);
  const originRef = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const state = stateRef.current;
    const mesh = meshRef.current;
    if (!state || !mesh) return;

    if (state.wasAirborne && !activeRef.current) {
      activeRef.current = true;
      timerRef.current = 0;
      originRef.current.copy(state.position);
      originRef.current.y -= 0.5;
    }

    if (!activeRef.current) return;

    timerRef.current += delta;
    const t = timerRef.current / RING_DURATION;

    if (t >= 1) {
      activeRef.current = false;
      for (let i = 0; i < RING_COUNT; i++) {
        _dummy.position.set(0, -100, 0);
        _dummy.scale.setScalar(0.001);
        _dummy.updateMatrix();
        mesh.setMatrixAt(i, _dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      return;
    }

    const radius = t * 1.5;
    const scale = 0.08 * (1 - t);

    for (let i = 0; i < RING_COUNT; i++) {
      const angle = (i / RING_COUNT) * Math.PI * 2;
      _dummy.position.set(
        originRef.current.x + Math.cos(angle) * radius,
        originRef.current.y,
        originRef.current.z + Math.sin(angle) * radius,
      );
      _dummy.scale.setScalar(Math.max(scale, 0.001));
      _dummy.updateMatrix();
      mesh.setMatrixAt(i, _dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, RING_COUNT]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial
        color="#00f0ff"
        transparent
        opacity={0.5}
        toneMapped={false}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
