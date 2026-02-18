const OPEN_EVENT = "cosmic-detail-open";
const CLOSE_EVENT = "cosmic-detail-close";

export type PlatformId =
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "contact"
  | "observatory";

export function openPlatformDetail(platform: PlatformId) {
  window.dispatchEvent(
    new CustomEvent(OPEN_EVENT, { detail: { platform } }),
  );
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
