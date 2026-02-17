import { SpaceBackground } from "./environment/SpaceBackground";
import { Lighting } from "./environment/Lighting";

export function Scene() {
  return (
    <>
      <SpaceBackground />
      <Lighting />
      <fog attach="fog" args={["#000010", 30, 120]} />
    </>
  );
}
