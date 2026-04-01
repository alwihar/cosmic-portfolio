import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface CharacterMovementState {
  readonly isMoving: boolean;
  readonly isGrounded: boolean;
  readonly isDashing: boolean;
  readonly speed: number;
  readonly position: THREE.Vector3;
  readonly wasAirborne: boolean;
}

const _prevPos = new THREE.Vector3();
const _currPos = new THREE.Vector3();

export function useCharacterState(
  characterRef: React.RefObject<THREE.Group | null>,
) {
  const state = useRef<CharacterMovementState>({
    isMoving: false,
    isGrounded: true,
    isDashing: false,
    speed: 0,
    position: new THREE.Vector3(),
    wasAirborne: false,
  });

  const prevGrounded = useRef(true);
  const prevY = useRef(0);

  useFrame((_, delta) => {
    if (!characterRef.current) return;

    characterRef.current.getWorldPosition(_currPos);

    const dx = _currPos.x - _prevPos.x;
    const dz = _currPos.z - _prevPos.z;
    const horizontalSpeed =
      delta > 0 ? Math.sqrt(dx * dx + dz * dz) / delta : 0;

    const verticalDelta = Math.abs(_currPos.y - prevY.current);
    const isGrounded = verticalDelta < 0.01;
    const wasAirborne = !prevGrounded.current && isGrounded;

    state.current = {
      isMoving: horizontalSpeed > 0.5,
      isGrounded,
      isDashing: state.current.isDashing,
      speed: horizontalSpeed,
      position: _currPos.clone(),
      wasAirborne,
    };

    prevGrounded.current = isGrounded;
    prevY.current = _currPos.y;
    _prevPos.copy(_currPos);
  });

  const setDashing = useCallback((v: boolean) => {
    state.current = { ...state.current, isDashing: v };
  }, []);

  return { state, setDashing };
}
