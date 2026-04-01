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
    title: "Property Management Dashboard",
    description:
      "Real-time dashboard for property managers, contractors, and engineers — featuring interactive maps, camera feeds, complex data tables, and automated AWS infrastructure with Pulumi.",
    techStack: ["React", "React Native", "TypeScript", "AWS", "Pulumi"],
    imageUrl: "/images/project-dashboard.png",
    type: "major",
  },
  {
    id: "wooskill-builder",
    title: "Landing Page Builder",
    description:
      "Admin platform empowering non-technical teams to create and manage custom landing pages on the main website, with drag-and-drop layouts and multi-language support.",
    techStack: ["React", "PHP", "MySQL", "AWS", "Localize.js"],
    imageUrl: "/images/project-admin.png",
    type: "major",
  },
  {
    id: "qiibee-whitelabel",
    title: "Loyalty Whitelabel App",
    description:
      "White-label loyalty mobile application delivered to 13 global clients, featuring NFT integrations, Binance payment gateways, and a seamless end-user rewards experience.",
    techStack: ["React", "Redux", "Rx.js", "Solidity", "Web3"],
    githubUrl: "https://github.com/alwihar/qiibee",
    imageUrl: "/images/project-whitelabel.png",
    type: "major",
  },
  {
    id: "qiibee-dashboard",
    title: "Loyalty Admin Dashboard",
    description:
      "Comprehensive admin dashboard for managing loyalty programs across 13 global clients — with a reusable component library, analytics, and campaign management tools.",
    techStack: ["React", "TypeScript", "MUI", "Redux", "Rx.js"],
    githubUrl: "https://github.com/alwihar/qiibee",
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
    id: "audio-interleave",
    title: "Audio Text Interleave",
    description:
      "React Native app that syncs audio playback with bilingual transcripts — tap phrases to jump, highlight in real-time. Built for language learning.",
    techStack: ["React Native", "TypeScript"],
    liveUrl: "https://audio-text-interleave-app.vercel.app",
    githubUrl: "https://github.com/alwihar/AudioTextInterleaveApp",
    imageUrl: "/images/project-audio.png",
    type: "side",
  },
  {
    id: "banking-app",
    title: "Banking App",
    description:
      "Modern banking interface with account management, transactions, and financial dashboards.",
    techStack: ["TypeScript", "React", "CSS"],
    githubUrl: "https://github.com/alwihar/banking_app",
    imageUrl: "/images/project-banking.png",
    type: "side",
  },
  {
    id: "colony-dapp",
    title: "Colony dApp",
    description:
      "Decentralized application demo featuring React, GraphQL, Docker, Redux Saga, and Ganache for Ethereum blockchain simulation.",
    techStack: ["TypeScript", "React", "GraphQL", "Docker"],
    githubUrl: "https://github.com/alwihar/Colony",
    imageUrl: "/images/project-colony.png",
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
  {
    id: "job-search",
    title: "Job Search App",
    description:
      "React Native mobile app using a job search API to show popular and nearby listings with keyword search.",
    techStack: ["React Native", "JavaScript"],
    githubUrl: "https://github.com/alwihar/JobSearch",
    imageUrl: "/images/project-jobsearch.png",
    type: "side",
  },
];
