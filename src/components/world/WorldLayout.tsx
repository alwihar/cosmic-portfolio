import { Platform } from "./Platform.tsx";
import { Bridge } from "./Bridge.tsx";
import { LandingPad } from "../platforms/LandingPad.tsx";
import {
  PLATFORM_POSITIONS,
  BRIDGE_CONNECTIONS,
} from "../../utils/positions.ts";

export function WorldLayout() {
  return (
    <>
      <Platform
        position={PLATFORM_POSITIONS.landing}
        size={[14, 0.5, 14]}
        color="#00f0ff"
      />
      <Platform
        position={PLATFORM_POSITIONS.projects}
        size={[16, 0.5, 12]}
        color="#ff00ff"
      />
      <Platform
        position={PLATFORM_POSITIONS.skills}
        size={[14, 0.5, 12]}
        color="#00ff88"
      />
      <Platform
        position={PLATFORM_POSITIONS.contact}
        size={[12, 0.5, 10]}
        color="#ffaa00"
      />

      {BRIDGE_CONNECTIONS.map(({ from, to }) => (
        <Bridge
          key={`${from}-${to}`}
          from={PLATFORM_POSITIONS[from]}
          to={PLATFORM_POSITIONS[to]}
          color="#4040ff"
        />
      ))}

      <LandingPad />
    </>
  );
}
