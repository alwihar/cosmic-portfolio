export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly techStack: readonly string[];
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly imageUrl: string;
}

export const projects: readonly Project[] = [
  {
    id: "project-1",
    title: "Project One",
    description: "Description of your first project.",
    techStack: ["React", "TypeScript", "Node.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    imageUrl: "/images/project-1.png",
  },
];
