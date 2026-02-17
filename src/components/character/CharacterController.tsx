import Ecctrl from "ecctrl";
import { Character } from "./Character.tsx";
import { CHARACTER_SPAWN } from "../../utils/positions.ts";

export function CharacterController() {
  return (
    <Ecctrl
      position={CHARACTER_SPAWN.toArray() as [number, number, number]}
      maxVelLimit={5}
      jumpVel={4}
      capsuleHalfHeight={0.35}
      capsuleRadius={0.3}
      camInitDir={{ x: 0, y: 0 }}
      camInitDis={-15}
      camMinDis={-10}
      camMaxDis={-25}
      camFollowMult={3}
      turnVelMultiplier={0.5}
      turnSpeed={10}
      mode="CameraBasedMovement"
    >
      <Character />
    </Ecctrl>
  );
}
