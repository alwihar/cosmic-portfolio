export interface ExperienceEntry {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly description: string;
  readonly color: string;
}

export const experience: readonly ExperienceEntry[] = [
  {
    id: "sdt",
    company: "Sync Design Tech",
    role: "Frontend Engineer",
    period: "Feb 2025 — Present",
    description:
      "Building and optimizing core dashboard features in React and React Native for property managers, contractors, and engineers. Handling complex data tables, map integrations, camera feeds, and timezone-sensitive logic. Architecting AWS infrastructure — creating error pages with CloudFront distributions and S3 buckets, and automating provisioning with Pulumi.",
    color: "#00f0ff",
  },
  {
    id: "wooskill",
    company: "Wooskill",
    role: "Software Engineer",
    period: "Oct 2023 — Dec 2024",
    description:
      "Led full-stack development across React frontend and PHP backend, including AWS environment setup and database migrations. Built an admin platform enabling non-technical teams to create and manage landing pages on the main website. Implemented multi-language support with Localize.js, refactored critical pages to cut load times by 20%, and optimized application architecture — improving conversion rates by 19% and boosting user retention by 15%.",
    color: "#a855f7",
  },
  {
    id: "qiibee",
    company: "qiibee",
    role: "React Developer",
    period: "Jul 2021 — Aug 2023",
    description:
      "Led front-end efforts for the Loyalty Whitelabel App and Admin Dashboard, delivering to 13 global clients. Built a reusable component library with React, Rx.js, Redux, and MUI — cutting development time by 40%. Integrated NFT functionalities and Binance payment gateways, driving a 42% increase in revenue. Deployed strategic CTAs that boosted page visits 4x and reduced drop-offs by 21%.",
    color: "#ff00ff",
  },
  {
    id: "sportion",
    company: "Sportion",
    role: "UI/UX Engineer",
    period: "Jan 2021 — Aug 2021",
    description:
      "Optimized UI components for a gambling platform, increasing average session duration by 15%. Spearheaded creation of an internal admin dashboard that streamlined operations and improved process efficiency by 30%.",
    color: "#00ff88",
  },
  {
    id: "iu-networks",
    company: "IU Networks",
    role: "Frontend Developer",
    period: "Jan 2020 — Apr 2021",
    description:
      "Developed a React-based drag-and-drop interface builder, empowering non-technical staff to create custom UIs without coding. Ensured cross-browser compatibility across all major browsers through robust testing and responsive design practices.",
    color: "#ffaa00",
  },
];
