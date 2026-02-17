export const neonEdgeVertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  void main() {
    vPosition = position;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const neonEdgeFragmentShader = `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    float edge = 1.0 - abs(dot(vNormal, vec3(0.0, 1.0, 0.0)));
    edge = smoothstep(0.4, 1.0, edge);
    vec3 glow = uColor * edge * uIntensity;
    vec3 base = vec3(0.02, 0.02, 0.04);
    gl_FragColor = vec4(base + glow, 1.0);
  }
`;
