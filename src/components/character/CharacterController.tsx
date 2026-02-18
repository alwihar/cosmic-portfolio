import { useRef, useEffect, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import Ecctrl, { type CustomEcctrlRigidBody } from "ecctrl";
import { Character } from "./Character.tsx";
import { CHARACTER_SPAWN } from "../../utils/positions.ts";
import { subscribeTeleport } from "../../utils/teleport.ts";

const DEATH_Y = -2;
const SPAWN: [number, number, number] = [
  CHARACTER_SPAWN.x,
  CHARACTER_SPAWN.y,
  CHARACTER_SPAWN.z,
];

interface CharacterControllerProps {
  readonly variant?: string;
}

export function CharacterController({ variant }: CharacterControllerProps) {
  const ecctrlRef = useRef<CustomEcctrlRigidBody>(null);

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

  useFrame(() => {
    const body = ecctrlRef.current?.group;
    if (body) {
      const pos = body.translation();
      if (pos.y < DEATH_Y) {
        teleportTo(SPAWN);
      }
    }
  });

  return (
    <Ecctrl
      ref={ecctrlRef}
      position={SPAWN}
      maxVelLimit={8}
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
      <Character variant={variant} />
    </Ecctrl>
  );
}
