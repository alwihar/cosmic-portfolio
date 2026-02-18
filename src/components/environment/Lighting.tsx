export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.6} color="#b0b0ff" />
      <hemisphereLight
        color="#c0c0ff"
        groundColor="#201030"
        intensity={0.5}
      />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-20, 10, 0]} intensity={0.8} color="#00f0ff" distance={80} />
      <pointLight position={[20, 10, 0]} intensity={0.8} color="#ff00ff" distance={80} />
      <pointLight position={[0, 15, -40]} intensity={0.5} color="#0040ff" distance={100} />
    </>
  );
}
