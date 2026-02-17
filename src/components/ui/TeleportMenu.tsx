import { useState } from "react";
import { PLATFORM_POSITIONS } from "../../utils/positions";

const DESTINATIONS = [
  { key: "landing", label: "LANDING PAD", color: "#00f0ff" },
  { key: "projects", label: "PROJECTS", color: "#ff00ff" },
  { key: "skills", label: "SKILLS", color: "#00ff88" },
  { key: "contact", label: "CONTACT", color: "#ffaa00" },
] as const;

interface TeleportMenuProps {
  readonly onTeleport: (position: [number, number, number]) => void;
}

export function TeleportMenu({ onTeleport }: TeleportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "fixed", top: "16px", right: "16px", zIndex: 100, fontFamily: "'Courier New', monospace" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: "rgba(0,0,0,0.7)", border: "1px solid #00f0ff40", color: "#00f0ff", padding: "8px 16px", cursor: "pointer", fontSize: "12px", borderRadius: "4px" }}
      >
        {isOpen ? "CLOSE" : "TELEPORT"}
      </button>
      {isOpen && (
        <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {DESTINATIONS.map(({ key, label, color }) => {
            const pos = PLATFORM_POSITIONS[key];
            return (
              <button
                key={key}
                onClick={() => { onTeleport([pos.x, pos.y + 3, pos.z + 3]); setIsOpen(false); }}
                style={{ background: "rgba(0,0,0,0.7)", border: `1px solid ${color}40`, color, padding: "6px 12px", cursor: "pointer", fontSize: "11px", borderRadius: "4px", textAlign: "left" }}
              >
                &gt; {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
