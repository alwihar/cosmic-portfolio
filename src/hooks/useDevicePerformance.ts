import { useState, useEffect } from "react";
import { getGPUTier } from "detect-gpu";
import { QUALITY_TIERS } from "../config/quality.ts";
import type { QualitySettings } from "../config/quality.ts";

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
