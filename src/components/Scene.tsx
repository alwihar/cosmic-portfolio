import { useRef } from "react";
import { Physics } from "@react-three/rapier";
import * as THREE from "three";
import { SpaceBackground } from "./environment/SpaceBackground.tsx";
import { FloatingDebris } from "./environment/FloatingDebris.tsx";
import { AmbientParticles } from "./environment/AmbientParticles.tsx";
import { Lighting } from "./environment/Lighting.tsx";
import { PostProcessing } from "./environment/PostProcessing.tsx";
import { WorldLayout } from "./world/WorldLayout.tsx";
import { CharacterController } from "./character/CharacterController.tsx";
import { CharacterTrail } from "./character/CharacterTrail.tsx";
import { LandingEffect } from "./character/LandingEffect.tsx";
import { useDashBurst } from "./effects/DashBurst.tsx";
import type { QualitySettings } from "../config/quality.ts";
import type { CharacterMovementState } from "../hooks/useCharacterState.ts";

interface SceneProps {
  readonly quality: QualitySettings;
  readonly characterVariant?: string;
  readonly glitchActive?: boolean;
}

export function Scene({
  quality,
  characterVariant,
  glitchActive = false,
}: SceneProps) {
  const movementStateRef = useRef<CharacterMovementState>({
    isMoving: false,
    isGrounded: true,
    isDashing: false,
    speed: 0,
    position: new THREE.Vector3(),
    wasAirborne: false,
  });

  const { trigger: triggerDashBurst, node: dashBurstNode } = useDashBurst();

  return (
    <>
      <SpaceBackground />
      <FloatingDebris />
      <AmbientParticles count={quality.particleCount} />
      <Lighting />
      <PostProcessing
        bloomEnabled={quality.bloomEnabled}
        chromaticAberration={quality.chromaticAberration}
        glitchActive={glitchActive}
      />
      <fog attach="fog" args={["#000010", 50, 180]} />
      <Physics gravity={[0, -9.81, 0]}>
        <WorldLayout />
        <CharacterController
          variant={characterVariant}
          movementStateRef={movementStateRef}
          onDash={triggerDashBurst}
        />
      </Physics>
      <CharacterTrail stateRef={movementStateRef} />
      <LandingEffect stateRef={movementStateRef} />
      {dashBurstNode}
    </>
  );
}
