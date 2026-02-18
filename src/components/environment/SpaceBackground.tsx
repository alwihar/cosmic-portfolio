import { Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NebulaCloud({
  position,
  color,
  size,
  opacity,
}: {
  readonly position: [number, number, number];
  readonly color: string;
  readonly size: number;
  readonly opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.01;
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity + Math.sin(clock.getElapsedTime() * 0.3) * 0.02;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function CosmicDust({ count = 300 }: { readonly count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 300;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 200;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 300;
    }
    return arr;
  }, [count]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#4400ff"),
      new THREE.Color("#ff00ff"),
      new THREE.Color("#00f0ff"),
      new THREE.Color("#0044ff"),
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.003;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        toneMapped={false}
        depthWrite={false}
      />
    </points>
  );
}

export function SpaceBackground() {
  const starsRef = useRef<THREE.Points>(null);
  const starsRef2 = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.003;
    }
    if (starsRef2.current) {
      starsRef2.current.rotation.y -= delta * 0.001;
      starsRef2.current.rotation.x += delta * 0.001;
    }
  });

  return (
    <>
      {/* Primary star field — dense, close */}
      <Stars
        ref={starsRef}
        radius={150}
        depth={80}
        count={8000}
        factor={4}
        saturation={0.3}
        fade
        speed={0.3}
      />
      {/* Secondary star field — sparse, distant, larger */}
      <Stars
        ref={starsRef2}
        radius={300}
        depth={150}
        count={4000}
        factor={7}
        saturation={0.6}
        fade
        speed={0.1}
      />
      {/* Nebula clouds */}
      <NebulaCloud position={[-80, 30, -120]} color="#2200aa" size={60} opacity={0.06} />
      <NebulaCloud position={[100, -20, -150]} color="#aa0066" size={50} opacity={0.05} />
      <NebulaCloud position={[-40, 60, -80]} color="#0044aa" size={45} opacity={0.04} />
      <NebulaCloud position={[60, -40, -200]} color="#440088" size={70} opacity={0.05} />
      <NebulaCloud position={[0, 50, -250]} color="#003366" size={80} opacity={0.03} />
      {/* Cosmic dust particles */}
      <CosmicDust count={400} />
    </>
  );
}
