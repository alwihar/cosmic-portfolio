import { SpaceBackground } from "./environment/SpaceBackground";
import { Lighting } from "./environment/Lighting";
import { PostProcessing } from "./environment/PostProcessing";

export function Scene() {
  return (
    <>
      <SpaceBackground />
      <Lighting />
      <PostProcessing />
      <fog attach="fog" args={["#000010", 30, 120]} />
    </>
  );
}
