import { useState, useEffect } from "react";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Glitch,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import * as THREE from "three";

interface PostProcessingProps {
  readonly bloomEnabled?: boolean;
  readonly chromaticAberration?: boolean;
  readonly glitchActive?: boolean;
}

export function PostProcessing({
  bloomEnabled = true,
  chromaticAberration = true,
  glitchActive = false,
}: PostProcessingProps) {
  const [teleportGlitch, setTeleportGlitch] = useState(false);

  useEffect(() => {
    const handler = () => {
      setTeleportGlitch(true);
      setTimeout(() => setTeleportGlitch(false), 300);
    };
    document.addEventListener("teleport-glitch", handler);
    return () => document.removeEventListener("teleport-glitch", handler);
  }, []);

  const showGlitch = glitchActive || teleportGlitch;
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
        <Glitch
          delay={new THREE.Vector2(0, 0)}
          duration={
            showGlitch ? new THREE.Vector2(0.2, 0.4) : new THREE.Vector2(0, 0)
          }
          strength={
            showGlitch ? new THREE.Vector2(0.2, 0.4) : new THREE.Vector2(0, 0)
          }
          mode={GlitchMode.SPORADIC}
          active={showGlitch}
        />
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
        <Glitch
          delay={new THREE.Vector2(0, 0)}
          duration={
            showGlitch ? new THREE.Vector2(0.2, 0.4) : new THREE.Vector2(0, 0)
          }
          strength={
            showGlitch ? new THREE.Vector2(0.2, 0.4) : new THREE.Vector2(0, 0)
          }
          mode={GlitchMode.SPORADIC}
          active={showGlitch}
        />
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
        <Glitch
          delay={new THREE.Vector2(0, 0)}
          duration={
            showGlitch ? new THREE.Vector2(0.2, 0.4) : new THREE.Vector2(0, 0)
          }
          strength={
            showGlitch ? new THREE.Vector2(0.2, 0.4) : new THREE.Vector2(0, 0)
          }
          mode={GlitchMode.SPORADIC}
          active={showGlitch}
        />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer>
      <Vignette eskil={false} offset={0.1} darkness={0.8} />
      <Glitch
        delay={new THREE.Vector2(0, 0)}
        duration={
          showGlitch ? new THREE.Vector2(0.2, 0.4) : new THREE.Vector2(0, 0)
        }
        strength={
          showGlitch ? new THREE.Vector2(0.2, 0.4) : new THREE.Vector2(0, 0)
        }
        mode={GlitchMode.SPORADIC}
        active={showGlitch}
      />
    </EffectComposer>
  );
}
