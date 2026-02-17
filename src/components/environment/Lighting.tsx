export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.15} color="#4a00e0" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.3}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-20, -5, 0]} intensity={0.5} color="#00f0ff" distance={60} />
      <pointLight position={[20, -5, 0]} intensity={0.5} color="#ff00ff" distance={60} />
      <pointLight position={[0, 15, -40]} intensity={0.3} color="#0040ff" distance={80} />
    </>
  );
}
