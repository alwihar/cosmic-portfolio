import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlatformForceFieldProps {
  readonly position: [number, number, number];
  readonly size: [number, number];
  readonly rotation?: [number, number, number];
  readonly color?: string;
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uHeight;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  // Hex grid distance function
  float hexDist(vec2 p) {
    p = abs(p);
    return max(dot(p, normalize(vec2(1.0, 1.73))), p.x);
  }

  vec4 hexCoords(vec2 uv) {
    vec2 r = vec2(1.0, 1.73);
    vec2 h = r * 0.5;
    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - h, r) - h;
    vec2 gv = length(a) < length(b) ? a : b;
    float x = atan(gv.x, gv.y);
    float y = 0.5 - hexDist(gv);
    return vec4(gv.x, gv.y, x, y);
  }

  void main() {
    // Scale UVs for hex pattern
    vec2 scaledUv = vUv * vec2(8.0, 4.0);
    vec4 hex = hexCoords(scaledUv);

    // Hex edge glow
    float edge = smoothstep(0.0, 0.08, hex.w) - smoothstep(0.08, 0.12, hex.w);

    // Subtle fill inside hexes
    float fill = smoothstep(0.0, 0.05, hex.w) * 0.05;

    // Scan line moving upward
    float scan = smoothstep(0.0, 0.15, fract(vUv.y * 2.0 - uTime * 0.3));
    scan *= smoothstep(0.3, 0.15, fract(vUv.y * 2.0 - uTime * 0.3));

    // Fade at top and bottom edges
    float vertFade = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);

    // Combine
    float alpha = (edge * 0.35 + fill + scan * 0.15) * vertFade;

    // Slight pulse
    alpha *= 0.7 + 0.3 * sin(uTime * 1.5);

    vec3 finalColor = uColor + edge * 0.5;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export function PlatformForceField({
  position,
  size,
  rotation = [0, 0, 0],
  color = "#00f0ff",
}: PlatformForceFieldProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uHeight: { value: size[1] },
    }),
    [color, size],
  );

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh
      position={position}
      rotation={rotation}
    >
      <planeGeometry args={[size[0], size[1]]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
