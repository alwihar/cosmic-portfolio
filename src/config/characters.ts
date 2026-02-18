export type CharacterVariant = "astronaut" | "robot" | "alien";

export interface CharacterColors {
  readonly body: string;
  readonly head: string;
  readonly visor: string;
  readonly visorEmissive: string;
  readonly accent: string;
  readonly backpack: string;
  readonly stripe: string;
  readonly jet: string;
  readonly antenna: string;
}

export interface CharacterInfo {
  readonly id: CharacterVariant;
  readonly name: string;
  readonly description: string;
  readonly colors: CharacterColors;
}

export const CHARACTERS: readonly CharacterInfo[] = [
  {
    id: "astronaut",
    name: "Cosmonaut",
    description: "Classic space explorer with a golden visor and jetpack.",
    colors: {
      body: "#e8e8f0",
      head: "#e0e0e8",
      visor: "#ffaa00",
      visorEmissive: "#ff8800",
      accent: "#ffa500",
      backpack: "#4a90d9",
      stripe: "#00d4ff",
      jet: "#ff4400",
      antenna: "#ff00ff",
    },
  },
  {
    id: "robot",
    name: "Synthbot",
    description: "Sleek cyber unit with neon circuits and chrome plating.",
    colors: {
      body: "#4a6fa5",
      head: "#5a80b5",
      visor: "#00ffcc",
      visorEmissive: "#00cc99",
      accent: "#00ffcc",
      backpack: "#2a4a6a",
      stripe: "#00ffcc",
      jet: "#00aaff",
      antenna: "#00ffcc",
    },
  },
  {
    id: "alien",
    name: "Xeno",
    description: "Mysterious traveler from a distant galaxy.",
    colors: {
      body: "#2aaa5a",
      head: "#33bb66",
      visor: "#ff44ff",
      visorEmissive: "#cc22cc",
      accent: "#ff44ff",
      backpack: "#1a6a3a",
      stripe: "#ff44ff",
      jet: "#ff44ff",
      antenna: "#ffff00",
    },
  },
];
