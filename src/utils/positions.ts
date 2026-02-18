import * as THREE from "three";

export const PLATFORM_POSITIONS = {
  landing: new THREE.Vector3(0, 0, 0),
  about: new THREE.Vector3(20, 0, -25),
  projects: new THREE.Vector3(-15, 0, -50),
  skills: new THREE.Vector3(28, 0, -55),
  experience: new THREE.Vector3(5, 0, -80),
  contact: new THREE.Vector3(5, 0, -105),
  observatory: new THREE.Vector3(-40, 0, -10),
} as const;

export type PlatformKey = keyof typeof PLATFORM_POSITIONS;

export const BRIDGE_CONNECTIONS: readonly {
  from: PlatformKey;
  to: PlatformKey;
}[] = [
  { from: "landing", to: "about" },
  { from: "about", to: "projects" },
  { from: "about", to: "skills" },
  { from: "projects", to: "experience" },
  { from: "skills", to: "experience" },
  { from: "experience", to: "contact" },
  { from: "landing", to: "observatory" },
  { from: "observatory", to: "projects" },
];

export const CHARACTER_SPAWN = new THREE.Vector3(0, 3, 5);
