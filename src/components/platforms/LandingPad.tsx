import { Text3D, Center, Float } from "@react-three/drei";
import { HoloPanel } from "../shared/HoloPanel";
import { profile } from "../../data/profile";
import { PLATFORM_POSITIONS } from "../../utils/positions";

export function LandingPad() {
  const pos = PLATFORM_POSITIONS.landing;

  return (
    <group position={[pos.x, pos.y + 0.5, pos.z]}>
      <Float speed={1.5} floatIntensity={0.5}>
        <Center position={[0, 4, 0]}>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={1.2}
            height={0.3}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.01}
          >
            {profile.name}
            <meshBasicMaterial color="#00f0ff" toneMapped={false} />
          </Text3D>
        </Center>
      </Float>

      <Float speed={1.5} floatIntensity={0.3}>
        <Center position={[0, 2.5, 0]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.4}
            height={0.1}
          >
            {profile.title}
            <meshBasicMaterial color="#ff00ff" toneMapped={false} />
          </Text3D>
        </Center>
      </Float>

      <HoloPanel position={[-4, 2, 2]} color="#00f0ff" width={220}>
        <div>
          <h3 style={{ color: "#00f0ff", margin: "0 0 8px 0", fontSize: "14px" }}>// ABOUT</h3>
          <p style={{ margin: 0, lineHeight: 1.5 }}>{profile.bio}</p>
        </div>
      </HoloPanel>

      <HoloPanel position={[4, 2, 2]} color="#ff00ff" width={220}>
        <div>
          <h3 style={{ color: "#ff00ff", margin: "0 0 8px 0", fontSize: "14px" }}>// HIGHLIGHTS</h3>
          <ul style={{ margin: 0, paddingLeft: "16px", lineHeight: 1.8 }}>
            {profile.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </HoloPanel>
    </group>
  );
}
