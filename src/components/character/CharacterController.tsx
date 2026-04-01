import { useRef, useEffect, useCallback, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Ecctrl, { type CustomEcctrlRigidBody } from "ecctrl";
import * as THREE from "three";
import { Character } from "./Character.tsx";
import { CHARACTER_SPAWN } from "../../utils/positions.ts";
import { subscribeTeleport } from "../../utils/teleport.ts";
import {
  useCharacterState,
  type CharacterMovementState,
} from "../../hooks/useCharacterState.ts";
import { useGameStore } from "../../store/gameStore.ts";
import { playSfx } from "../../audio/sfxManager.ts";

const DEATH_Y = -3;
const BASE_VEL_LIMIT = 8;
const DASH_MULTIPLIER = 2.5;
const DASH_DURATION = 0.3;
const DASH_COOLDOWN = 1.5;
const SPAWN: [number, number, number] = [
  CHARACTER_SPAWN.x,
  CHARACTER_SPAWN.y,
  CHARACTER_SPAWN.z,
];

interface CharacterControllerProps {
  readonly variant?: string;
  readonly movementStateRef?: React.MutableRefObject<CharacterMovementState>;
  readonly onDash?: (position: THREE.Vector3) => void;
}

export function CharacterController({
  variant,
  movementStateRef,
  onDash,
}: CharacterControllerProps) {
  const ecctrlRef = useRef<CustomEcctrlRigidBody>(null);
  const charGroupRef = useRef<THREE.Group>(null);
  const [velLimit, setVelLimit] = useState(BASE_VEL_LIMIT);

  const dashCooldownRef = useRef(0);
  const dashTimerRef = useRef(0);
  const isDashingRef = useRef(false);
  const shiftHeldRef = useRef(false);
  const spaceDownRef = useRef(false);
  const wasAirborneRef = useRef(false);
  const lastSafePos = useRef<[number, number, number]>(SPAWN);
  const safePosCooldown = useRef(0);

  const { state: internalState, setDashing } = useCharacterState(charGroupRef);

  // Sync internal state to the external ref every frame
  useFrame(() => {
    if (movementStateRef) {
      movementStateRef.current = internalState.current;
    }

    // Landing detection
    const ms = internalState.current;
    if (ms.wasAirborne && !wasAirborneRef.current) {
      playSfx("land");
    }
    wasAirborneRef.current = ms.wasAirborne;

    // Dash timer
    if (dashCooldownRef.current > 0) {
      dashCooldownRef.current -= delta;
    }
    if (isDashingRef.current) {
      dashTimerRef.current -= delta;
      if (dashTimerRef.current <= 0) {
        isDashingRef.current = false;
        setDashing(false);
        setVelLimit(BASE_VEL_LIMIT);
      }
    }
  });

  // Shift (dash) and Space (jump) key listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift" && !shiftHeldRef.current) {
        shiftHeldRef.current = true;
        const isMoving = internalState.current.isMoving;
        if (isMoving && dashCooldownRef.current <= 0 && !isDashingRef.current) {
          isDashingRef.current = true;
          dashTimerRef.current = DASH_DURATION;
          dashCooldownRef.current = DASH_COOLDOWN;
          setDashing(true);
          setVelLimit(BASE_VEL_LIMIT * DASH_MULTIPLIER);

          const store = useGameStore.getState();
          store.incrementDash();
          if (store.dashCount + 1 >= 10) {
            store.unlockAchievement("speed-demon");
          }

          playSfx("dash");

          if (onDash) {
            onDash(internalState.current.position.clone());
          }
        }
      }
      if (e.code === "Space" && !spaceDownRef.current) {
        spaceDownRef.current = true;
        const store = useGameStore.getState();
        store.incrementJumps();
        if (store.totalJumps + 1 >= 50) {
          store.unlockAchievement("sky-walker");
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        shiftHeldRef.current = false;
      }
      if (e.code === "Space") {
        spaceDownRef.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [internalState, setDashing, onDash]);

  const teleportTo = useCallback((position: [number, number, number]) => {
    const body = ecctrlRef.current?.group;
    if (body) {
      body.setTranslation(
        { x: position[0], y: position[1], z: position[2] },
        true,
      );
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);
      body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  }, []);

  useEffect(() => {
    return subscribeTeleport(teleportTo);
  }, [teleportTo]);

  useFrame((_, delta) => {
    const body = ecctrlRef.current?.group;
    if (body) {
      const pos = body.translation();
      // Save last safe position every 0.5s when on solid ground
      safePosCooldown.current -= delta;
      if (pos.y > -0.5 && pos.y < 5 && safePosCooldown.current <= 0) {
        lastSafePos.current = [pos.x, pos.y + 2, pos.z];
        safePosCooldown.current = 0.5;
      }
      if (pos.y < DEATH_Y) {
        teleportTo(lastSafePos.current);
      }
    }
  });

  return (
    <Ecctrl
      ref={ecctrlRef}
      position={SPAWN}
      maxVelLimit={velLimit}
      jumpVel={4.5}
      capsuleHalfHeight={0.35}
      capsuleRadius={0.3}
      camInitDir={{ x: 0, y: Math.PI }}
      camInitDis={-15}
      camMinDis={-10}
      camMaxDis={-25}
      camFollowMult={3}
      turnVelMultiplier={0.5}
      turnSpeed={10}
      mode="CameraBasedMovement"
      camListenerTarget="document"
    >
      <group ref={charGroupRef}>
        <Character variant={variant} />
      </group>
    </Ecctrl>
  );
}
