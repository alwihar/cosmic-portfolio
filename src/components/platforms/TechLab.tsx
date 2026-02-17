import { Float, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { skills } from "../../data/skills";
import { PLATFORM_POSITIONS } from "../../utils/positions";

function SkillOrb({ skill, position }: { skill: typeof skills[number]; position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  const size = 0.3 + skill.proficiency * 0.3;

  return (
    <Float speed={2} floatIntensity={0.4} rotationIntensity={0.2}>
      <group ref={groupRef} position={position}>
        <mesh>
          <torusGeometry args={[size + 0.15, 0.02, 8, 32]} />
          <meshBasicMaterial color={skill.color} toneMapped={false} transparent opacity={0.6} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[size, 1]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={skill.proficiency * 1.5}
            toneMapped={false}
            wireframe
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[size * 0.6, 1]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
            toneMapped={false}
          />
        </mesh>
        <Text
          position={[0, -size - 0.4, 0]}
          fontSize={0.25}
          color="#e0e0ff"
          anchorX="center"
          anchorY="top"
        >
          {skill.name}
        </Text>
      </group>
    </Float>
  );
}

export function TechLab() {
  const pos = PLATFORM_POSITIONS.skills;
  const radius = 4;

  return (
    <group position={[pos.x, pos.y + 0.5, pos.z]}>
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <SkillOrb key={skill.id} skill={skill} position={[x, 2, z]} />
        );
      })}
    </group>
  );
}
