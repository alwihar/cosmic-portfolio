import { ACHIEVEMENT_DEFS } from "../../config/achievements";
import { useGameStore } from "../../store/gameStore";

const ICONS: Record<string, string> = {
  footprints: "\u{1F463}",
  compass: "\u{1F9ED}",
  gem: "\u{1F48E}",
  trophy: "\u{1F3C6}",
  bolt: "\u26A1",
  rocket: "\u{1F680}",
  eye: "\u{1F441}",
  terminal: "\u{1F4BB}",
  gamepad: "\u{1F3AE}",
  book: "\u{1F4D6}",
  clock: "\u23F0",
  crown: "\u{1F451}",
};

export function AchievementGallery() {
  const achievements = useGameStore((s) => s.achievements);
  const xp = useGameStore((s) => s.xp);

  return (
    <div>
      <h2 style={{ color: "#ffaa00", margin: "0 0 8px 0", fontSize: "20px", letterSpacing: "3px" }}>
        ACHIEVEMENTS
      </h2>
      <div style={{ color: "#808090", fontSize: "12px", marginBottom: "20px" }}>
        {achievements.size}/{ACHIEVEMENT_DEFS.length} unlocked | {xp} XP
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
        {ACHIEVEMENT_DEFS.map((def) => {
          const unlocked = achievements.has(def.id);
          return (
            <div
              key={def.id}
              style={{
                background: unlocked ? "rgba(255,170,0,0.04)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${unlocked ? "rgba(255,170,0,0.2)" : "rgba(255,255,255,0.05)"}`,
                borderRadius: "8px",
                padding: "14px",
                opacity: unlocked ? 1 : 0.4,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ fontSize: "24px" }}>
                  {unlocked ? (ICONS[def.icon] ?? "\u2728") : "\u{1F512}"}
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: unlocked ? "#ffaa00" : "#404050" }}>
                    {def.title}
                  </div>
                  <div style={{ fontSize: "11px", color: unlocked ? "#808090" : "#303040", marginTop: "2px" }}>
                    {unlocked ? def.description : "???"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
