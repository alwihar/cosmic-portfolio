import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
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
  if (bloomEnabled && chromaticAberration) {
    return (
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.025}
          mipmapBlur
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0015, 0.0015)}
          radialModulation
          modulationOffset={0.7}
          blendFunction={BlendFunction.NORMAL}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    );
  }

  if (bloomEnabled) {
    return (
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.025}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    );
  }

  if (chromaticAberration) {
    return (
      <EffectComposer>
        <ChromaticAberration
          offset={new THREE.Vector2(0.0015, 0.0015)}
          radialModulation
          modulationOffset={0.7}
          blendFunction={BlendFunction.NORMAL}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer>
      <Vignette eskil={false} offset={0.1} darkness={0.8} />
    </EffectComposer>
  );
}
