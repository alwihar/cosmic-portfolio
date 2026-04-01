import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ACHIEVEMENT_DEFS } from "../config/achievements";
import type { AchievementDef } from "../config/achievements";

export interface Achievement extends AchievementDef {
  readonly unlockedAt: number | null;
}

interface GameState {
  readonly visitedPlatforms: ReadonlySet<string>;
  readonly visitPlatform: (id: string) => void;
  readonly collectedOrbs: ReadonlySet<string>;
  readonly collectOrb: (id: string) => void;
  readonly achievements: ReadonlyMap<string, Achievement>;
  readonly unlockAchievement: (id: string) => void;
  readonly openedPanels: ReadonlySet<string>;
  readonly openPanel: (id: string) => void;
  readonly xp: number;
  readonly addXp: (amount: number) => void;
  readonly totalJumps: number;
  readonly incrementJumps: () => void;
  readonly dashCount: number;
  readonly incrementDash: () => void;
  readonly sessionStart: number;
  readonly unlockedTrailColor: string | null;
  readonly setTrailColor: (color: string) => void;
  readonly secretRoomFound: boolean;
  readonly findSecretRoom: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      visitedPlatforms: new Set<string>(),
      visitPlatform: (id: string) =>
        set((s) => {
          if (s.visitedPlatforms.has(id)) return s;
          const next = new Set(s.visitedPlatforms);
          next.add(id);
          return { visitedPlatforms: next };
        }),

      collectedOrbs: new Set<string>(),
      collectOrb: (id: string) =>
        set((s) => {
          if (s.collectedOrbs.has(id)) return s;
          const next = new Set(s.collectedOrbs);
          next.add(id);
          return { collectedOrbs: next, xp: s.xp + 30 };
        }),

      achievements: new Map<string, Achievement>(),
      unlockAchievement: (id: string) =>
        set((s) => {
          if (s.achievements.has(id)) return s;
          const def = ACHIEVEMENT_DEFS.find((a) => a.id === id);
          if (!def) return s;
          const next = new Map(s.achievements);
          next.set(id, { ...def, unlockedAt: Date.now() });
          // Check if all other achievements are unlocked -> master-explorer
          if (id !== "master-explorer" && next.size >= 11) {
            const masterDef = ACHIEVEMENT_DEFS.find(
              (a) => a.id === "master-explorer",
            );
            if (masterDef && !next.has("master-explorer")) {
              next.set("master-explorer", {
                ...masterDef,
                unlockedAt: Date.now(),
              });
              return { achievements: next, xp: s.xp + 200 };
            }
          }
          return { achievements: next, xp: s.xp + 100 };
        }),

      openedPanels: new Set<string>(),
      openPanel: (id: string) =>
        set((s) => {
          if (s.openedPanels.has(id)) return s;
          const next = new Set(s.openedPanels);
          next.add(id);
          return { openedPanels: next };
        }),

      xp: 0,
      addXp: (amount: number) => set((s) => ({ xp: s.xp + amount })),

      totalJumps: 0,
      incrementJumps: () => set((s) => ({ totalJumps: s.totalJumps + 1 })),
      dashCount: 0,
      incrementDash: () => set((s) => ({ dashCount: s.dashCount + 1 })),
      sessionStart: Date.now(),

      unlockedTrailColor: null,
      setTrailColor: (color: string) => set({ unlockedTrailColor: color }),
      secretRoomFound: false,
      findSecretRoom: () => set({ secretRoomFound: true }),
    }),
    {
      name: "cosmic-portfolio-save",
      partialize: (state) => ({
        collectedOrbs: Array.from(state.collectedOrbs),
        achievements: Array.from(state.achievements.entries()),
        xp: state.xp,
        visitedPlatforms: Array.from(state.visitedPlatforms),
        openedPanels: Array.from(state.openedPanels),
        unlockedTrailColor: state.unlockedTrailColor,
        secretRoomFound: state.secretRoomFound,
        totalJumps: state.totalJumps,
        dashCount: state.dashCount,
      }),
      merge: (persisted: any, current) => ({
        ...current,
        ...(persisted ?? {}),
        collectedOrbs: new Set(persisted?.collectedOrbs ?? []),
        achievements: new Map(persisted?.achievements ?? []),
        visitedPlatforms: new Set(persisted?.visitedPlatforms ?? []),
        openedPanels: new Set(persisted?.openedPanels ?? []),
      }),
    },
  ),
);
