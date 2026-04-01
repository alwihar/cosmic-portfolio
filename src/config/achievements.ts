export interface AchievementDef {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export const ACHIEVEMENT_DEFS: readonly AchievementDef[] = [
  { id: "first-steps", title: "First Steps", description: "Visit your first platform", icon: "footprints" },
  { id: "explorer", title: "Explorer", description: "Visit all 7 platforms", icon: "compass" },
  { id: "collector", title: "Collector", description: "Find 5 energy orbs", icon: "gem" },
  { id: "completionist", title: "Completionist", description: "Collect all energy orbs", icon: "trophy" },
  { id: "speed-demon", title: "Speed Demon", description: "Use dash 10 times", icon: "bolt" },
  { id: "sky-walker", title: "Sky Walker", description: "Jump 50 times", icon: "rocket" },
  { id: "secret-finder", title: "Secret Finder", description: "Discover the hidden room", icon: "eye" },
  { id: "hacker", title: "Hacker", description: "Execute a secret terminal command", icon: "terminal" },
  { id: "konami-master", title: "Konami Master", description: "Enter the legendary code", icon: "gamepad" },
  { id: "deep-reader", title: "Deep Reader", description: "Read every project and experience detail", icon: "book" },
  { id: "veteran", title: "Veteran", description: "Spend 5 minutes exploring", icon: "clock" },
  { id: "master-explorer", title: "Master Explorer", description: "Unlock all other achievements", icon: "crown" },
] as const;
