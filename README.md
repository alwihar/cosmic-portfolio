# Cosmic Portfolio: Space Hub Design

## Overview

An immersive 3D portfolio website built as a floating space station. Visitors control a small character navigating interconnected platforms in space, each representing a portfolio section. Bird's-eye isometric camera. Cyberpunk neon aesthetic with a deep space backdrop.

## Inspiration

- **Bruno Simon** (bruno-simon.com) — third-person explorable world, clear layout, playful UX
- **Samsy** (samsy.ninja) — cyberpunk neon aesthetic, WebGPU performance (avoiding the chaotic UX)
- General: Awwwards-winning 3D portfolios combining immersion with discoverability

## Concept: Space Hub

A floating space station composed of interconnected platforms suspended in space with a starfield and nebulae backdrop. Cyberpunk neon accents on structures. All platforms visible from the spawn point for intuitive wayfinding.

### World Layout

```
              *  .  +        .    *
          .        *    .
                +--------------+
        *       |  CONTACT     |    .
                |  (Comms      |
           .    |   tower)     |  *
                +------+-------+
            .      bridge         .
     +-----------+      +---------------+
     | PROJECTS  |------| SKILLS        |
     | (Holo     |bridge| (Tech         |
     |  gallery) |      |  lab)         |
     +-----+----+      +-------+-------+
           |       bridge       |
           +--------+-----------+
                    |
             +------+-------+
      *      |  HERO /      |      .
             |  SPAWN PAD   |  *
        .    |  (Landing    |
             |   platform)  |    .
             +--------------+
          *        .    *     .
```

## Platforms

### Landing Pad (Hero / About Me)
- Spawn point for all visitors
- Name displayed as large 3D holographic text
- Floating info panels with bio, background, highlights
- "Mission briefing" aesthetic

### Holo Gallery (Projects)
- Holographic screens floating above pedestals
- Walk up to a screen to activate project preview
- Each project shows: screenshot/video, tech tags, live site + GitHub links
- Click to open external links

### Tech Lab (Skills)
- Interactive 3D icons for each technology (React, TypeScript, etc.)
- Floating and slowly rotating, grouped by category
- Approach to see details and proficiency
- Glow intensity or size could represent experience level

### Comms Tower (Contact)
- Tall antenna/tower structure as visual landmark
- Terminal console for sending messages (contact form)
- Social links as glowing satellite dishes or beacon objects

### Bridges
- Glowing neon walkways connecting all platforms
- Particle trail effects as character walks across
- Serve as clear navigation paths

## Character

- Small robot companion or mini astronaut (cute, low-poly, stylized)
- Idle animations (floating, looking around)
- Walk animation + optional jetpack boost
- Neon accent colors on visor/body matching the world theme
- Modeled in Blender or procedurally generated

## Controls

