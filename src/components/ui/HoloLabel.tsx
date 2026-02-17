import { Text, Billboard } from "@react-three/drei";

interface HoloLabelProps {
  readonly position: [number, number, number];
  readonly text: string;
  readonly color?: string;
}

export function HoloLabel({ position, text, color = "#00f0ff" }: HoloLabelProps) {
  return (
    <Billboard position={position} follow lockX={false} lockY={false} lockZ={false}>
      <Text fontSize={0.6} color={color} anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#000000">
        {text}
      </Text>
      <mesh position={[0, -0.45, 0]}>
        <planeGeometry args={[text.length * 0.35, 0.03]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </Billboard>
  );
}
