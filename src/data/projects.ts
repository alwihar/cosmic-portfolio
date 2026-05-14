export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly techStack: readonly string[];
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly imageUrl: string;
  readonly images?: readonly string[];
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
    imageUrl: "/images/main10/overview.png",
    images: [
      "/images/main10/overview.png",
      "/images/main10/compliance.png",
      "/images/main10/issues.png",
      "/images/main10/inquiries.png",
      "/images/main10/blocks.png",
      "/images/main10/time-tracking.png",
      "/images/main10/account.png",
    ],
    type: "major",
  },
  {
    id: "sdt-infrastructure",
    title: "SDT Infrastructure (Pulumi)",
    description:
      "AWS infrastructure-as-code for a multi-product SaaS — managing S3, CloudFront, Lambda, Elastic Beanstalk, ECR, ACM, Route53, and MediaConvert across dev/prod. Config-driven with per-environment YAML, cross-stack references, and CI/CD with auto-discovery preview and deploy-on-merge via GitHub Actions.",
    techStack: ["Pulumi", "TypeScript", "AWS", "GitHub Actions"],
    imageUrl: "/images/main10/overview.png",
    type: "major",
  },
  {
    id: "wooskill",
    title: "Wooskill — Skills Sharing Platform",
    description:
      "Educational marketplace connecting learners with expert instructors for live sessions. Built front-end features, custom landing page builder, multi-language support with Localize.js, and refactored pages for 25% better user satisfaction.",
    techStack: ["React", "PHP", "MySQL", "AWS", "Localize.js"],
    liveUrl: "https://wooskill.com",
    imageUrl: "/images/wooskill/1-listings.png",
    images: [
      "/images/wooskill/1-listings.png",
      "/images/wooskill/2-homepage.png",
      "/images/wooskill/3-profile.png",
      "/images/wooskill/4-recommendation.png",
      "/images/wooskill/5-filters.png",
      "/images/wooskill/6-offer-creation.png",
      "/images/wooskill/7-availability.png",
      "/images/wooskill/8-pricing.png",
      "/images/wooskill/9-subscription.png",
    ],
    type: "major",
  },
  {
    id: "censtays",
    title: "CenStays — Luxury Lettings",
    description:
      "Luxury lettings website for a London-based real estate company. Features property listings from a live API, interactive map view, auth flow, enquiry forms, saved properties, and responsive dark/light mode. Deployed to AWS S3/CloudFront via CI/CD. Work in progress.",
    liveUrl: "https://censtays.com",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "AWS"],
    imageUrl: "/images/censtays/1-home.png",
    images: [
      "/images/censtays/1-home.png",
      "/images/censtays/2-lettings.png",
      "/images/censtays/3-contact.png",
    ],
    type: "major",
  },
  {
    id: "property-hub",
    title: "Main10 Property Hub (npm)",
    description:
      "Shared React component library and API client published as an npm package. Provides reusable, themeable UI components, authentication flow, favorites system, and a data adapter layer. Built with TypeScript, tsup, BEM CSS with custom properties, and Storybook.",
    techStack: ["React", "TypeScript", "Storybook", "tsup"],
    imageUrl: "/images/project-propertyhub.png",
    type: "major",
  },
  {
    id: "qiibee-whitelabel",
    title: "Loyalty Whitelabel App",
    description:
      "White-label loyalty mobile application delivered to 13 global clients, featuring NFT integrations, Binance payment gateways, and a seamless end-user rewards experience.",
    techStack: ["React", "Redux", "Rx.js", "Solidity", "Web3"],
    liveUrl: "https://rewards.qiibee.com/",
    imageUrl: "/images/whitelabel/1.png",
    images: [
      "/images/whitelabel/1.png",
      "/images/whitelabel/2.png",
      "/images/whitelabel/3.png",
      "/images/whitelabel/4.png",
    ],
    type: "major",
  },
  {
    id: "qiibee-dashboard",
    title: "Loyalty Admin Dashboard",
    description:
      "Comprehensive admin dashboard for managing loyalty programs across 13 global clients — with a reusable component library, analytics, and campaign management tools.",
    techStack: ["React", "TypeScript", "MUI", "Redux", "Rx.js"],
    liveUrl: "https://dashboard.qiibee.com/",
    imageUrl: "/images/dashboard-loyalty/4.png",
    images: [
      "/images/dashboard-loyalty/4.png",
      "/images/dashboard-loyalty/3.png",
      "/images/dashboard-loyalty/2.png",
      "/images/dashboard-loyalty/1.png",
    ],
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
    type: "side",
  },

  {
    id: "thebitcoinlore",
    title: "The Bitcoin Lore",
    description:
      "An interactive visual journey through Bitcoin's history — from the genesis block to modern adoption. Built as a storytelling experience with smooth animations and responsive design. Work in progress.",
    techStack: ["React", "TypeScript", "Vite"],
    liveUrl: "https://thebitcoinlore.com",
    githubUrl: "https://github.com/alwihar/thebitcoinlore",
    imageUrl: "/images/bitcoinlore/1-hero.png",
    images: [
      "/images/bitcoinlore/1-hero.png",
      "/images/bitcoinlore/2-diagnostic.png",
      "/images/bitcoinlore/3-pricing.png",
    ],
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
    imageUrl: "/images/old-portfolio/1.png",
    images: [
      "/images/old-portfolio/1.png",
      "/images/old-portfolio/4.png",
      "/images/old-portfolio/3.png",
      "/images/old-portfolio/2.png",
    ],
    type: "side",
  },
];
