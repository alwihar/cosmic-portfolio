import { Canvas } from "@react-three/fiber";
import {
  KeyboardControls,
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
} from "@react-three/drei";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Scene } from "./components/Scene";
import { keyboardMap } from "./config/controls.ts";
import { LoadingScreen } from "./components/ui/LoadingScreen.tsx";
import { CharacterSelect } from "./components/ui/CharacterSelect.tsx";
import { IntroPortal } from "./components/ui/IntroPortal.tsx";
import { TeleportMenu } from "./components/ui/TeleportMenu.tsx";
import { ControlsGuide } from "./components/ui/ControlsGuide.tsx";
import { MobileControls } from "./components/ui/MobileControls.tsx";
import { Minimap } from "./components/ui/Minimap.tsx";
import { DetailOverlay } from "./components/ui/DetailOverlay.tsx";
import { AudioToggle } from "./components/ui/AudioToggle.tsx";
import { AchievementToast } from "./components/ui/AchievementToast";
import { ProgressHUD } from "./components/ui/ProgressHUD";
import { useGameStore } from "./store/gameStore";
import { useMobileDetect } from "./hooks/useMobileDetect.ts";
import { useDevicePerformance } from "./hooks/useDevicePerformance.ts";
import type { CharacterVariant } from "./config/characters.ts";
import {
  subscribePlatformDetail,
  type PlatformId,
} from "./utils/platformDetail.ts";
import { startMusic } from "./audio/audioManager.ts";
import { setSfxEnabled } from "./audio/sfxManager.ts";

export default function App() {
  const isMobile = useMobileDetect();
  const quality = useDevicePerformance();
  const [characterVariant, setCharacterVariant] =
    useState<CharacterVariant | null>(null);
  const [entered, setEntered] = useState(false);
  const [openPlatform, setOpenPlatform] = useState<PlatformId | null>(null);
  const [konamiTriggered, setKonamiTriggered] = useState(false);

  useEffect(() => {
    const KONAMI = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let index = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[index]) {
        index++;
        if (index === KONAMI.length) {
          index = 0;
          useGameStore.getState().unlockAchievement("konami-master");
          setKonamiTriggered(true);
          setTimeout(() => setKonamiTriggered(false), 2000);
        }
      } else {
        index = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    return subscribePlatformDetail(
      (platform) => setOpenPlatform(platform),
      () => setOpenPlatform(null),
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed =
        (Date.now() - useGameStore.getState().sessionStart) / 1000;
      if (elapsed >= 300) {
        useGameStore.getState().unlockAchievement("veteran");
      }
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleOverlayClick = useCallback(() => {
    setTimeout(() => (document.activeElement as HTMLElement)?.blur(), 0);
  }, []);

  const handlePortalEnter = useCallback((withMusic: boolean) => {
    setEntered(true);
    if (withMusic) {
      startMusic();
    } else {
      setSfxEnabled(false);
    }
  }, []);

  // Step 1: Character selection
  if (!characterVariant) {
    return <CharacterSelect onSelect={setCharacterVariant} />;
  }

  // Step 2: Intro portal (music choice)
  if (!entered) {
    return <IntroPortal onEnter={handlePortalEnter} />;
  }

  // Step 3: Main experience
  return (
    <KeyboardControls map={keyboardMap}>
      <LoadingScreen />
      <div
        onClickCapture={handleOverlayClick}
        style={{ position: "relative", zIndex: 500 }}
      >
        <TeleportMenu />
        <AudioToggle />
        <button
          tabIndex={-1}
          onClick={() => {
            setCharacterVariant(null);
            setEntered(false);
          }}
          style={{
            position: "fixed",
            top: "16px",
            right: "120px",
            zIndex: 100,
            background: "rgba(0,0,0,0.7)",
            border: "1px solid #ff00ff40",
            color: "#ff00ff",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "12px",
            borderRadius: "4px",
            fontFamily: "'Courier New', monospace",
          }}
        >
          CHARACTER
        </button>
        <ControlsGuide />
        {isMobile && <MobileControls onMove={() => {}} onEnd={() => {}} />}
        <Minimap />
        <AchievementToast />
        <ProgressHUD />
      </div>
      {openPlatform && <DetailOverlay platform={openPlatform} />}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          zIndex: 1,
          isolation: "isolate",
        }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 25, 35], fov: 50 }}
          gl={{ antialias: quality.antialias }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Preload all />
          <Suspense fallback={null}>
            <Scene
              quality={quality}
              characterVariant={characterVariant}
              glitchActive={konamiTriggered}
            />
          </Suspense>
        </Canvas>
      </div>
    </KeyboardControls>
  );
}
