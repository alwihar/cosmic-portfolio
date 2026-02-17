import { Canvas } from "@react-three/fiber";
import {
  KeyboardControls,
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
} from "@react-three/drei";
import { Suspense } from "react";
import { Scene } from "./components/Scene";
import { keyboardMap } from "./config/controls.ts";
import { LoadingScreen } from "./components/ui/LoadingScreen.tsx";
import { TeleportMenu } from "./components/ui/TeleportMenu.tsx";
import { MobileControls } from "./components/ui/MobileControls.tsx";
import { Minimap } from "./components/ui/Minimap.tsx";
import { useMobileDetect } from "./hooks/useMobileDetect.ts";
import { useDevicePerformance } from "./hooks/useDevicePerformance.ts";

export default function App() {
  const isMobile = useMobileDetect();
  const quality = useDevicePerformance();

  return (
    <KeyboardControls map={keyboardMap}>
      <LoadingScreen />
      <TeleportMenu onTeleport={() => {}} />
      {isMobile && <MobileControls onMove={() => {}} onEnd={() => {}} />}
      <Minimap />
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          shadows
          camera={{ position: [0, 25, 35], fov: 50 }}
          gl={{ antialias: quality.antialias }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Preload all />
          <Suspense fallback={null}>
            <Scene quality={quality} />
          </Suspense>
        </Canvas>
      </div>
    </KeyboardControls>
  );
}
