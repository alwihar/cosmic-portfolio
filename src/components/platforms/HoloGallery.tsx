import { Float } from "@react-three/drei";
import { HoloPanel } from "../shared/HoloPanel";
import { projects } from "../../data/projects";
import { PLATFORM_POSITIONS } from "../../utils/positions";

export function HoloGallery() {
  const pos = PLATFORM_POSITIONS.projects;
  const spacing = 4;
  const startX = -((projects.length - 1) * spacing) / 2;

  return (
    <group position={[pos.x, pos.y + 0.5, pos.z]}>
      {projects.map((project, i) => (
        <Float key={project.id} speed={1.5} floatIntensity={0.2}>
          <group position={[startX + i * spacing, 2.5, 0]}>
            <mesh>
              <planeGeometry args={[3, 2]} />
              <meshBasicMaterial color="#ff00ff" transparent opacity={0.08} toneMapped={false} />
            </mesh>
            <HoloPanel position={[0, 0, 0.01]} color="#ff00ff" width={260}>
              <div>
                <h3 style={{ color: "#ff00ff", margin: "0 0 6px 0", fontSize: "15px" }}>{project.title}</h3>
                <p style={{ margin: "0 0 8px 0", fontSize: "12px", opacity: 0.8 }}>{project.description}</p>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "8px" }}>
                  {project.techStack.map((tech) => (
                    <span key={tech} style={{ padding: "2px 6px", border: "1px solid #ff00ff40", borderRadius: "4px", fontSize: "10px", color: "#ff88ff" }}>{tech}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#00f0ff", fontSize: "12px" }}>[LIVE]</a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#00ff88", fontSize: "12px" }}>[CODE]</a>
                  )}
                </div>
              </div>
            </HoloPanel>
            <mesh position={[0, -1.8, 0]}>
              <cylinderGeometry args={[0.15, 0.25, 1.5, 8]} />
              <meshStandardMaterial color="#1a1a2e" emissive="#ff00ff" emissiveIntensity={0.3} metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}
