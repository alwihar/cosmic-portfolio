import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";
import { CHARACTERS } from "../../config/characters.ts";

const IDLE_BOB_THRESHOLD = 3;
const IDLE_PULSE_THRESHOLD = 8;
const POSITION_EPSILON = 0.001;

interface CharacterProps {
  readonly variant?: string;
}

/* ── Astronaut: round helmet, bulky suit, golden visor, jetpack ── */
function Astronaut({
  c,
}: {
  readonly c: (typeof CHARACTERS)[number]["colors"];
}) {
  const visorRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Mesh>(null);
  const jetLeftRef = useRef<THREE.PointLight>(null);
  const jetRightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (antennaRef.current)
      antennaRef.current.rotation.z = Math.sin(t * 3) * 0.15;
    if (visorRef.current) {
      const mat = visorRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(t * 2) * 0.5;
    }
    if (jetLeftRef.current && jetRightRef.current) {
      const f = 0.8 + Math.sin(t * 8) * 0.2;
      jetLeftRef.current.intensity = f;
      jetRightRef.current.intensity = f;
    }
  });

  return (
    <group>
      {/* Bulky body */}
      <mesh castShadow>
        <capsuleGeometry args={[0.27, 0.4, 8, 16]} />
        <meshStandardMaterial color={c.body} metalness={0.1} roughness={0.6} />
      </mesh>
      {/* Chest badge */}
      <mesh position={[0, 0.08, 0.24]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 6]} />
        <meshStandardMaterial
          color={c.stripe}
          emissive={c.stripe}
          emissiveIntensity={1}
        />
      </mesh>
      {/* Belt */}
      <mesh position={[0, -0.18, 0]}>
        <torusGeometry args={[0.28, 0.03, 8, 24]} />
        <meshStandardMaterial
          color={c.accent}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Round helmet */}
      <mesh castShadow position={[0, 0.58, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={c.head} metalness={0.2} roughness={0.4} />
      </mesh>
      {/* Golden visor */}
      <mesh ref={visorRef} position={[0, 0.56, 0.22]}>
        <sphereGeometry args={[0.2, 16, 16, 0, Math.PI, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={c.visor}
          emissive={c.visorEmissive}
          emissiveIntensity={1.5}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Helmet rim */}
      <mesh position={[0, 0.46, 0]}>
        <torusGeometry args={[0.29, 0.025, 8, 24]} />
        <meshStandardMaterial color="#b0b0b8" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Antenna */}
      <group ref={antennaRef} position={[0.15, 0.85, 0]}>
        <mesh>
          <cylinderGeometry args={[0.012, 0.012, 0.18, 8]} />
          <meshStandardMaterial
            color="#b0b0b8"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
        <Float speed={6} floatIntensity={0.3} floatingRange={[0, 0.05]}>
          <mesh position={[0, 0.14, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color={c.antenna}
              emissive={c.antenna}
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        </Float>
      </group>
      {/* Arms — thick gloves */}
      <group position={[-0.35, 0.05, 0]} rotation={[0, 0, 0.15]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.09, 0.25, 6, 12]} />
          <meshStandardMaterial
            color={c.body}
            metalness={0.1}
            roughness={0.6}
          />
        </mesh>
        <mesh position={[0, -0.22, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color={c.accent}
            metalness={0.3}
            roughness={0.5}
          />
        </mesh>
      </group>
      <group position={[0.35, 0.05, 0]} rotation={[0, 0, -0.15]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.09, 0.25, 6, 12]} />
          <meshStandardMaterial
            color={c.body}
            metalness={0.1}
            roughness={0.6}
          />
        </mesh>
        <mesh position={[0, -0.22, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color={c.accent}
            metalness={0.3}
            roughness={0.5}
          />
        </mesh>
      </group>
      {/* Legs + boots */}
      <mesh castShadow position={[-0.13, -0.42, 0]}>
        <capsuleGeometry args={[0.09, 0.2, 6, 12]} />
        <meshStandardMaterial color={c.body} metalness={0.1} roughness={0.6} />
      </mesh>
      <mesh position={[-0.13, -0.6, 0.03]}>
        <boxGeometry args={[0.16, 0.09, 0.22]} />
        <meshStandardMaterial
          color={c.accent}
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>
      <mesh castShadow position={[0.13, -0.42, 0]}>
        <capsuleGeometry args={[0.09, 0.2, 6, 12]} />
        <meshStandardMaterial color={c.body} metalness={0.1} roughness={0.6} />
      </mesh>
      <mesh position={[0.13, -0.6, 0.03]}>
        <boxGeometry args={[0.16, 0.09, 0.22]} />
        <meshStandardMaterial
          color={c.accent}
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>
      {/* Jetpack */}
      <mesh castShadow position={[0, 0.05, -0.3]}>
        <boxGeometry args={[0.32, 0.38, 0.16]} />
        <meshStandardMaterial
          color={c.backpack}
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>
      <group position={[-0.12, -0.17, -0.34]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.035, 0.12, 8]} />
          <meshStandardMaterial
            color="#607090"
            emissive={c.jet}
            emissiveIntensity={1.2}
            metalness={0.6}
          />
        </mesh>
        <pointLight
          ref={jetLeftRef}
          position={[0, -0.08, 0]}
          color={c.jet}
          intensity={0.8}
          distance={1.5}
        />
      </group>
      <group position={[0.12, -0.17, -0.34]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.035, 0.12, 8]} />
          <meshStandardMaterial
            color="#607090"
            emissive={c.jet}
            emissiveIntensity={1.2}
            metalness={0.6}
          />
        </mesh>
        <pointLight
          ref={jetRightRef}
          position={[0, -0.08, 0]}
          color={c.jet}
          intensity={0.8}
          distance={1.5}
        />
      </group>
      <mesh position={[0, 0.05, -0.38]}>
        <boxGeometry args={[0.24, 0.04, 0.01]} />
        <meshStandardMaterial
          color={c.stripe}
          emissive={c.stripe}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ── Robot: box monitor head, angular body, mechanical limbs ── */
function Robot({ c }: { readonly c: (typeof CHARACTERS)[number]["colors"] }) {
  const screenRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.2 + Math.sin(t * 3) * 0.4;
    }
    if (antennaRef.current) {
      antennaRef.current.rotation.y = t * 2;
    }
  });

  return (
    <group>
      {/* Boxy torso */}
      <mesh castShadow>
        <boxGeometry args={[0.45, 0.55, 0.3]} />
        <meshStandardMaterial color={c.body} metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Chest panel */}
      <mesh position={[0, 0.05, 0.151]}>
        <boxGeometry args={[0.3, 0.2, 0.01]} />
        <meshStandardMaterial
          color={c.stripe}
          emissive={c.stripe}
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Circuit lines on body */}
      {[-0.08, 0.08].map((y) => (
        <mesh key={y} position={[0, y, 0.152]}>
          <boxGeometry args={[0.25, 0.015, 0.005]} />
          <meshBasicMaterial color={c.stripe} toneMapped={false} />
        </mesh>
      ))}
      {/* Box head (monitor) */}
      <mesh castShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[0.38, 0.32, 0.3]} />
        <meshStandardMaterial color={c.head} metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Screen face */}
      <mesh ref={screenRef} position={[0, 0.55, 0.151]}>
        <boxGeometry args={[0.3, 0.22, 0.01]} />
        <meshStandardMaterial
          color={c.visor}
          emissive={c.visorEmissive}
          emissiveIntensity={1.2}
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>
      {/* Eye dots on screen */}
      <mesh position={[-0.07, 0.58, 0.162]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <mesh position={[0.07, 0.58, 0.162]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      {/* Spinning antenna array */}
      <group ref={antennaRef} position={[0, 0.76, 0]}>
        <mesh>
          <cylinderGeometry args={[0.015, 0.015, 0.1, 6]} />
          <meshStandardMaterial color="#808090" metalness={0.8} />
        </mesh>
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.08, 0.06, Math.sin(a) * 0.08]}
            >
              <sphereGeometry args={[0.025, 6, 6]} />
              <meshStandardMaterial
                color={c.antenna}
                emissive={c.antenna}
                emissiveIntensity={2}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>
      {/* Mechanical arms — pistons */}
      <group position={[-0.32, 0.05, 0]} rotation={[0, 0, 0.1]}>
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.35, 0.12]} />
          <meshStandardMaterial
            color={c.body}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        {/* Elbow joint */}
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 8]} />
          <meshStandardMaterial
            color={c.accent}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>
        {/* Claw hand */}
        <mesh position={[-0.03, -0.25, 0]}>
          <boxGeometry args={[0.04, 0.1, 0.08]} />
          <meshStandardMaterial color={c.accent} metalness={0.6} />
        </mesh>
        <mesh position={[0.03, -0.25, 0]}>
          <boxGeometry args={[0.04, 0.1, 0.08]} />
          <meshStandardMaterial color={c.accent} metalness={0.6} />
        </mesh>
      </group>
      <group position={[0.32, 0.05, 0]} rotation={[0, 0, -0.1]}>
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.35, 0.12]} />
          <meshStandardMaterial
            color={c.body}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 8]} />
          <meshStandardMaterial
            color={c.accent}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[-0.03, -0.25, 0]}>
          <boxGeometry args={[0.04, 0.1, 0.08]} />
          <meshStandardMaterial color={c.accent} metalness={0.6} />
        </mesh>
        <mesh position={[0.03, -0.25, 0]}>
          <boxGeometry args={[0.04, 0.1, 0.08]} />
          <meshStandardMaterial color={c.accent} metalness={0.6} />
        </mesh>
      </group>
      {/* Treads / legs */}
      <mesh castShadow position={[-0.14, -0.42, 0]}>
        <boxGeometry args={[0.13, 0.28, 0.16]} />
        <meshStandardMaterial color={c.body} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[-0.14, -0.58, 0]}>
        <boxGeometry args={[0.16, 0.06, 0.2]} />
        <meshStandardMaterial
          color={c.accent}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh castShadow position={[0.14, -0.42, 0]}>
        <boxGeometry args={[0.13, 0.28, 0.16]} />
        <meshStandardMaterial color={c.body} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0.14, -0.58, 0]}>
        <boxGeometry args={[0.16, 0.06, 0.2]} />
        <meshStandardMaterial
          color={c.accent}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Back power core */}
      <mesh castShadow position={[0, 0.1, -0.2]}>
        <cylinderGeometry args={[0.14, 0.14, 0.4, 8]} />
        <meshStandardMaterial
          color={c.backpack}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0.1, -0.32]}>
        <torusGeometry args={[0.14, 0.02, 6, 16]} />
        <meshStandardMaterial
          color={c.stripe}
          emissive={c.stripe}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ── Alien: tall/slim, dome head, big eyes, tentacle arms, organic ── */
