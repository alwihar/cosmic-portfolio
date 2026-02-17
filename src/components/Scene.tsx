import { Physics } from "@react-three/rapier";
import { SpaceBackground } from "./environment/SpaceBackground.tsx";
import { Lighting } from "./environment/Lighting.tsx";
import { PostProcessing } from "./environment/PostProcessing.tsx";
import { WorldLayout } from "./world/WorldLayout.tsx";

export function Scene() {
  return (
    <>
      <SpaceBackground />
      <Lighting />
      <PostProcessing />
      <fog attach="fog" args={["#000010", 30, 120]} />
      <Physics gravity={[0, -9.81, 0]}>
        <WorldLayout />
      </Physics>
    </>
  );
}
