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
