const OPEN_EVENT = "cosmic-detail-open";
const CLOSE_EVENT = "cosmic-detail-close";

export type PlatformId =
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "contact"
  | "observatory"
  | "terminal"
  | "achievements";

// Map detail panel IDs to platform IDs for visit tracking
// Map detail panel IDs to platform IDs for visit tracking
const PLATFORM_VISIT_MAP: Partial<Record<PlatformId, string>> = {
  about: "about",
  projects: "projects",
  skills: "skills",
  experience: "experience",
  contact: "contact",
  observatory: "observatory",
  terminal: "landing",
};

const CONTENT_PLATFORMS: ReadonlySet<PlatformId> = new Set([
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
  "observatory",
]);

export function openPlatformDetail(platform: PlatformId) {
  // Track platform visit for exploration progress
  const visitId = PLATFORM_VISIT_MAP[platform];
  if (visitId) {
    import("../store/gameStore").then(({ useGameStore }) => {
      const store = useGameStore.getState();
      store.visitPlatform(visitId);
      if (store.visitedPlatforms.size === 1) {
        store.unlockAchievement("first-steps");
      }
      if (store.visitedPlatforms.size >= 7) {
        store.unlockAchievement("explorer");
      }

      // Track opened detail panels for "deep-reader" achievement
      if (CONTENT_PLATFORMS.has(platform)) {
        store.openPanel(platform);
        const updated = useGameStore.getState();
        if (updated.openedPanels.size >= 6) {
          updated.unlockAchievement("deep-reader");
        }
      }
    });
  }
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { platform } }));
}

export function closePlatformDetail() {
  window.dispatchEvent(new Event(CLOSE_EVENT));
}

export function subscribePlatformDetail(
  onOpen: (platform: PlatformId) => void,
  onClose: () => void,
): () => void {
  const handleOpen = (e: Event) => {
    const { platform } = (e as CustomEvent<{ platform: PlatformId }>).detail;
    onOpen(platform);
  };
  const handleClose = () => onClose();

  window.addEventListener(OPEN_EVENT, handleOpen);
  window.addEventListener(CLOSE_EVENT, handleClose);
  return () => {
    window.removeEventListener(OPEN_EVENT, handleOpen);
    window.removeEventListener(CLOSE_EVENT, handleClose);
  };
}
