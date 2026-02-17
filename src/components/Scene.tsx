import { Physics } from "@react-three/rapier";
import { SpaceBackground } from "./environment/SpaceBackground.tsx";
import { AmbientParticles } from "./environment/AmbientParticles.tsx";
import { Lighting } from "./environment/Lighting.tsx";
import { PostProcessing } from "./environment/PostProcessing.tsx";
import { WorldLayout } from "./world/WorldLayout.tsx";
import { CharacterController } from "./character/CharacterController.tsx";
import type { QualitySettings } from "../config/quality.ts";

interface SceneProps {
  readonly quality: QualitySettings;
}

export function Scene({ quality }: SceneProps) {
  return (
    <>
      <SpaceBackground />
      <AmbientParticles count={quality.particleCount} />
      <Lighting />
      <PostProcessing
        bloomEnabled={quality.bloomEnabled}
        chromaticAberration={quality.chromaticAberration}
      />
      <fog attach="fog" args={["#000010", 30, 120]} />
      <Physics gravity={[0, -9.81, 0]}>
        <WorldLayout />
        <CharacterController />
      </Physics>
    </>
  );
}
