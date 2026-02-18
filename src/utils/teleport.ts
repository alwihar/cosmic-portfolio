const TELEPORT_EVENT = "cosmic-teleport";

export function dispatchTeleport(position: [number, number, number]) {
  window.dispatchEvent(
    new CustomEvent(TELEPORT_EVENT, { detail: { position } }),
  );
}

export function subscribeTeleport(
  callback: (position: [number, number, number]) => void,
): () => void {
  const handler = (e: Event) => {
    const { position } = (e as CustomEvent<{ position: [number, number, number] }>).detail;
    callback(position);
  };
  window.addEventListener(TELEPORT_EVENT, handler);
  return () => window.removeEventListener(TELEPORT_EVENT, handler);
}
