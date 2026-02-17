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