### Desktop
- WASD / Arrow keys for movement
- Mouse to adjust camera angle (limited range, stays bird's-eye)
- Click on interactive objects (screens, icons, terminals)

### Mobile
- Virtual joystick (nipplejs) for movement
- Tap to interact with objects
- Swipe to adjust camera angle

## Visual Style

- **Background:** Deep space — stars, distant nebulae, subtle parallax layers
- **Platforms:** Dark metallic surfaces with glowing neon edge lights (cyan, magenta, electric blue)
- **Structures:** Geometric, abstract, not realistic. Holographic and translucent elements
- **Lighting:** Neon point lights, ambient glow, bloom postprocessing
- **Particles:** Ambient floating dust/stars, trails behind character, sparkle effects on interactions
- **Postprocessing:** Bloom, chromatic aberration, vignette for cyberpunk feel
- **Fog:** Subtle depth fog to create atmosphere and hide far edges

## UX / Wayfinding

- All platforms visible from spawn — no hidden areas
- Floating holographic labels on each platform
- Minimap in corner showing platform layout + character position
- Clickable labels as teleport shortcuts (for impatient visitors)
- Subtle arrow/path indicators on bridges
- Loading screen with brief "controls" hint

## Tech Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Framework | React + Vite | Fast dev, familiar ecosystem |
| 3D Rendering | React Three Fiber (R3F) | Declarative Three.js in React |
| 3D Helpers | @react-three/drei | Controls, loaders, text, environment, stars |
| Physics | @react-three/rapier | Character controller, collisions, bridges |
| Postprocessing | @react-three/postprocessing | Bloom, chromatic aberration, vignette |
| Animation | GSAP + ScrollTrigger | UI transitions, holographic panel animations |
| Smooth scroll | Lenis | For any 2D overlay/menu sections |
| Shaders | GLSL | Custom neon glow, holographic effects, particles |
| 3D Models | Blender to GLTF | Platforms, character, structures |
| Mobile controls | nipplejs | Virtual joystick |
| Deployment | Vercel | Free, fast, React-optimized |
| TypeScript | Yes | Type safety throughout |

## Mobile Strategy

- Virtual joystick for movement
- Reduced particle count on mobile (detect via GPU tier)
- Simplified postprocessing (bloom only, no chromatic aberration)
- Lower polygon models loaded on mobile
- Touch-friendly interaction hitboxes (larger tap targets)
- Performance detection via detect-gpu library to scale quality

## Performance Targets

- 60 FPS on modern desktop
- 30+ FPS on mid-range mobile
- Less than 5s initial load (with loading screen + progressive asset loading)
- Lazy load project screenshots/videos on approach

## Accessibility

- Keyboard fully navigable (WASD + Tab for UI)
- Teleport shortcuts for users who don't want to walk
- Optional 2D fallback mode (traditional portfolio) via toggle
- Screen reader alt text for all project content
- Reduced motion mode respects OS preference

---

# Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an immersive 3D space hub portfolio with explorable platforms, third-person character, and cyberpunk neon aesthetic.

**Architecture:** React SPA with R3F rendering a physics-enabled 3D world. Procedural geometry for platforms/character (no Blender dependency initially). Ecctrl for character controller. Postprocessing for cyberpunk glow. Data-driven content via TypeScript constants.

**Tech Stack:** React 19 + Vite 6 + TypeScript + R3F v9 + drei v10 + Rapier v2 + postprocessing v3 + ecctrl + GSAP + nipplejs

---

## Project Structure

```
cosmic-portfolio/
  src/
    main.tsx                    # Entry point
    App.tsx                     # Canvas + providers
    styles/
      global.css                # Full-screen canvas styles
    config/
      controls.ts               # Keyboard mapping
      quality.ts                # Performance tiers
    data/
      projects.ts               # Project entries
      skills.ts                 # Skill entries
      profile.ts                # About me data
    components/
      Scene.tsx                 # Top-level scene composition
      environment/
        SpaceBackground.tsx     # Stars + nebula
        AmbientParticles.tsx    # Floating dust/sparkles
        Lighting.tsx            # All lights
        PostProcessing.tsx      # Bloom, chromatic aberration, vignette
      world/
        Platform.tsx            # Reusable platform base
        Bridge.tsx              # Glowing bridge connector
        WorldLayout.tsx         # Positions all platforms + bridges
      character/
        Character.tsx           # Procedural robot mesh
        CharacterController.tsx # Ecctrl wrapper + camera
      platforms/
        LandingPad.tsx          # Hero / About Me content
        HoloGallery.tsx         # Projects display
        TechLab.tsx             # Skills display
        CommsTower.tsx          # Contact section
      ui/
        LoadingScreen.tsx       # Loading with controls hint
        Minimap.tsx             # Corner minimap
        HoloLabel.tsx           # Floating platform labels
        TeleportMenu.tsx        # Quick-nav shortcuts
        MobileControls.tsx      # nipplejs joystick
      shared/
        HoloPanel.tsx           # Reusable holographic panel
        NeonEdge.tsx            # Glowing edge shader
        InteractionZone.tsx     # Proximity trigger
    hooks/
      useProximity.ts           # Distance-based activation
      useDevicePerformance.ts   # GPU tier detection
      useMobileDetect.ts        # Touch device detection
    shaders/
      holographic.ts            # Holographic material shader
      neonGlow.ts               # Neon edge glow shader
    utils/
      positions.ts              # Platform/bridge coordinates
```

---

## Phase 1: Project Scaffolding

### Task 1: Initialize Vite + React + TypeScript project

**Files:**
- Create: `cosmic-portfolio/` (entire scaffold)
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/global.css`

**Step 1: Scaffold with Vite**

Run:
```bash
cd "/Users/alwinaharutyunyan/cursor projects/cosmic-portfolio"
npm create vite@latest . -- --template react-ts
```

**Step 2: Install core dependencies**

Run:
```bash
npm install three @react-three/fiber @react-three/drei @react-three/rapier @react-three/postprocessing ecctrl postprocessing
npm install gsap nipplejs detect-gpu
npm install --save-dev @types/three vitest @testing-library/react
```

**Step 3: Set up global styles**

Write `src/styles/global.css`:
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}
```

**Step 4: Set up basic App with Canvas**

Write `src/App.tsx`:
```tsx
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        shadows
        camera={{ position: [0, 15, 20], fov: 50 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <mesh>
            <boxGeometry />
            <meshStandardMaterial color="cyan" />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
```

**Step 5: Update main.tsx to import styles**

Write `src/main.tsx`:
```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

**Step 6: Verify it runs**

Run: `npm run dev`
Expected: Browser opens showing a cyan cube on black background.

**Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Vite + React + TypeScript + R3F project"
```

---

### Task 2: Create data layer and config

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/profile.ts`
- Create: `src/config/controls.ts`
- Create: `src/config/quality.ts`
- Create: `src/utils/positions.ts`

**Step 1: Write the keyboard controls config**

Write `src/config/controls.ts`:
```ts
export const Controls = {
  forward: "forward",
  backward: "backward",
  leftward: "leftward",
  rightward: "rightward",
  jump: "jump",
  run: "run",
} as const;

export const keyboardMap = [
  { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
  { name: Controls.backward, keys: ["ArrowDown", "KeyS"] },
  { name: Controls.leftward, keys: ["ArrowLeft", "KeyA"] },
  { name: Controls.rightward, keys: ["ArrowRight", "KeyD"] },
  { name: Controls.jump, keys: ["Space"] },
  { name: Controls.run, keys: ["ShiftLeft"] },
];
```

**Step 2: Write platform positions**

Write `src/utils/positions.ts`:
```ts
import * as THREE from "three";

export const PLATFORM_POSITIONS = {
  landing: new THREE.Vector3(0, 0, 0),
  projects: new THREE.Vector3(-15, 0, -20),
  skills: new THREE.Vector3(15, 0, -20),
  contact: new THREE.Vector3(0, 0, -40),
} as const;

export const BRIDGE_CONNECTIONS = [
  { from: "landing", to: "projects" },
  { from: "landing", to: "skills" },
  { from: "projects", to: "contact" },
  { from: "skills", to: "contact" },
] as const;

export const CHARACTER_SPAWN = new THREE.Vector3(0, 3, 5);
```

**Step 3: Write project data**

Write `src/data/projects.ts`:
```ts
export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly techStack: readonly string[];
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly imageUrl: string;
}

export const projects: readonly Project[] = [
  {
    id: "project-1",
    title: "Project One",
    description: "Description of your first project.",
    techStack: ["React", "TypeScript", "Node.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    imageUrl: "/images/project-1.png",
  },
  // Add more projects here
];
```

**Step 4: Write skills data**

Write `src/data/skills.ts`:
```ts
export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly category: "frontend" | "backend" | "tools" | "design";
  readonly proficiency: number; // 0-1
  readonly color: string;
}

export const skills: readonly Skill[] = [
  { id: "react", name: "React", category: "frontend", proficiency: 0.95, color: "#61DAFB" },
  { id: "typescript", name: "TypeScript", category: "frontend", proficiency: 0.9, color: "#3178C6" },
  { id: "threejs", name: "Three.js", category: "frontend", proficiency: 0.7, color: "#000000" },
  { id: "nodejs", name: "Node.js", category: "backend", proficiency: 0.8, color: "#339933" },
  { id: "css", name: "CSS", category: "frontend", proficiency: 0.9, color: "#1572B6" },
  { id: "git", name: "Git", category: "tools", proficiency: 0.85, color: "#F05032" },
  // Add more
];
```

**Step 5: Write profile data**

Write `src/data/profile.ts`:
```ts
export const profile = {
  name: "Your Name",
  title: "Frontend Developer",
  bio: "Building immersive web experiences with modern technologies.",
  highlights: [
    "X+ years of frontend development",
    "Specializing in React & TypeScript",
    "Passionate about 3D web experiences",
  ],
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "your@email.com",
  },
} as const;
```

**Step 6: Write quality tiers config**

Write `src/config/quality.ts`:
```ts
export interface QualitySettings {
  readonly particleCount: number;
  readonly bloomEnabled: boolean;
  readonly chromaticAberration: boolean;
  readonly shadowMapSize: number;
  readonly antialias: boolean;
}