function Alien({ c }: { readonly c: (typeof CHARACTERS)[number]["colors"] }) {
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const tentLRef = useRef<THREE.Group>(null);
  const tentRRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (eyeLeftRef.current) {
      const mat = eyeLeftRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2 + Math.sin(t * 1.5) * 0.8;
    }
    if (eyeRightRef.current) {
      const mat = eyeRightRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2 + Math.sin(t * 1.5 + 0.5) * 0.8;
    }
    if (tentLRef.current) {
      tentLRef.current.rotation.z = 0.3 + Math.sin(t * 2) * 0.15;
      tentLRef.current.rotation.x = Math.sin(t * 1.5) * 0.1;
    }
    if (tentRRef.current) {
      tentRRef.current.rotation.z = -0.3 + Math.sin(t * 2 + 1) * 0.15;
      tentRRef.current.rotation.x = Math.sin(t * 1.5 + 1) * 0.1;
    }
  });

  return (
    <group>
      {/* Slim organic torso */}
      <mesh castShadow>
        <capsuleGeometry args={[0.18, 0.5, 8, 16]} />
        <meshStandardMaterial color={c.body} metalness={0.05} roughness={0.8} />
      </mesh>
      {/* Belly glow marking */}
      <mesh position={[0, -0.05, 0.16]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial
          color={c.stripe}
          emissive={c.stripe}
          emissiveIntensity={1.5}
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </mesh>
      {/* Big dome head */}
      <mesh castShadow position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color={c.head} metalness={0.05} roughness={0.7} />
      </mesh>
      {/* Forehead ridge */}
      <mesh position={[0, 0.78, 0]}>
        <sphereGeometry args={[0.18, 12, 12, 0, Math.PI * 2, 0, Math.PI / 3]} />
        <meshStandardMaterial color={c.head} metalness={0.05} roughness={0.7} />
      </mesh>
      {/* Big left eye */}
      <mesh ref={eyeLeftRef} position={[-0.12, 0.62, 0.24]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial
          color={c.visor}
          emissive={c.visorEmissive}
          emissiveIntensity={2}
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>
      {/* Pupil left */}
      <mesh position={[-0.11, 0.62, 0.335]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {/* Big right eye */}
      <mesh ref={eyeRightRef} position={[0.12, 0.62, 0.24]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial
          color={c.visor}
          emissive={c.visorEmissive}
          emissiveIntensity={2}
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>
      {/* Pupil right */}
      <mesh position={[0.11, 0.62, 0.335]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {/* Small mouth */}
      <mesh position={[0, 0.48, 0.28]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#1a4a2a" />
      </mesh>
      {/* Head spots */}
      {[
        [-0.2, 0.72, 0.1],
        [0.22, 0.7, 0.05],
        [0, 0.82, -0.1],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshStandardMaterial
            color={c.accent}
            emissive={c.accent}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      {/* Tentacle left arm */}
      <group ref={tentLRef} position={[-0.25, 0.1, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.055, 0.2, 6, 12]} />
          <meshStandardMaterial
            color={c.body}
            metalness={0.05}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0, -0.2, 0]} rotation={[0, 0, 0.2]}>
          <capsuleGeometry args={[0.04, 0.18, 6, 12]} />
          <meshStandardMaterial
            color={c.body}
            metalness={0.05}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[-0.03, -0.38, 0]}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshStandardMaterial
            color={c.accent}
            emissive={c.accent}
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>
      </group>
      {/* Tentacle right arm */}
      <group ref={tentRRef} position={[0.25, 0.1, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.055, 0.2, 6, 12]} />
          <meshStandardMaterial
            color={c.body}
            metalness={0.05}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0, -0.2, 0]} rotation={[0, 0, -0.2]}>
          <capsuleGeometry args={[0.04, 0.18, 6, 12]} />
          <meshStandardMaterial
            color={c.body}
            metalness={0.05}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0.03, -0.38, 0]}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshStandardMaterial
            color={c.accent}
            emissive={c.accent}
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>
      </group>
      {/* Thin legs */}
      <mesh castShadow position={[-0.09, -0.45, 0]}>
        <capsuleGeometry args={[0.055, 0.25, 6, 12]} />
        <meshStandardMaterial color={c.body} metalness={0.05} roughness={0.8} />
      </mesh>
      <mesh position={[-0.09, -0.62, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={c.accent} />
      </mesh>
      <mesh castShadow position={[0.09, -0.45, 0]}>
        <capsuleGeometry args={[0.055, 0.25, 6, 12]} />
        <meshStandardMaterial color={c.body} metalness={0.05} roughness={0.8} />
      </mesh>
      <mesh position={[0.09, -0.62, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={c.accent} />
      </mesh>
      {/* Organic backpack / shell */}
      <mesh castShadow position={[0, 0.1, -0.22]}>
        <sphereGeometry
          args={[0.16, 12, 12, 0, Math.PI * 2, 0, Math.PI / 1.5]}
        />
        <meshStandardMaterial
          color={c.backpack}
          metalness={0.05}
          roughness={0.7}
        />
      </mesh>
      {/* Floating energy orbs */}
      <Float speed={4} floatIntensity={0.5} floatingRange={[-0.05, 0.05]}>
        <mesh position={[-0.3, 0.5, 0.15]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshStandardMaterial
            color={c.antenna}
            emissive={c.antenna}
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
      </Float>
      <Float speed={3} floatIntensity={0.5} floatingRange={[-0.05, 0.05]}>
        <mesh position={[0.3, 0.45, 0.1]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial
            color={c.antenna}
            emissive={c.antenna}
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
      </Float>
      <Float speed={5} floatIntensity={0.4} floatingRange={[-0.04, 0.04]}>
        <mesh position={[0.05, 0.95, -0.1]}>
          <sphereGeometry args={[0.018, 6, 6]} />
          <meshStandardMaterial
            color={c.antenna}
            emissive={c.antenna}
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ── Dispatch ── */
export function Character({ variant = "astronaut" }: CharacterProps) {
  const info = CHARACTERS.find((c) => c.id === variant) ?? CHARACTERS[0];
  const groupRef = useRef<THREE.Group>(null);
  const prevPos = useRef(new THREE.Vector3());
  const idleTimer = useRef(0);
  const baseEmissives = useRef<Map<THREE.MeshStandardMaterial, number>>(
    new Map(),
  );
  const emissivesCollected = useRef(false);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Track world position to detect movement
    const worldPos = group.getWorldPosition(new THREE.Vector3());
    const dist = worldPos.distanceTo(prevPos.current);
    prevPos.current.copy(worldPos);

    if (dist > POSITION_EPSILON) {
      // Character moved — reset idle
      idleTimer.current = 0;
      group.position.y = 0;
      group.rotation.z = 0;

      // Reset emissive intensities to base values
      if (emissivesCollected.current) {
        baseEmissives.current.forEach((base, mat) => {
          mat.emissiveIntensity = base;
        });
      }
      emissivesCollected.current = false;
      baseEmissives.current.clear();
      return;
    }

    idleTimer.current += delta;
    const t = clock.getElapsedTime();

    // After 3s idle: gentle vertical bob + subtle body sway
    if (idleTimer.current >= IDLE_BOB_THRESHOLD) {
      group.position.y = Math.sin(t * 1.5) * 0.03;
      group.rotation.z = Math.sin(t * 0.8) * 0.02;
    }

    // After 8s idle: pulse emissive intensity on visor/accent elements
    if (idleTimer.current >= IDLE_PULSE_THRESHOLD) {
      if (!emissivesCollected.current) {
        emissivesCollected.current = true;
        baseEmissives.current.clear();
        group.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const mat = child.material as THREE.MeshStandardMaterial;
            if (mat.emissiveIntensity && mat.emissiveIntensity > 0) {
              baseEmissives.current.set(mat, mat.emissiveIntensity);
            }
          }
        });
      }

      const pulse = 1 + Math.sin(t * 2) * 0.3;
      baseEmissives.current.forEach((base, mat) => {
        mat.emissiveIntensity = base * pulse;
      });
    }
  });

  const variantNode = useMemo(() => {
    switch (info.id) {
      case "robot":
        return <Robot c={info.colors} />;
      case "alien":
        return <Alien c={info.colors} />;
      default:
        return <Astronaut c={info.colors} />;
    }
  }, [info.id, info.colors]);

  return <group ref={groupRef}>{variantNode}</group>;
}
