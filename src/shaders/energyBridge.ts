export const energyBridgeVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const energyBridgeFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  void main() {
    float flow = sin(vUv.x * 30.0 - uTime * 3.0) * 0.5 + 0.5;
    float edgeDist = abs(vUv.y - 0.5) * 2.0;
    float edge = smoothstep(0.3, 1.0, edgeDist);
    float center = 1.0 - smoothstep(0.0, 0.15, abs(vUv.y - 0.5));
    float pulse = sin(vUv.x * 10.0 - uTime * 5.0) * 0.5 + 0.5;
    float intensity = (flow * 0.3 + edge * 0.4 + center * pulse * 0.5) * uIntensity;
    vec3 base = vec3(0.02, 0.02, 0.04);
    vec3 glow = uColor * intensity;
    float alpha = max(intensity * 0.8, 0.15);
    gl_FragColor = vec4(base + glow, alpha);
  }
`;
