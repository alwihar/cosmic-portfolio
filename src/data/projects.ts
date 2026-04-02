export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly techStack: readonly string[];
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly imageUrl: string;
  readonly type: "major" | "side";
}

export const projects: readonly Project[] = [
  // ── Major Projects (from CV / professional work) ──
  {
    id: "sdt-dashboard",
    title: "Main10 — Property Management",
    description:
      "Real-time dashboard for property managers, contractors, and engineers — featuring interactive maps (Mapbox, Google Maps), camera feeds, complex data tables, and automated AWS infrastructure with Pulumi across 3 deployment stacks.",
    techStack: ["React", "TypeScript", "AWS", "Pulumi", "Mapbox"],
    liveUrl: "https://app.main-10.com/",
    imageUrl: "/images/project-dashboard.png",
    type: "major",
  },
  {
    id: "wooskill",
    title: "Wooskill — Skills Sharing Platform",
    description:
      "Educational marketplace connecting learners with expert instructors for live sessions. Built front-end features, custom landing page builder, multi-language support with Localize.js, and refactored pages for 25% better user satisfaction.",
    techStack: ["React", "PHP", "MySQL", "AWS", "Localize.js"],
    liveUrl: "https://wooskill.com",
    imageUrl: "/images/project-admin.png",
    type: "major",
  },
  {
    id: "qiibee-whitelabel",
    title: "Loyalty Whitelabel App",
    description:
      "White-label loyalty mobile application delivered to 13 global clients, featuring NFT integrations, Binance payment gateways, and a seamless end-user rewards experience.",
    techStack: ["React", "Redux", "Rx.js", "Solidity", "Web3"],
    liveUrl: "https://rewards.qiibee.com/",
    imageUrl: "/images/project-whitelabel.png",
    type: "major",
  },
  {
    id: "qiibee-dashboard",
    title: "Loyalty Admin Dashboard",
    description:
      "Comprehensive admin dashboard for managing loyalty programs across 13 global clients — with a reusable component library, analytics, and campaign management tools.",
    techStack: ["React", "TypeScript", "MUI", "Redux", "Rx.js"],
    liveUrl: "https://dashboard.qiibee.com/",
    imageUrl: "/images/project-dashboard-loyalty.png",
    type: "major",
  },
  {
    id: "cosmic-portfolio",
    title: "Cosmic Portfolio",
    description:
      "This site — a 3D interactive portfolio built with React Three Fiber. Explore floating platforms, walk through bridges, and discover each section in an immersive space environment.",
    techStack: ["React", "Three.js", "Rapier", "TypeScript"],
    liveUrl: "https://alwi.me",
    githubUrl: "https://github.com/alwihar/cosmic-portfolio",
    imageUrl: "/images/project-portfolio.png",
    type: "major",
  },

  // ── Side Projects (personal / smaller) ──
  {
    id: "corecraft",
    title: "CoreCraft",
    description:
      "Business website for a creative agency, built with modern web stack and deployed with custom domain.",
    techStack: ["TypeScript", "Next.js"],
    liveUrl: "https://www.corecraft.am",
    imageUrl: "/images/project-corecraft.png",
    type: "side",
  },
  {
    id: "don-portfolio",
    title: "Don's Portfolio",
    description:
      "Clean portfolio website built for a client, featuring responsive design and smooth animations.",
    techStack: ["JavaScript", "CSS", "HTML"],
    liveUrl: "https://donavon.me",
    githubUrl: "https://github.com/alwihar/don-portfolio",
    imageUrl: "/images/project-don.png",
    type: "side",
  },
  {
    id: "old-portfolio",
    title: "Portfolio v1",
    description:
      "Original portfolio website showcasing the journey as a Frontend Developer and Artist, with SCSS animations.",
    techStack: ["JavaScript", "SCSS", "HTML"],
    githubUrl: "https://github.com/alwihar/portfolio",
    imageUrl: "/images/project-old-portfolio.png",
    type: "side",
  },
];
