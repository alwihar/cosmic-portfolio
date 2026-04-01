import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Platform, type PlatformVariant } from "./Platform.tsx";
import { Bridge } from "./Bridge.tsx";
import { LandingPad } from "../platforms/LandingPad.tsx";
import { AboutPlatform } from "../platforms/AboutPlatform.tsx";
import { HoloGallery } from "../platforms/HoloGallery.tsx";
import { TechLab } from "../platforms/TechLab.tsx";
import { ExperiencePlatform } from "../platforms/ExperiencePlatform.tsx";
import { CommsTower } from "../platforms/CommsTower.tsx";
import { Observatory } from "../platforms/Observatory.tsx";
import { HoloLabel } from "../ui/HoloLabel.tsx";
import { SecretRoom } from "./SecretRoom";
import { Collectibles } from "./Collectibles";
import {
  PLATFORM_POSITIONS,
  BRIDGE_CONNECTIONS,
  type PlatformKey,
} from "../../utils/positions.ts";
import { useGameStore } from "../../store/gameStore";

const PLATFORM_CONFIG: Record<
  string,
  {
    size: [number, number, number];
    color: string;
    label: string;
    variant: PlatformVariant;
  }
> = {
  landing: {
    size: [14, 0.5, 14],
    color: "#0088aa",
    label: "HUB",
    variant: "octagon",
  },
  about: {
    size: [12, 0.5, 10],
    color: "#8b5cf6",
    label: "ABOUT",
    variant: "hex",
  },
  projects: {
    size: [16, 0.5, 12],
    color: "#ff00ff",
    label: "PROJECTS",
    variant: "tiered",
  },
  skills: {
    size: [16, 0.5, 14],
    color: "#00995a",
    label: "SKILLS",
    variant: "circle",
  },
  experience: {
    size: [14, 0.5, 10],
    color: "#ff6b6b",
    label: "EXPERIENCE",
    variant: "dodecagon",
  },
  contact: {
    size: [12, 0.5, 10],
    color: "#ffaa00",
    label: "CONTACT",
    variant: "diamond",
  },
  observatory: {
    size: [10, 0.5, 10],
    color: "#4488ff",
    label: "OBSERVATORY",
    variant: "dome",
  },
};

const BRIDGE_COLORS: Record<string, string> = {
  "landing-about": "#6040ff",
  "about-projects": "#cc00cc",
  "about-skills": "#00cc88",
  "projects-experience": "#ff4488",
  "skills-experience": "#44cc88",
  "experience-contact": "#ffaa00",
  "landing-observatory": "#4488ff",
  "observatory-projects": "#6644cc",
};

// --- Component ---

export function WorldLayout() {
  return (
    <>
      {/* Safety floor — last-resort catch */}
      <RigidBody type="fixed" position={[0, -1, -40]} colliders={false}>
        <CuboidCollider args={[100, 0.25, 100]} />
      </RigidBody>

      {/* Platform edge barriers removed — open world design */}

      {/* Platforms */}
      {Object.entries(PLATFORM_CONFIG).map(([key, config]) => (
        <Platform
          key={key}
          position={PLATFORM_POSITIONS[key as PlatformKey]}
          size={config.size}
          color={config.color}
          variant={config.variant}
        />
      ))}

      {/* Bridges */}
      {BRIDGE_CONNECTIONS.map(({ from, to }) => (
        <Bridge
          key={`${from}-${to}`}
          from={PLATFORM_POSITIONS[from]}
          to={PLATFORM_POSITIONS[to]}
          color={BRIDGE_COLORS[`${from}-${to}`] ?? "#4040ff"}
          fromSize={PLATFORM_CONFIG[from].size}
          toSize={PLATFORM_CONFIG[to].size}
        />
      ))}

      {/* Platform visit sensors */}
      {Object.keys(PLATFORM_CONFIG).map((key) => {
        const pos = PLATFORM_POSITIONS[key as PlatformKey];
        const config = PLATFORM_CONFIG[key];
        return (
          <RigidBody
            key={`sensor-${key}`}
            type="fixed"
            position={[pos.x, pos.y + 1, pos.z]}
            sensor
          >
            <CuboidCollider
              args={[config.size[0] / 2, 2, config.size[2] / 2]}
              onIntersectionEnter={() => {
                const store = useGameStore.getState();
                store.visitPlatform(key);
                if (store.visitedPlatforms.size === 1)
                  store.unlockAchievement("first-steps");
                if (store.visitedPlatforms.size >= 7)
                  store.unlockAchievement("explorer");
              }}
            />
          </RigidBody>
        );
      })}

      {/* Platform content */}
      <LandingPad />
      <AboutPlatform />
      <HoloGallery />
      <TechLab />
      <ExperiencePlatform />
      <CommsTower />
      <Observatory />
      <SecretRoom />

      {/* Secret passage to hidden room */}
      <RigidBody type="fixed">
        <mesh position={[-47.5, -0.25, -10]}>
          <boxGeometry args={[15, 0.15, 3]} />
          <meshStandardMaterial
            color="#050510"
            emissive="#4400ff"
            emissiveIntensity={0.05}
          />
        </mesh>
      </RigidBody>

      {/* Collectibles */}
      <Collectibles />

      {/* Labels */}
      {Object.entries(PLATFORM_CONFIG).map(([key, config]) => {
        const pos = PLATFORM_POSITIONS[key as PlatformKey];
        return (
          <HoloLabel
            key={key}
            position={[pos.x, pos.y + 7, pos.z]}
            text={config.label}
            color={config.color}
          />
        );
      })}
    </>
  );
}
