import { Float, Html } from "@react-three/drei";
import { useGameStore } from "../../store/gameStore";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

const SECRET_POS = { x: -55, y: 0, z: -10 };

export function SecretRoom() {
  const findSecretRoom = useGameStore((s) => s.findSecretRoom);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);

  return (
    <group position={[SECRET_POS.x, SECRET_POS.y, SECRET_POS.z]}>
      {/* Floor */}
      <RigidBody type="fixed">
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[6, 6, 0.5, 6]} />
          <meshStandardMaterial
            color="#0a0a1a"
            emissive="#4400ff"
            emissiveIntensity={0.1}
            metalness={0.8}
          />
        </mesh>
      </RigidBody>

      {/* Entry sensor */}
      <RigidBody type="fixed" sensor>
        <CuboidCollider
          args={[3, 3, 3]}
          onIntersectionEnter={() => {
            findSecretRoom();
            unlockAchievement("secret-finder");
          }}
        />
      </RigidBody>

      <pointLight position={[0, 4, 0]} color="#4400ff" intensity={2} distance={15} />
      <pointLight position={[0, 2, 0]} color="#ff00ff" intensity={1} distance={10} />

      <Float speed={1} floatIntensity={0.3}>
        <Html transform position={[0, 3, 0]} distanceFactor={8}>
          <div
            style={{
              width: "220px",
              padding: "16px",
              background: "rgba(0,0,0,0.9)",
              border: "1px solid rgba(68,0,255,0.3)",
              borderRadius: "8px",
              color: "#e0e0ff",
              fontFamily: "'Courier New', monospace",
              textAlign: "center",
            }}
          >
            <div style={{ color: "#4400ff", fontSize: "14px", fontWeight: "bold", marginBottom: "8px" }}>
              SECRET ROOM
            </div>
            <div style={{ fontSize: "11px", lineHeight: 1.6, opacity: 0.7 }}>
              You found it! Curiosity is the best skill a developer can have. Thanks for exploring every corner.
            </div>
            <div style={{ marginTop: "12px", fontSize: "10px", color: "#ff00ff", opacity: 0.5 }}>
              +100 XP | Achievement Unlocked
            </div>
          </div>
        </Html>
      </Float>

      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <Float key={i} speed={1.5 + i * 0.2} floatIntensity={0.5}>
            <mesh position={[Math.cos(angle) * 4, 1.5 + i * 0.3, Math.sin(angle) * 4]}>
              <octahedronGeometry args={[0.2, 0]} />
              <meshStandardMaterial
                color="#4400ff"
                emissive="#4400ff"
                emissiveIntensity={2}
                toneMapped={false}
                transparent
                opacity={0.6}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}