export const QUALITY_TIERS: Record<string, QualitySettings> = {
  high: {
    particleCount: 2000,
    bloomEnabled: true,
    chromaticAberration: true,
    shadowMapSize: 2048,
    antialias: true,
  },
  medium: {
    particleCount: 1000,
    bloomEnabled: true,
    chromaticAberration: false,
    shadowMapSize: 1024,
    antialias: true,
  },
  low: {
    particleCount: 500,
    bloomEnabled: true,
    chromaticAberration: false,
    shadowMapSize: 512,
    antialias: false,
  },
};
```

**Step 7: Commit**

```bash
git add src/data src/config src/utils
git commit -m "feat: add data layer, controls config, and platform positions"
```

---

## Phase 2: Space Environment

### Task 3: Starfield background and lighting

**Files:**
- Create: `src/components/environment/SpaceBackground.tsx`
- Create: `src/components/environment/Lighting.tsx`
- Create: `src/components/Scene.tsx`
- Modify: `src/App.tsx`

**Step 1: Write SpaceBackground**

Write `src/components/environment/SpaceBackground.tsx`:
```tsx
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points } from "three";

export function SpaceBackground() {
  const starsRef = useRef<Points>(null);

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={200}
      depth={100}
      count={5000}
      factor={4}
      saturation={0.2}
      fade
      speed={0.5}
    />
  );
}
```

**Step 2: Write Lighting**

Write `src/components/environment/Lighting.tsx`:
```tsx
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.15} color="#4a00e0" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.3}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      {/* Cyan accent from below-left */}
      <pointLight position={[-20, -5, 0]} intensity={0.5} color="#00f0ff" distance={60} />
      {/* Magenta accent from below-right */}
      <pointLight position={[20, -5, 0]} intensity={0.5} color="#ff00ff" distance={60} />
      {/* Blue accent from above-back */}
      <pointLight position={[0, 15, -40]} intensity={0.3} color="#0040ff" distance={80} />
    </>
  );
}
```

**Step 3: Write Scene component**

Write `src/components/Scene.tsx`:
```tsx
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
```

**Step 4: Update App.tsx**

Write `src/App.tsx`:
```tsx
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "./components/Scene";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        shadows
        camera={{ position: [0, 25, 35], fov: 50 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

**Step 5: Verify**

Run: `npm run dev`
Expected: Deep space background with slowly rotating stars, colored lighting, and fog.

**Step 6: Commit**

```bash
git add src/components src/App.tsx
git commit -m "feat: add space environment with starfield, lighting, and fog"
```

---

### Task 4: Postprocessing pipeline

**Files:**
- Create: `src/components/environment/PostProcessing.tsx`
- Modify: `src/components/Scene.tsx`

**Step 1: Write PostProcessing component**

Write `src/components/environment/PostProcessing.tsx`:
```tsx
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

interface PostProcessingProps {
  readonly bloomEnabled?: boolean;
  readonly chromaticAberration?: boolean;
}

export function PostProcessing({
  bloomEnabled = true,
  chromaticAberration = true,
}: PostProcessingProps) {
  return (
    <EffectComposer>
      {bloomEnabled && (
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.025}
          mipmapBlur
        />
      )}
      {chromaticAberration && (
        <ChromaticAberration
          offset={new THREE.Vector2(0.0015, 0.0015)}
          radialModulation
          modulationOffset={0.7}
          blendFunction={BlendFunction.NORMAL}
        />
      )}
      <Vignette eskil={false} offset={0.1} darkness={0.8} />
    </EffectComposer>
  );
}
```

**Step 2: Add to Scene**

Update `src/components/Scene.tsx`:
```tsx
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
```

**Step 3: Verify**

Run: `npm run dev`
Expected: Scene now has bloom glow on bright elements, subtle chromatic aberration at edges, and vignette darkening corners.

**Step 4: Commit**

```bash
git add src/components/environment/PostProcessing.tsx src/components/Scene.tsx
git commit -m "feat: add postprocessing pipeline with bloom, chromatic aberration, vignette"
```

---

## Phase 3: Platforms and World Geometry

### Task 5: Reusable Platform component

**Files:**
- Create: `src/components/world/Platform.tsx`
- Create: `src/shaders/neonGlow.ts`

**Step 1: Write neon edge shader**

Write `src/shaders/neonGlow.ts`:
```ts
export const neonEdgeVertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  void main() {
    vPosition = position;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const neonEdgeFragmentShader = `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    float edge = 1.0 - abs(dot(vNormal, vec3(0.0, 1.0, 0.0)));
    edge = smoothstep(0.4, 1.0, edge);
    vec3 glow = uColor * edge * uIntensity;
    vec3 base = vec3(0.02, 0.02, 0.04);
    gl_FragColor = vec4(base + glow, 1.0);
  }
`;
```

**Step 2: Write Platform component**

Write `src/components/world/Platform.tsx`:
```tsx
import { RigidBody } from "@react-three/rapier";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { neonEdgeVertexShader, neonEdgeFragmentShader } from "../../shaders/neonGlow";

interface PlatformProps {
  readonly position: THREE.Vector3;
  readonly size?: [number, number, number];
  readonly color?: string;
  readonly label?: string;
}

export function Platform({
  position,
  size = [12, 0.5, 12],
  color = "#00f0ff",
}: PlatformProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: 2.0 },
    }),
    [color]
  );

  return (
    <RigidBody type="fixed" position={position.toArray()}>
      {/* Main platform surface */}
      <mesh ref={meshRef} receiveShadow>
        <boxGeometry args={size} />
        <shaderMaterial
          vertexShader={neonEdgeVertexShader}
          fragmentShader={neonEdgeFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      {/* Neon edge trim - top ring */}
      <mesh position={[0, size[1] / 2 + 0.02, 0]}>
        <boxGeometry args={[size[0] + 0.1, 0.04, size[2] + 0.1]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </RigidBody>
  );
}
```

**Step 3: Verify by adding a test platform to Scene**

Temporarily add to `Scene.tsx`:
```tsx
import { Physics } from "@react-three/rapier";
import { Platform } from "./world/Platform";
import * as THREE from "three";

// Inside Scene:
<Physics gravity={[0, -9.81, 0]}>
  <Platform position={new THREE.Vector3(0, 0, 0)} />
</Physics>
```

**Step 4: Verify**

Run: `npm run dev`
Expected: Dark platform floating in space with glowing cyan edges.

**Step 5: Commit**

```bash
git add src/components/world/Platform.tsx src/shaders/neonGlow.ts
git commit -m "feat: add reusable Platform component with neon edge shader"
```

---

### Task 6: Bridge connector and WorldLayout

**Files:**
- Create: `src/components/world/Bridge.tsx`
- Create: `src/components/world/WorldLayout.tsx`
- Modify: `src/components/Scene.tsx`

**Step 1: Write Bridge component**

Write `src/components/world/Bridge.tsx`:
```tsx
import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
import * as THREE from "three";

interface BridgeProps {
  readonly from: THREE.Vector3;
  readonly to: THREE.Vector3;
  readonly color?: string;
  readonly width?: number;
}

export function Bridge({ from, to, color = "#00f0ff", width = 2 }: BridgeProps) {
  const { position, rotation, length } = useMemo(() => {
    const midpoint = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
    const direction = new THREE.Vector3().subVectors(to, from);
    const bridgeLength = direction.length();
    const angle = Math.atan2(direction.x, direction.z);

    return {
      position: midpoint,
      rotation: [0, angle, 0] as const,
      length: bridgeLength,
    };
  }, [from, to]);

  return (
    <RigidBody type="fixed" position={position.toArray()} rotation={[...rotation]}>
      {/* Bridge surface */}
      <mesh receiveShadow>
        <boxGeometry args={[width, 0.15, length]} />
        <meshStandardMaterial
          color="#050510"
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      {/* Left rail glow */}
      <mesh position={[-width / 2, 0.1, 0]}>
        <boxGeometry args={[0.06, 0.06, length]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {/* Right rail glow */}
      <mesh position={[width / 2, 0.1, 0]}>
        <boxGeometry args={[0.06, 0.06, length]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </RigidBody>
  );
}
```

**Step 2: Write WorldLayout**

Write `src/components/world/WorldLayout.tsx`:
```tsx
import { Platform } from "./Platform";
import { Bridge } from "./Bridge";
import { PLATFORM_POSITIONS, BRIDGE_CONNECTIONS } from "../../utils/positions";

export function WorldLayout() {
  return (
    <>
      {/* Platforms */}
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

      {/* Bridges */}
      {BRIDGE_CONNECTIONS.map(({ from, to }) => (
        <Bridge
          key={`${from}-${to}`}
          from={PLATFORM_POSITIONS[from]}
          to={PLATFORM_POSITIONS[to]}
          color="#4040ff"
        />
      ))}
    </>
  );
}
```

**Step 3: Update Scene to use WorldLayout**

Write `src/components/Scene.tsx`:
```tsx
import { Physics } from "@react-three/rapier";
import { SpaceBackground } from "./environment/SpaceBackground";
import { Lighting } from "./environment/Lighting";
import { PostProcessing } from "./environment/PostProcessing";
import { WorldLayout } from "./world/WorldLayout";

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
```

**Step 4: Verify**

Run: `npm run dev`
Expected: 4 platforms floating in space with different colored neon edges, connected by glowing bridges.

**Step 5: Commit**

```bash
git add src/components/world src/components/Scene.tsx
git commit -m "feat: add Bridge, WorldLayout with 4 platforms connected by neon bridges"
```

---

## Phase 4: Character and Controls

### Task 7: Procedural robot character

**Files:**
- Create: `src/components/character/Character.tsx`

**Step 1: Write Character mesh**

Write `src/components/character/Character.tsx`:
```tsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export function Character() {
  const visorRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Antenna bob
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(t * 3) * 0.15;
    }
    // Visor pulse
    if (visorRef.current) {
      const mat = visorRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.7 + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <group>
      {/* Body */}
      <mesh castShadow position={[0, 0, 0]}>
        <capsuleGeometry args={[0.25, 0.4, 8, 16]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Head */}
      <mesh castShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[0.4, 0.35, 0.35]} />
        <meshStandardMaterial color="#16213e" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Visor */}
      <mesh ref={visorRef} position={[0, 0.55, 0.18]}>
        <boxGeometry args={[0.35, 0.12, 0.02]} />
        <meshBasicMaterial color="#00f0ff" toneMapped={false} transparent opacity={0.8} />
      </mesh>
      {/* Antenna */}
      <group ref={antennaRef} position={[0, 0.78, 0]}>
        <mesh>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <Float speed={6} floatIntensity={0.3} floatingRange={[0, 0.05]}>
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#ff00ff" toneMapped={false} />
          </mesh>
        </Float>
      </group>
      {/* Jetpack nozzles */}
      <mesh position={[-0.15, -0.1, -0.2]}>
        <cylinderGeometry args={[0.06, 0.04, 0.15, 8]} />
        <meshStandardMaterial color="#2a2a4a" emissive="#ff4400" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.15, -0.1, -0.2]}>
        <cylinderGeometry args={[0.06, 0.04, 0.15, 8]} />
        <meshStandardMaterial color="#2a2a4a" emissive="#ff4400" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}
```

**Step 2: Verify by mounting in Scene (temporarily)**

Add `<Character />` inside Physics in Scene.tsx at position `[0, 3, 0]` to preview.

**Step 3: Commit**

```bash
git add src/components/character/Character.tsx
git commit -m "feat: add procedural robot character with animated visor and antenna"
```

---

### Task 8: Character controller with ecctrl + camera

**Files:**
- Create: `src/components/character/CharacterController.tsx`
- Modify: `src/components/Scene.tsx`
- Modify: `src/App.tsx`

**Step 1: Write CharacterController**

Write `src/components/character/CharacterController.tsx`:
```tsx
import Ecctrl from "ecctrl";
import { Character } from "./Character";
import { CHARACTER_SPAWN } from "../../utils/positions";

export function CharacterController() {
  return (
    <Ecctrl
      position={CHARACTER_SPAWN.toArray()}
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
```

**Step 2: Update Scene.tsx**

Write `src/components/Scene.tsx`:
```tsx
import { Physics } from "@react-three/rapier";
import { SpaceBackground } from "./environment/SpaceBackground";
import { Lighting } from "./environment/Lighting";
import { PostProcessing } from "./environment/PostProcessing";
import { WorldLayout } from "./world/WorldLayout";
import { CharacterController } from "./character/CharacterController";

export function Scene() {
  return (
    <>
      <SpaceBackground />
      <Lighting />
      <PostProcessing />
      <fog attach="fog" args={["#000010", 30, 120]} />
      <Physics gravity={[0, -9.81, 0]}>
        <WorldLayout />
        <CharacterController />
      </Physics>
    </>
  );
}
```

**Step 3: Update App.tsx with KeyboardControls**

Write `src/App.tsx`:
```tsx
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Suspense } from "react";
import { Scene } from "./components/Scene";
import { keyboardMap } from "./config/controls";

export default function App() {
  return (
    <KeyboardControls map={keyboardMap}>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          shadows
          camera={{ position: [0, 25, 35], fov: 50 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </KeyboardControls>
  );
}
```

**Step 4: Verify**

Run: `npm run dev`
Expected: Robot character spawns on landing pad. WASD moves the character. Camera follows in third-person. Character can walk across bridges to other platforms.

**Step 5: Commit**

```bash
git add src/components/character/CharacterController.tsx src/components/Scene.tsx src/App.tsx
git commit -m "feat: add ecctrl character controller with third-person camera"
```

---

## Phase 5: Platform Content

### Task 9: Landing Pad (Hero / About Me)

**Files:**
- Create: `src/components/platforms/LandingPad.tsx`
- Create: `src/components/shared/HoloPanel.tsx`
- Modify: `src/components/world/WorldLayout.tsx`

**Step 1: Write HoloPanel (reusable holographic panel)**

Write `src/components/shared/HoloPanel.tsx`:
```tsx
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";

interface HoloPanelProps {
  readonly position: [number, number, number];
  readonly children: React.ReactNode;
  readonly color?: string;
  readonly width?: number;
}

export function HoloPanel({ position, children, color = "#00f0ff", width = 200 }: HoloPanelProps) {
  return (
    <Float speed={2} floatIntensity={0.3} rotationIntensity={0.1}>
      <group position={position}>
        {/* Glow backing */}
        <mesh>
          <planeGeometry args={[width / 80, width / 120]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
        <Html
          transform
          distanceFactor={8}
          style={{
            width: `${width}px`,
            padding: "16px",
            background: `linear-gradient(135deg, rgba(0,0,0,0.85), rgba(10,10,40,0.85))`,
            border: `1px solid ${color}40`,
            borderRadius: "8px",
            color: "#e0e0ff",
            fontFamily: "'Courier New', monospace",
            fontSize: "13px",
            backdropFilter: "blur(10px)",
            boxShadow: `0 0 20px ${color}20`,
            pointerEvents: "auto",
          }}
        >
          {children}
        </Html>
      </group>
    </Float>
  );
}
```

**Step 2: Write LandingPad**

Write `src/components/platforms/LandingPad.tsx`:
```tsx
import { Text3D, Center, Float } from "@react-three/drei";
import { HoloPanel } from "../shared/HoloPanel";
import { profile } from "../../data/profile";
import { PLATFORM_POSITIONS } from "../../utils/positions";

export function LandingPad() {
  const pos = PLATFORM_POSITIONS.landing;

  return (
    <group position={[pos.x, pos.y + 0.5, pos.z]}>
      {/* 3D Name */}
      <Float speed={1.5} floatIntensity={0.5}>
        <Center position={[0, 4, 0]}>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={1.2}
            height={0.3}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.01}
          >
            {profile.name}
            <meshBasicMaterial color="#00f0ff" toneMapped={false} />
          </Text3D>
        </Center>
      </Float>

      {/* Title subtitle */}
      <Float speed={1.5} floatIntensity={0.3}>
        <Center position={[0, 2.5, 0]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.4}
            height={0.1}
          >
            {profile.title}
            <meshBasicMaterial color="#ff00ff" toneMapped={false} />
          </Text3D>
        </Center>
      </Float>

      {/* Bio panel */}
      <HoloPanel position={[-4, 2, 2]} color="#00f0ff" width={220}>
        <div>
          <h3 style={{ color: "#00f0ff", margin: "0 0 8px 0", fontSize: "14px" }}>
            // ABOUT
          </h3>
          <p style={{ margin: 0, lineHeight: 1.5 }}>{profile.bio}</p>
        </div>
      </HoloPanel>

      {/* Highlights panel */}
      <HoloPanel position={[4, 2, 2]} color="#ff00ff" width={220}>
        <div>
          <h3 style={{ color: "#ff00ff", margin: "0 0 8px 0", fontSize: "14px" }}>
            // HIGHLIGHTS
          </h3>
          <ul style={{ margin: 0, paddingLeft: "16px", lineHeight: 1.8 }}>
            {profile.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </HoloPanel>
    </group>
  );
}
```

**Step 3: Add LandingPad to WorldLayout**

Add import and `<LandingPad />` inside WorldLayout after the platforms.

**Step 4: Download font file**

Run:
```bash
mkdir -p "/Users/alwinaharutyunyan/cursor projects/cosmic-portfolio/public/fonts"
curl -o "/Users/alwinaharutyunyan/cursor projects/cosmic-portfolio/public/fonts/helvetiker_bold.typeface.json" "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/fonts/helvetiker_bold.typeface.json"
curl -o "/Users/alwinaharutyunyan/cursor projects/cosmic-portfolio/public/fonts/helvetiker_regular.typeface.json" "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/fonts/helvetiker_regular.typeface.json"
```

**Step 5: Verify**

Run: `npm run dev`
Expected: Landing pad shows floating 3D name in cyan, title in magenta, and two holographic info panels.

**Step 6: Commit**

```bash
git add src/components/platforms/LandingPad.tsx src/components/shared/HoloPanel.tsx src/components/world/WorldLayout.tsx public/fonts
git commit -m "feat: add LandingPad with 3D holographic name, bio, and highlights panels"
```

---

### Task 10: Holo Gallery (Projects)

**Files:**
- Create: `src/components/platforms/HoloGallery.tsx`
- Create: `src/hooks/useProximity.ts`
- Create: `src/components/shared/InteractionZone.tsx`
- Modify: `src/components/world/WorldLayout.tsx`

**Step 1: Write useProximity hook**

Write `src/hooks/useProximity.ts`:
```ts
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import * as THREE from "three";

export function useProximity(
  targetPosition: THREE.Vector3,
  threshold: number = 5,
  characterRef?: React.RefObject<THREE.Object3D>
) {
  const [isNear, setIsNear] = useState(false);
  const [distance, setDistance] = useState(Infinity);
  const tempVec = useRef(new THREE.Vector3());

  useFrame(({ scene }) => {
    // Find the character group (ecctrl creates a group with the character)
    const character = characterRef?.current ?? scene.getObjectByName("character-root");
    if (!character) return;

    character.getWorldPosition(tempVec.current);
    const dist = tempVec.current.distanceTo(targetPosition);
    setDistance(dist);

    const near = dist < threshold;
    if (near !== isNear) {
      setIsNear(near);
    }
  });

  return { isNear, distance };
}
```

**Step 2: Write HoloGallery**

Write `src/components/platforms/HoloGallery.tsx`:
```tsx
import { Float } from "@react-three/drei";
import { HoloPanel } from "../shared/HoloPanel";
import { projects } from "../../data/projects";
import { PLATFORM_POSITIONS } from "../../utils/positions";

export function HoloGallery() {
  const pos = PLATFORM_POSITIONS.projects;
  const spacing = 4;
  const startX = -((projects.length - 1) * spacing) / 2;

  return (
    <group position={[pos.x, pos.y + 0.5, pos.z]}>
      {projects.map((project, i) => (
        <Float key={project.id} speed={1.5} floatIntensity={0.2}>
          <group position={[startX + i * spacing, 2.5, 0]}>
            {/* Holographic screen frame */}
            <mesh>
              <planeGeometry args={[3, 2]} />
              <meshBasicMaterial
                color="#ff00ff"
                transparent
                opacity={0.08}
                toneMapped={false}
              />
            </mesh>

            {/* Project content */}
            <HoloPanel position={[0, 0, 0.01]} color="#ff00ff" width={260}>
              <div>
                <h3 style={{ color: "#ff00ff", margin: "0 0 6px 0", fontSize: "15px" }}>
                  {project.title}
                </h3>
                <p style={{ margin: "0 0 8px 0", fontSize: "12px", opacity: 0.8 }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "8px" }}>
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: "2px 6px",
                        border: "1px solid #ff00ff40",
                        borderRadius: "4px",
                        fontSize: "10px",
                        color: "#ff88ff",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#00f0ff", fontSize: "12px" }}
                    >
                      [LIVE]
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#00ff88", fontSize: "12px" }}
                    >
                      [CODE]
                    </a>
                  )}
                </div>
              </div>
            </HoloPanel>

            {/* Pedestal base */}
            <mesh position={[0, -1.8, 0]}>
              <cylinderGeometry args={[0.15, 0.25, 1.5, 8]} />
              <meshStandardMaterial
                color="#1a1a2e"
                emissive="#ff00ff"
                emissiveIntensity={0.3}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}
```

**Step 3: Add to WorldLayout**

Import and add `<HoloGallery />` in WorldLayout.

**Step 4: Verify**

Run: `npm run dev`
Expected: Walk to projects platform — floating holographic screens on pedestals displaying project cards.

**Step 5: Commit**

```bash
git add src/components/platforms/HoloGallery.tsx src/hooks/useProximity.ts src/components/world/WorldLayout.tsx
git commit -m "feat: add HoloGallery with floating project screens on pedestals"
```

---

### Task 11: Tech Lab (Skills)

**Files:**
- Create: `src/components/platforms/TechLab.tsx`
- Modify: `src/components/world/WorldLayout.tsx`

**Step 1: Write TechLab**

Write `src/components/platforms/TechLab.tsx`:
```tsx
import { Float, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { skills } from "../../data/skills";
import { PLATFORM_POSITIONS } from "../../utils/positions";

function SkillOrb({ skill, position }: { skill: typeof skills[number]; position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
    }
  });

  const size = 0.3 + skill.proficiency * 0.3;

  return (
    <Float speed={2} floatIntensity={0.4} rotationIntensity={0.2}>
      <group ref={groupRef} position={position}>
        {/* Outer glow ring */}
        <mesh>
          <torusGeometry args={[size + 0.15, 0.02, 8, 32]} />
          <meshBasicMaterial color={skill.color} toneMapped={false} transparent opacity={0.6} />
        </mesh>
        {/* Core orb */}
        <mesh ref={orbRef}>
          <icosahedronGeometry args={[size, 1]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={skill.proficiency * 1.5}
            toneMapped={false}
            wireframe
          />
        </mesh>
        {/* Inner solid */}
        <mesh>
          <icosahedronGeometry args={[size * 0.6, 1]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
            toneMapped={false}
          />
        </mesh>
        {/* Label */}
        <Text
          position={[0, -size - 0.4, 0]}
          fontSize={0.25}
          color="#e0e0ff"
          anchorX="center"
          anchorY="top"
          font="/fonts/helvetiker_regular.typeface.json"
        >
          {skill.name}
        </Text>
      </group>
    </Float>
  );
}

export function TechLab() {
  const pos = PLATFORM_POSITIONS.skills;

  // Arrange skills in a circle
  const radius = 4;

  return (
    <group position={[pos.x, pos.y + 0.5, pos.z]}>
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <SkillOrb
            key={skill.id}
            skill={skill}
            position={[x, 2, z]}
          />
        );
      })}
    </group>
  );
}
```

**Step 2: Add to WorldLayout**

Import and add `<TechLab />` in WorldLayout.

**Step 3: Verify**

Run: `npm run dev`
Expected: Skills platform shows floating wireframe orbs arranged in a circle, each glowing with the skill's color, sized by proficiency.

**Step 4: Commit**

```bash
git add src/components/platforms/TechLab.tsx src/components/world/WorldLayout.tsx
git commit -m "feat: add TechLab with rotating skill orbs sized by proficiency"
```

---

### Task 12: Comms Tower (Contact)

**Files:**
- Create: `src/components/platforms/CommsTower.tsx`
- Modify: `src/components/world/WorldLayout.tsx`

**Step 1: Write CommsTower**

Write `src/components/platforms/CommsTower.tsx`:
```tsx
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { HoloPanel } from "../shared/HoloPanel";
import { profile } from "../../data/profile";
import { PLATFORM_POSITIONS } from "../../utils/positions";

export function CommsTower() {
  const pos = PLATFORM_POSITIONS.contact;
  const dishRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (dishRef.current) {
      dishRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group position={[pos.x, pos.y + 0.5, pos.z]}>
      {/* Tower base */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.15, 0.3, 4, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Tower segments with neon rings */}
      {[1, 2, 3].map((i) => (
        <mesh key={i} position={[0, i * 1.2, 0]}>
          <torusGeometry args={[0.25, 0.03, 8, 16]} />
          <meshBasicMaterial color="#ffaa00" toneMapped={false} />
        </mesh>
      ))}

      {/* Rotating dish */}
      <group ref={dishRef} position={[0, 4.5, 0]}>
        <mesh rotation={[Math.PI * 0.25, 0, 0]}>
          <coneGeometry args={[0.8, 0.4, 16, 1, true]} />
          <meshStandardMaterial
            color="#2a2a4a"
            emissive="#ffaa00"
            emissiveIntensity={0.3}
            side={THREE.DoubleSide}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Beacon light */}
      <Float speed={3} floatIntensity={0.2}>
        <mesh position={[0, 5.2, 0]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color="#ffaa00" toneMapped={false} />
        </mesh>
        <pointLight position={[0, 5.2, 0]} color="#ffaa00" intensity={2} distance={15} />
      </Float>

      {/* Contact terminal panel */}
      <HoloPanel position={[-3, 2.5, 2]} color="#ffaa00" width={250}>
        <div>
          <h3 style={{ color: "#ffaa00", margin: "0 0 12px 0", fontSize: "14px" }}>
            // TRANSMISSION CONSOLE
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <a
              href={`mailto:${profile.social.email}`}
              style={{ color: "#00f0ff", textDecoration: "none", fontSize: "13px" }}
            >
              &gt; EMAIL: {profile.social.email}
            </a>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#00ff88", textDecoration: "none", fontSize: "13px" }}
            >
              &gt; GITHUB: {profile.social.github.split("/").pop()}
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ff00ff", textDecoration: "none", fontSize: "13px" }}
            >
              &gt; LINKEDIN: {profile.social.linkedin.split("/").pop()}
            </a>
          </div>
          <p style={{ marginTop: "12px", fontSize: "11px", opacity: 0.6 }}>
            Signal strength: STRONG | Ready to connect
          </p>
        </div>
      </HoloPanel>
    </group>
  );
}
```

**Step 2: Add to WorldLayout**

Import and add `<CommsTower />` in WorldLayout.

**Step 3: Verify**

Run: `npm run dev`
Expected: Contact platform has a tower with glowing rings, rotating dish, pulsing beacon, and a contact info panel.

**Step 4: Commit**

```bash
git add src/components/platforms/CommsTower.tsx src/components/world/WorldLayout.tsx
git commit -m "feat: add CommsTower with rotating dish, beacon, and contact panel"
```

---

## Phase 6: UX and Wayfinding

### Task 13: Floating platform labels

**Files:**
- Create: `src/components/ui/HoloLabel.tsx`
- Modify: `src/components/world/WorldLayout.tsx`

**Step 1: Write HoloLabel**

Write `src/components/ui/HoloLabel.tsx`:
```tsx
import { Text, Billboard } from "@react-three/drei";

interface HoloLabelProps {
  readonly position: [number, number, number];
  readonly text: string;
  readonly color?: string;
}

export function HoloLabel({ position, text, color = "#00f0ff" }: HoloLabelProps) {
  return (
    <Billboard position={position} follow lockX={false} lockY={false} lockZ={false}>
      <Text fontSize={0.6} color={color} anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#000000">
        {text}
      </Text>
      {/* Underline glow */}
      <mesh position={[0, -0.45, 0]}>
        <planeGeometry args={[text.length * 0.35, 0.03]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </Billboard>
  );
}
```

**Step 2: Add labels to WorldLayout**

Add `<HoloLabel>` above each platform in WorldLayout:
```tsx
<HoloLabel position={[pos.x, pos.y + 6, pos.z]} text="LANDING PAD" color="#00f0ff" />
```
(One for each platform at appropriate height.)

**Step 3: Commit**

```bash
git add src/components/ui/HoloLabel.tsx src/components/world/WorldLayout.tsx
git commit -m "feat: add floating holographic labels above each platform"
```

---

### Task 14: Loading screen

**Files:**
- Create: `src/components/ui/LoadingScreen.tsx`
- Modify: `src/App.tsx`

**Step 1: Write LoadingScreen**

Write `src/components/ui/LoadingScreen.tsx`:
```tsx
import { useProgress } from "@react-three/drei";

export function LoadingScreen() {
  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000010",
        fontFamily: "'Courier New', monospace",
        color: "#00f0ff",
        transition: "opacity 0.5s",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "24px", letterSpacing: "8px" }}>
        COSMIC PORTFOLIO
      </h1>
      <div style={{ width: "300px", height: "4px", background: "#111", borderRadius: "2px" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #00f0ff, #ff00ff)",
            borderRadius: "2px",
            transition: "width 0.3s",
            boxShadow: "0 0 10px #00f0ff",
          }}
        />
      </div>
      <p style={{ marginTop: "16px", fontSize: "12px", opacity: 0.6 }}>
        LOADING SYSTEMS... {Math.round(progress)}%
      </p>
      <div style={{ marginTop: "40px", fontSize: "11px", opacity: 0.4, textAlign: "center" }}>
        <p>WASD / ARROWS - Move</p>
        <p>MOUSE - Look around</p>
        <p>SPACE - Jump</p>
      </div>
    </div>
  );
}
```

**Step 2: Add to App.tsx**

Import `LoadingScreen` and render it alongside the Canvas (outside the Canvas div).

**Step 3: Commit**

```bash
git add src/components/ui/LoadingScreen.tsx src/App.tsx
git commit -m "feat: add loading screen with progress bar and controls hint"
```

---

### Task 15: Teleport menu (quick navigation)

**Files:**
- Create: `src/components/ui/TeleportMenu.tsx`
- Modify: `src/App.tsx`

**Step 1: Write TeleportMenu**

Write `src/components/ui/TeleportMenu.tsx`:
```tsx
import { useState } from "react";
import { PLATFORM_POSITIONS } from "../../utils/positions";

const DESTINATIONS = [
  { key: "landing", label: "LANDING PAD", color: "#00f0ff" },
  { key: "projects", label: "PROJECTS", color: "#ff00ff" },
  { key: "skills", label: "SKILLS", color: "#00ff88" },
  { key: "contact", label: "CONTACT", color: "#ffaa00" },
] as const;

interface TeleportMenuProps {
  readonly onTeleport: (position: [number, number, number]) => void;
}

export function TeleportMenu({ onTeleport }: TeleportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: "16px",
        right: "16px",
        zIndex: 100,
        fontFamily: "'Courier New', monospace",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "rgba(0,0,0,0.7)",
          border: "1px solid #00f0ff40",
          color: "#00f0ff",
          padding: "8px 16px",
          cursor: "pointer",
          fontSize: "12px",
          borderRadius: "4px",
        }}
      >
        {isOpen ? "CLOSE" : "TELEPORT"}
      </button>
      {isOpen && (
        <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {DESTINATIONS.map(({ key, label, color }) => {
            const pos = PLATFORM_POSITIONS[key];
            return (
              <button
                key={key}
                onClick={() => {
                  onTeleport([pos.x, pos.y + 3, pos.z + 3]);
                  setIsOpen(false);
                }}
                style={{
                  background: "rgba(0,0,0,0.7)",
                  border: `1px solid ${color}40`,
                  color,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: "11px",
                  borderRadius: "4px",
                  textAlign: "left",
                }}
              >
                &gt; {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Wire up teleport to character controller**

This requires exposing a teleport function from ecctrl via a ref. Add a ref to `CharacterController` and pass a teleport callback up through context or props.

**Step 3: Commit**

```bash
git add src/components/ui/TeleportMenu.tsx src/App.tsx
git commit -m "feat: add teleport menu for quick platform navigation"
```

---

### Task 16: Ambient particles

**Files:**
- Create: `src/components/environment/AmbientParticles.tsx`
- Modify: `src/components/Scene.tsx`

**Step 1: Write AmbientParticles**

Write `src/components/environment/AmbientParticles.tsx`:
```tsx
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AmbientParticlesProps {
  readonly count?: number;
}

export function AmbientParticles({ count = 1500 }: AmbientParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = Math.random() * 30 - 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = Math.random() * 0.005 + 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      // Reset if too high
      if (arr[i * 3 + 1] > 25) {
        arr[i * 3 + 1] = -5;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#4488ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}
```

**Step 2: Add to Scene**

Import and add `<AmbientParticles />` in Scene.tsx.

**Step 3: Commit**

```bash
git add src/components/environment/AmbientParticles.tsx src/components/Scene.tsx
git commit -m "feat: add rising ambient particles throughout the space"
```

---

## Phase 7: Mobile Support

### Task 17: Mobile controls + device detection

**Files:**
- Create: `src/hooks/useMobileDetect.ts`
- Create: `src/hooks/useDevicePerformance.ts`
- Create: `src/components/ui/MobileControls.tsx`
- Modify: `src/App.tsx`

**Step 1: Write useMobileDetect**

Write `src/hooks/useMobileDetect.ts`:
```ts
import { useState, useEffect } from "react";

export function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}
```

**Step 2: Write useDevicePerformance**

Write `src/hooks/useDevicePerformance.ts`:
```ts
import { useState, useEffect } from "react";
import { getGPUTier } from "detect-gpu";
import { QUALITY_TIERS, type QualitySettings } from "../config/quality";

export function useDevicePerformance(): QualitySettings {
  const [quality, setQuality] = useState<QualitySettings>(QUALITY_TIERS.medium);

  useEffect(() => {
    getGPUTier().then((tier) => {
      if (tier.tier >= 3) setQuality(QUALITY_TIERS.high);
      else if (tier.tier >= 2) setQuality(QUALITY_TIERS.medium);
      else setQuality(QUALITY_TIERS.low);
    });
  }, []);

  return quality;
}
```

**Step 3: Write MobileControls (nipplejs joystick)**

Write `src/components/ui/MobileControls.tsx`:
```tsx
import { useEffect, useRef } from "react";
import nipplejs from "nipplejs";

interface MobileControlsProps {
  readonly onMove: (x: number, y: number) => void;
  readonly onEnd: () => void;
}

export function MobileControls({ onMove, onEnd }: MobileControlsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const manager = nipplejs.create({
      zone: containerRef.current,
      mode: "static",
      position: { left: "80px", bottom: "80px" },
      color: "#00f0ff",
      size: 120,
    });

    manager.on("move", (_, data) => {
      if (data.vector) {
        onMove(data.vector.x, data.vector.y);
      }
    });

    manager.on("end", () => {
      onEnd();
    });

    return () => {
      manager.destroy();
    };
  }, [onMove, onEnd]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "200px",
        height: "200px",
        zIndex: 100,
      }}
    />
  );
}
```

**Step 4: Wire mobile controls into App**

In `App.tsx`, conditionally render `<MobileControls>` when `useMobileDetect()` returns true. Pass quality settings to `<PostProcessing>` and `<AmbientParticles>`.

**Step 5: Commit**

```bash
git add src/hooks src/components/ui/MobileControls.tsx src/App.tsx
git commit -m "feat: add mobile joystick controls and GPU-tier performance scaling"
```

---

## Phase 8: Polish and Deploy

### Task 18: Minimap

**Files:**
- Create: `src/components/ui/Minimap.tsx`
- Modify: `src/App.tsx`

**Step 1: Write Minimap as a simple CSS overlay**

Write `src/components/ui/Minimap.tsx` as a fixed-position SVG showing platform positions and character dot. Use a shared state or context for character position.

**Step 2: Commit**

```bash
git add src/components/ui/Minimap.tsx src/App.tsx
git commit -m "feat: add corner minimap showing platform layout and character position"
```

---

### Task 19: Performance optimization pass

**Steps:**
1. Add `<Preload all />` from drei in the Canvas
2. Implement `React.lazy` for platform content components
3. Use `useFrame` throttling for non-critical animations on low-end devices
4. Add `<AdaptiveDpr pixelated />` and `<AdaptiveEvents />` from drei
5. Test on mobile via Chrome DevTools device emulation
6. Profile with React DevTools and Three.js inspector

**Commit:**
```bash
git commit -m "perf: add adaptive rendering, preloading, and lazy loading"
```

---

### Task 20: Deploy to Vercel

**Step 1: Build and verify**

Run:
```bash
npm run build
npx serve dist
```
Expected: Production build serves correctly at localhost.

**Step 2: Deploy**

Run:
```bash
npx vercel
```

Follow prompts. Link to your Vercel account.

**Step 3: Commit any Vercel config**

```bash
git add .
git commit -m "chore: configure Vercel deployment"
```

---

## Summary

| Phase | Tasks | What's Built |
|-------|-------|-------------|
| 1: Scaffolding | 1-2 | Vite + R3F project, data layer, configs |
| 2: Environment | 3-4 | Starfield, lighting, postprocessing |
| 3: World | 5-6 | 4 platforms + bridges with neon edges |
| 4: Character | 7-8 | Procedural robot + ecctrl controller |
| 5: Content | 9-12 | All 4 platform contents (hero, projects, skills, contact) |
| 6: UX | 13-16 | Labels, loading screen, teleport, particles |
| 7: Mobile | 17 | Joystick, GPU detection, performance scaling |
| 8: Polish | 18-20 | Minimap, optimization, Vercel deploy |
