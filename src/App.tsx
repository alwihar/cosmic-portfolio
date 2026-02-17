import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        shadows
        camera={{ position: [0, 15, 20], fov: 50 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <mesh>
            <boxGeometry />
            <meshStandardMaterial color="cyan" />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
