export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly category: "frontend" | "backend" | "tools" | "design";
  readonly proficiency: number;
  readonly color: string;
  readonly icon: string;
}

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const skills: readonly Skill[] = [
  { id: "react", name: "React", category: "frontend", proficiency: 0.95, color: "#61DAFB", icon: `${DEVICON_BASE}/react/react-original.svg` },
  { id: "typescript", name: "TypeScript", category: "frontend", proficiency: 0.92, color: "#3178C6", icon: `${DEVICON_BASE}/typescript/typescript-original.svg` },
  { id: "javascript", name: "JavaScript", category: "frontend", proficiency: 0.95, color: "#F7DF1E", icon: `${DEVICON_BASE}/javascript/javascript-original.svg` },
  { id: "nextjs", name: "Next.js", category: "frontend", proficiency: 0.85, color: "#ffffff", icon: `${DEVICON_BASE}/nextjs/nextjs-original.svg` },
  { id: "reactnative", name: "React Native", category: "frontend", proficiency: 0.80, color: "#61DAFB", icon: `${DEVICON_BASE}/react/react-original.svg` },
  { id: "redux", name: "Redux", category: "frontend", proficiency: 0.88, color: "#764ABC", icon: `${DEVICON_BASE}/redux/redux-original.svg` },
  { id: "tailwindcss", name: "Tailwind", category: "frontend", proficiency: 0.85, color: "#06B6D4", icon: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` },
  { id: "aws", name: "AWS", category: "backend", proficiency: 0.75, color: "#FF9900", icon: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  { id: "graphql", name: "GraphQL", category: "backend", proficiency: 0.78, color: "#E10098", icon: `${DEVICON_BASE}/graphql/graphql-plain.svg` },
  { id: "docker", name: "Docker", category: "tools", proficiency: 0.70, color: "#2496ED", icon: `${DEVICON_BASE}/docker/docker-original.svg` },
  { id: "git", name: "Git", category: "tools", proficiency: 0.88, color: "#F05032", icon: `${DEVICON_BASE}/git/git-original.svg` },
  { id: "postgresql", name: "PostgreSQL", category: "backend", proficiency: 0.72, color: "#4169E1", icon: `${DEVICON_BASE}/postgresql/postgresql-original.svg` },
];
