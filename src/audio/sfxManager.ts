import { Howl } from "howler";

type SfxId =
  | "footstep"
  | "pickup"
  | "achievement"
  | "dash"
  | "land"
  | "ui-click"
  | "ui-hover";

interface SfxConfig {
  readonly src: string;
  readonly volume: number;
  readonly rate?: number;
  readonly rateVariance?: number;
}

const SFX_CONFIG: Record<SfxId, SfxConfig> = {
  footstep: { src: "/audio/sfx/footstep.mp3", volume: 0 },
  pickup: { src: "/audio/sfx/pickup.mp3", volume: 0.12 },
  achievement: { src: "/audio/sfx/achievement.mp3", volume: 0.15 },
  dash: { src: "/audio/sfx/dash.mp3", volume: 0.08 },
  land: { src: "/audio/sfx/land.mp3", volume: 0.06 },
  "ui-click": { src: "/audio/sfx/click.mp3", volume: 0.08 },
  "ui-hover": { src: "/audio/sfx/hover.mp3", volume: 0.04 },
};

const pool: Partial<Record<SfxId, Howl>> = {};
let sfxEnabled = true;
let sfxVolume = 1.0;

function getOrCreate(id: SfxId): Howl {
  if (!pool[id]) {
    const config = SFX_CONFIG[id];
    pool[id] = new Howl({
      src: [config.src],
      volume: config.volume * sfxVolume,
      html5: false,
      preload: true,
    });
  }
  return pool[id]!;
}

export function playSfx(id: SfxId): void {
  if (!sfxEnabled) return;
  const howl = getOrCreate(id);
  const config = SFX_CONFIG[id];
  if (config.rateVariance) {
    const base = config.rate ?? 1;
    howl.rate(base + (Math.random() - 0.5) * config.rateVariance * 2);
  }
  howl.play();
}

export function setSfxEnabled(enabled: boolean): void {
  sfxEnabled = enabled;
}

export function setSfxVolume(volume: number): void {
  sfxVolume = Math.max(0, Math.min(1, volume));
  for (const [id, howl] of Object.entries(pool)) {
    if (howl) {
      const config = SFX_CONFIG[id as SfxId];
      howl.volume(config.volume * sfxVolume);
    }
  }
}

export function isSfxEnabled(): boolean {
  return sfxEnabled;
}
