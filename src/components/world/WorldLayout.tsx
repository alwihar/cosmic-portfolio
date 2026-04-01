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
import { PlatformForceField } from "../effects/PlatformForceField";
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

// --- Wall generation ---

interface WallSegment {
  readonly position: [number, number, number];
  readonly size: [number, number, number];
}

type Edge = "left" | "right" | "front" | "back";

function getExitEdge(
  dx: number,
  dz: number,
  halfW: number,
  halfD: number,
): Edge {
  const tX = halfW / Math.abs(dx || 0.0001);
  const tZ = halfD / Math.abs(dz || 0.0001);
  if (tX <= tZ) {
    return dx > 0 ? "right" : "left";
  }
  return dz > 0 ? "front" : "back";
}

function splitEdge(
  gaps: readonly number[],
  halfExtent: number,
): Array<{ start: number; end: number }> {
  const GAP_HALF = 1.5;
  if (gaps.length === 0) {
    return [{ start: -halfExtent, end: halfExtent }];
  }
  const sorted = [...gaps].sort((a, b) => a - b);
  const result: Array<{ start: number; end: number }> = [];
  let cursor = -halfExtent;
  for (const gap of sorted) {
    const gapStart = Math.max(gap - GAP_HALF, -halfExtent);
    const gapEnd = Math.min(gap + GAP_HALF, halfExtent);
    if (gapStart > cursor + 0.2) {
      result.push({ start: cursor, end: gapStart });
    }
    cursor = Math.max(cursor, gapEnd);
  }
  if (cursor < halfExtent - 0.2) {
    result.push({ start: cursor, end: halfExtent });
  }
  return result;
}

// Extra wall gaps not covered by bridge connections (e.g. secret passages)
const EXTRA_WALL_GAPS: Partial<
  Record<PlatformKey, Partial<Record<Edge, number[]>>>
> = {
  observatory: { left: [0] }, // gap at center of left wall for secret passage
};

function generateAllWalls(): readonly WallSegment[] {
  const WALL_H = 3;
  const WALL_T = 0.5;
  const walls: WallSegment[] = [];

  for (const [key, config] of Object.entries(PLATFORM_CONFIG)) {
    const pos = PLATFORM_POSITIONS[key as PlatformKey];
    const [w, h, d] = config.size;
    const halfW = w / 2;
    const halfD = d / 2;
    const wallY = pos.y + h / 2 + WALL_H / 2;

    const bridges = BRIDGE_CONNECTIONS.filter(
      (b) => b.from === key || b.to === key,
    );

    const gapsByEdge: Record<Edge, number[]> = {
      left: [],
      right: [],
      front: [],
      back: [],
    };

    for (const bridge of bridges) {
      const otherKey = bridge.from === key ? bridge.to : bridge.from;
      const otherPos = PLATFORM_POSITIONS[otherKey];
      const dx = otherPos.x - pos.x;
      const dz = otherPos.z - pos.z;
      const edge = getExitEdge(dx, dz, halfW, halfD);

      let gapPos: number;
      if (edge === "left" || edge === "right") {
        const t = halfW / Math.abs(dx);
        gapPos = t * dz;
      } else {
        const t = halfD / Math.abs(dz);
        gapPos = t * dx;
      }
      gapsByEdge[edge].push(gapPos);
    }

    // Inject extra gaps for secret passages
    const extraGaps = EXTRA_WALL_GAPS[key as PlatformKey];
    if (extraGaps) {
      for (const [edge, positions] of Object.entries(extraGaps) as Array<
        [Edge, number[]]
      >) {
        gapsByEdge[edge].push(...positions);
      }
    }

    // Left edge — wall runs along z
    for (const seg of splitEdge(gapsByEdge.left, halfD)) {
      walls.push({
        position: [pos.x - halfW, wallY, pos.z + (seg.start + seg.end) / 2],
        size: [WALL_T, WALL_H, seg.end - seg.start],
      });
    }
    // Right edge — wall runs along z
    for (const seg of splitEdge(gapsByEdge.right, halfD)) {
      walls.push({
        position: [pos.x + halfW, wallY, pos.z + (seg.start + seg.end) / 2],
        size: [WALL_T, WALL_H, seg.end - seg.start],
      });
    }
    // Front edge — wall runs along x
    for (const seg of splitEdge(gapsByEdge.front, halfW)) {
      walls.push({
        position: [pos.x + (seg.start + seg.end) / 2, wallY, pos.z + halfD],
        size: [seg.end - seg.start, WALL_H, WALL_T],
      });
    }
    // Back edge — wall runs along z
    for (const seg of splitEdge(gapsByEdge.back, halfW)) {
      walls.push({
        position: [pos.x + (seg.start + seg.end) / 2, wallY, pos.z - halfD],
        size: [seg.end - seg.start, WALL_H, WALL_T],
      });
    }
  }

  return walls;
}

const WALL_SEGMENTS = generateAllWalls();

// --- Component ---

export function WorldLayout() {
  return (
    <>
      {/* Safety floor — last-resort catch */}
      <RigidBody type="fixed" position={[0, -1, -40]} colliders={false}>
        <CuboidCollider args={[100, 0.25, 100]} />
      </RigidBody>

      {/* Platform edge barriers (with hex force field visuals) */}
      {WALL_SEGMENTS.map((wall, i) => {
        const runsAlongX = wall.size[0] > wall.size[2];
        const length = runsAlongX ? wall.size[0] : wall.size[2];
        const height = wall.size[1];
        const rotation: [number, number, number] = runsAlongX
          ? [0, 0, 0]
          : [0, Math.PI / 2, 0];

        return (
          <group key={`wall-${i}`}>
            <RigidBody type="fixed" position={wall.position} colliders={false}>
              <CuboidCollider
                args={[wall.size[0] / 2, wall.size[1] / 2, wall.size[2] / 2]}
              />
            </RigidBody>
            <PlatformForceField
              position={wall.position}
              size={[length, height]}
              rotation={rotation}
              color="#00f0ff"
            />
          </group>
        );
      })}

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
