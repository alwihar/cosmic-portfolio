import { Float, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { skills } from "../../data/skills";
import type { Skill } from "../../data/skills";
import { PLATFORM_POSITIONS } from "../../utils/positions";
import { openPlatformDetail } from "../../utils/platformDetail";

function SkillCard({
  skill,
  position,
}: {
  readonly skill: Skill;
  readonly position: [number, number, number];
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group
      position={position}
      onClick={() => openPlatformDetail("skills")}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      {/* Hexagonal pedestal */}
      <mesh>
        <cylinderGeometry args={[0.55, 0.65, 0.12, 6]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={0.6}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Rotating neon ring */}
      <mesh
        ref={ringRef}
        position={[0, 0.15, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.6, 0.015, 8, 6]} />
        <meshBasicMaterial
          color={skill.color}
          toneMapped={false}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Skill icon + name label */}
      <Html center position={[0, 1.3, 0]} distanceFactor={10}>
        <div
          style={{
            textAlign: "center",
            userSelect: "none",
            cursor: "pointer",
          }}
          onClick={() => openPlatformDetail("skills")}
        >
          <img
            src={skill.icon}
            alt={skill.name}
            width={40}
            height={40}
            style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.3))" }}
          />
          <div
            style={{
              color: "#e0e0ff",
              fontSize: "11px",
              marginTop: "4px",
              fontFamily: "'Courier New', monospace",
              textShadow: "0 0 6px rgba(0,0,0,0.8)",
            }}
          >
            {skill.name}
          </div>
          <div
            style={{
              width: "52px",
              height: "3px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "2px",
              marginTop: "4px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                width: `${skill.proficiency * 100}%`,
                height: "100%",
                background: skill.color,
                borderRadius: "2px",
                boxShadow: `0 0 6px ${skill.color}`,
              }}
            />
          </div>
        </div>
      </Html>
    </group>
  );
}

export function TechLab() {
  const pos = PLATFORM_POSITIONS.skills;
  const innerRadius = 3.5;
  const outerRadius = 5.5;

  return (
    <group position={[pos.x, pos.y + 0.5, pos.z]}>
      {/* Skills placed on the platform (no Float) */}
      {skills.map((skill, i) => {
        const isInner = i < 5;
        const radius = isInner ? innerRadius : outerRadius;
        const count = isInner ? 5 : skills.length - 5;
        const index = isInner ? i : i - 5;
        const angle =
          (index / count) * Math.PI * 2 + (isInner ? 0 : Math.PI / count);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <SkillCard key={skill.id} skill={skill} position={[x, 0.2, z]} />
        );
      })}

      {/* Center hologram — the only floating element */}
      <Float speed={1} floatIntensity={0.5}>
        <mesh position={[0, 3, 0]}>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={1}
            wireframe
            toneMapped={false}
            transparent
            opacity={0.4}
          />
        </mesh>
        <pointLight
          position={[0, 3, 0]}
          color="#00ff88"
          intensity={1.5}
          distance={8}
        />
      </Float>
    </group>
  );
}
