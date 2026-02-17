import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Suspense } from "react";
import { Scene } from "./components/Scene";
import { keyboardMap } from "./config/controls.ts";
import { LoadingScreen } from "./components/ui/LoadingScreen.tsx";
import { TeleportMenu } from "./components/ui/TeleportMenu.tsx";

export default function App() {
  return (
    <KeyboardControls map={keyboardMap}>
      <LoadingScreen />
      <TeleportMenu onTeleport={() => {}} />
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          shadows
          camera={{ position: [0, 25, 35], fov: 50 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </KeyboardControls>
  );
}
