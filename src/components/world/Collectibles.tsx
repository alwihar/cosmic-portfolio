import { Collectible } from "./Collectible";

const ORB_PLACEMENTS: readonly {
  readonly id: string;
  readonly position: [number, number, number];
  readonly color: string;
}[] = [
  { id: "orb-hub-1", position: [3, 2, 3], color: "#00f0ff" },
  { id: "orb-about-1", position: [22, 2, -23], color: "#8b5cf6" },
  { id: "orb-projects-1", position: [-13, 2.5, -48], color: "#ff00ff" },
  { id: "orb-skills-1", position: [30, 2, -53], color: "#00ff88" },
  { id: "orb-exp-1", position: [7, 2, -78], color: "#ff6b6b" },
  { id: "orb-contact-1", position: [3, 2, -103], color: "#ffaa00" },
  { id: "orb-bridge-1", position: [10, 1.5, -12], color: "#6040ff" },
  { id: "orb-bridge-2", position: [6, 1.5, -68], color: "#ff4488" },
  { id: "orb-hidden-1", position: [-6, 1.5, 6], color: "#ffffff" },
  { id: "orb-hidden-2", position: [-38, 2, -12], color: "#4488ff" },
  { id: "orb-hidden-3", position: [35, 1.5, -60], color: "#00ffcc" },
  { id: "orb-secret-1", position: [-42, 2.5, -6], color: "#ff4400" },
] as const;

export function Collectibles() {
  return (
    <>
      {ORB_PLACEMENTS.map((orb) => (
        <Collectible key={orb.id} id={orb.id} position={orb.position} color={orb.color} />
      ))}
    </>
  );
}
