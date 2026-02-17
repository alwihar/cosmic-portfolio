export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly category: "frontend" | "backend" | "tools" | "design";
  readonly proficiency: number;
  readonly color: string;
}

export const skills: readonly Skill[] = [
  { id: "react", name: "React", category: "frontend", proficiency: 0.95, color: "#61DAFB" },
  { id: "typescript", name: "TypeScript", category: "frontend", proficiency: 0.9, color: "#3178C6" },
  { id: "threejs", name: "Three.js", category: "frontend", proficiency: 0.7, color: "#000000" },
  { id: "nodejs", name: "Node.js", category: "backend", proficiency: 0.8, color: "#339933" },
  { id: "css", name: "CSS", category: "frontend", proficiency: 0.9, color: "#1572B6" },
  { id: "git", name: "Git", category: "tools", proficiency: 0.85, color: "#F05032" },
];
