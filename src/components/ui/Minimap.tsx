import { PLATFORM_POSITIONS } from "../../utils/positions.ts";

const SCALE = 2.5;
const OFFSET_X = 60;
const OFFSET_Y = 80;

const PLATFORMS = [
  { key: "landing", label: "LP", color: "#00f0ff" },
  { key: "projects", label: "PR", color: "#ff00ff" },
  { key: "skills", label: "SK", color: "#00ff88" },
  { key: "contact", label: "CO", color: "#ffaa00" },
] as const;

const BRIDGE_PAIRS: ReadonlyArray<
  readonly [keyof typeof PLATFORM_POSITIONS, keyof typeof PLATFORM_POSITIONS]
> = [
  ["landing", "projects"],
  ["landing", "skills"],
  ["projects", "contact"],
  ["skills", "contact"],
];

export function Minimap() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
        zIndex: 100,
        background: "rgba(0,0,0,0.6)",
        border: "1px solid #00f0ff30",
        borderRadius: "8px",
        padding: "8px",
      }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Bridge lines */}
        {BRIDGE_PAIRS.map(([from, to]) => {
          const fromPos = PLATFORM_POSITIONS[from];
          const toPos = PLATFORM_POSITIONS[to];
          return (
            <line
              key={`${from}-${to}`}
              x1={fromPos.x * SCALE + OFFSET_X}
              y1={-fromPos.z * SCALE + OFFSET_Y}
              x2={toPos.x * SCALE + OFFSET_X}
              y2={-toPos.z * SCALE + OFFSET_Y}
              stroke="#4040ff"
              strokeWidth="1"
              opacity="0.4"
            />
          );
        })}
        {/* Platform dots */}
        {PLATFORMS.map(({ key, label, color }) => {
          const pos = PLATFORM_POSITIONS[key];
          const cx = pos.x * SCALE + OFFSET_X;
          const cy = -pos.z * SCALE + OFFSET_Y;
          return (
            <g key={key}>
              <circle cx={cx} cy={cy} r="4" fill={color} opacity="0.8" />
              <text
                x={cx}
                y={cy - 7}
                fill={color}
                fontSize="7"
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
