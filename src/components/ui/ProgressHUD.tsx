import { useGameStore } from "../../store/gameStore";
import { openPlatformDetail } from "../../utils/platformDetail";

const TOTAL_ORBS = 12;
const TOTAL_PLATFORMS = 7;

export function ProgressHUD() {
  const visited = useGameStore((s) => s.visitedPlatforms.size);
  const collected = useGameStore((s) => s.collectedOrbs.size);
  const xp = useGameStore((s) => s.xp);
  const achievements = useGameStore((s) => s.achievements.size);

  const explorationPct = Math.round((visited / TOTAL_PLATFORMS) * 100);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 500,
        display: "flex",
        gap: "20px",
        alignItems: "center",
        padding: "8px 20px",
        background: "rgba(0,0,10,0.6)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "20px",
        fontFamily: "'Courier New', monospace",
        fontSize: "11px",
        color: "#808090",
        backdropFilter: "blur(4px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ color: "#00f0ff" }}>{explorationPct}%</span>
        <span>explored</span>
      </div>
      <div
        style={{
          width: "1px",
          height: "12px",
          background: "rgba(255,255,255,0.1)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ color: "#ffaa00" }}>
          {collected}/{TOTAL_ORBS}
        </span>
        <span>orbs</span>
      </div>
      <div
        style={{
          width: "1px",
          height: "12px",
          background: "rgba(255,255,255,0.1)",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
        }}
        onClick={() => openPlatformDetail("achievements")}
      >
        <span style={{ color: "#ff00ff" }}>{achievements}</span>
        <span>unlocked</span>
      </div>
      <div
        style={{
          width: "1px",
          height: "12px",
          background: "rgba(255,255,255,0.1)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ color: "#00ff88" }}>{xp}</span>
        <span>XP</span>
      </div>
    </div>
  );
}
