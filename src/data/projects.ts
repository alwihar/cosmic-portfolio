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
    id: "sdt-dashboard",
    title: "Property Management Dashboard",
    description:
      "Real-time dashboard for property managers, contractors, and engineers — featuring interactive maps, camera feeds, complex data tables, and automated AWS infrastructure with Pulumi.",
    techStack: ["React", "React Native", "TypeScript", "AWS", "Pulumi"],
    imageUrl: "/images/project-dashboard.png",
  },
  {
    id: "wooskill-builder",
    title: "Landing Page Builder",
    description:
      "Admin platform empowering non-technical teams to create and manage custom landing pages on the main website, with drag-and-drop layouts and multi-language support.",
    techStack: ["React", "PHP", "MySQL", "AWS", "Localize.js"],
    imageUrl: "/images/project-admin.png",
  },
  {
    id: "qiibee-whitelabel",
    title: "Loyalty Whitelabel App",
    description:
      "White-label loyalty mobile application delivered to 13 global clients, featuring NFT integrations, Binance payment gateways, and a seamless end-user rewards experience.",
    techStack: ["React", "Redux", "Rx.js", "Solidity", "Web3"],
    githubUrl: "https://github.com/alwihar/qiibee",
    imageUrl: "/images/project-whitelabel.png",
  },
  {
    id: "qiibee-dashboard",
    title: "Loyalty Admin Dashboard",
    description:
      "Comprehensive admin dashboard for managing loyalty programs across 13 global clients — with a reusable component library, analytics, and campaign management tools.",
    techStack: ["React", "TypeScript", "MUI", "Redux", "Rx.js"],
    githubUrl: "https://github.com/alwihar/qiibee",
    imageUrl: "/images/project-dashboard-loyalty.png",
  },
  {
    id: "cosmic-portfolio",
    title: "Cosmic Portfolio",
    description:
      "This site — a 3D interactive portfolio built with React Three Fiber. Explore floating platforms, walk through bridges, and discover each section in an immersive space environment.",
    techStack: ["React", "Three.js", "Rapier", "TypeScript"],
    githubUrl: "https://github.com/alwihar/3DPortfolio",
    imageUrl: "/images/project-portfolio.png",
  },
];
