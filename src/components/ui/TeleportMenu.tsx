import { useState } from "react";
import { PLATFORM_POSITIONS } from "../../utils/positions";
import { dispatchTeleport } from "../../utils/teleport";

const DESTINATIONS = [
  { key: "landing", label: "HUB", color: "#00f0ff" },
  { key: "about", label: "ABOUT", color: "#8b5cf6" },
  { key: "projects", label: "PROJECTS", color: "#ff00ff" },
  { key: "skills", label: "SKILLS", color: "#00ff88" },
  { key: "experience", label: "EXPERIENCE", color: "#ff6b6b" },
  { key: "contact", label: "CONTACT", color: "#ffaa00" },
  { key: "observatory", label: "OBSERVATORY", color: "#4488ff" },
] as const;

export function TeleportMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function handleTeleport(key: keyof typeof PLATFORM_POSITIONS) {
    const pos = PLATFORM_POSITIONS[key];
    dispatchTeleport([pos.x, pos.y + 3, pos.z + 3]);
    setIsOpen(false);
    (document.activeElement as HTMLElement)?.blur();
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "16px",
        right: "16px",
        zIndex: 100,
        fontFamily: "'Courier New', monospace",
      }}
    >
      <button
        tabIndex={-1}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "rgba(0,0,0,0.7)",
          border: "1px solid #00f0ff40",
          color: "#00f0ff",
          padding: "8px 16px",
          cursor: "pointer",
          fontSize: "12px",
          borderRadius: "4px",
        }}
      >
        {isOpen ? "CLOSE" : "TELEPORT"}
      </button>
      {isOpen && (
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {DESTINATIONS.map(({ key, label, color }) => (
            <button
              key={key}
              tabIndex={-1}
              onClick={() => handleTeleport(key)}
              style={{
                background: "rgba(0,0,0,0.7)",
                border: `1px solid ${color}40`,
                color,
                padding: "6px 12px",
                cursor: "pointer",
                fontSize: "11px",
                borderRadius: "4px",
                textAlign: "left",
              }}
            >
              &gt; {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
