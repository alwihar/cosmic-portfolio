import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CharacterMovementState } from "../../hooks/useCharacterState";

const TRAIL_LENGTH = 24;
const SPAWN_INTERVAL = 0.04;
const PARTICLE_SIZE = 0.06;

interface TrailProps {
  readonly stateRef: React.RefObject<CharacterMovementState>;
  readonly color?: string;
}

const _dummy = new THREE.Object3D();

export function CharacterTrail({ stateRef, color = "#00f0ff" }: TrailProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const positions = useRef<THREE.Vector3[]>(
    Array.from({ length: TRAIL_LENGTH }, () => new THREE.Vector3(0, -100, 0)),
  );
  const head = useRef(0);
  const timer = useRef(0);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.7,
        toneMapped: false,
        depthWrite: false,
      }),
    [color],
  );

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    const state = stateRef.current;
    if (!mesh || !state) return;

    timer.current += delta;

    if (state.isMoving && state.speed > 1 && timer.current >= SPAWN_INTERVAL) {
      timer.current = 0;
      positions.current[head.current].copy(state.position);
      positions.current[head.current].y -= 0.3;
      head.current = (head.current + 1) % TRAIL_LENGTH;
    }

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const age =
        (TRAIL_LENGTH - ((i - head.current + TRAIL_LENGTH) % TRAIL_LENGTH)) /
        TRAIL_LENGTH;
      const scale = age * PARTICLE_SIZE * (state.isDashing ? 2.5 : 1);

      _dummy.position.copy(positions.current[i]);
      _dummy.scale.setScalar(Math.max(scale, 0.001));
      _dummy.updateMatrix();
      mesh.setMatrixAt(i, _dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, TRAIL_LENGTH]}
      material={material}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 6, 6]} />
    </instancedMesh>
  );
}
