import { PLATFORM_POSITIONS, BRIDGE_CONNECTIONS } from "../../utils/positions.ts";

const SCALE = 1.05;
const OFFSET_X = 52;
const OFFSET_Y = 5;

const PLATFORM_META: Record<string, { label: string; color: string }> = {
  landing: { label: "HUB", color: "#00f0ff" },
  about: { label: "ABT", color: "#8b5cf6" },
  projects: { label: "PRJ", color: "#ff00ff" },
  skills: { label: "SKL", color: "#00ff88" },
  experience: { label: "EXP", color: "#ff6b6b" },
  contact: { label: "CNT", color: "#ffaa00" },
  observatory: { label: "OBS", color: "#4488ff" },
};

function toScreen(key: string): { cx: number; cy: number } {
  const pos = PLATFORM_POSITIONS[key as keyof typeof PLATFORM_POSITIONS];
  return {
    cx: pos.x * SCALE + OFFSET_X,
    cy: -pos.z * SCALE + OFFSET_Y,
  };
}

export function Minimap() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
        zIndex: 500,
        background: "rgba(0,0,0,0.7)",
        border: "1px solid #00f0ff30",
        borderRadius: "8px",
        padding: "8px",
        pointerEvents: "none",
      }}
    >
      <svg width="100" height="120" viewBox="0 0 100 120">
        {/* Bridge lines */}
        {BRIDGE_CONNECTIONS.map(({ from, to }) => {
          const f = toScreen(from);
          const t = toScreen(to);
          return (
            <line
              key={`${from}-${to}`}
              x1={f.cx}
              y1={f.cy}
              x2={t.cx}
              y2={t.cy}
              stroke="#4040ff"
              strokeWidth="1"
              opacity="0.4"
            />
          );
        })}
        {/* Platform dots */}
        {Object.entries(PLATFORM_META).map(([key, { label, color }]) => {
          const { cx, cy } = toScreen(key);
          return (
            <g key={key}>
              <circle cx={cx} cy={cy} r="3.5" fill={color} opacity="0.8" />
              <text
                x={cx}
                y={cy - 6}
                fill={color}
                fontSize="5.5"
                textAnchor="middle"
                opacity="0.7"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
