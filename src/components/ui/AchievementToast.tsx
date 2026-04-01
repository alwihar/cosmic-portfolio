import { useState, useEffect, useRef } from "react";
import { useGameStore } from "../../store/gameStore";
import { playSfx } from "../../audio/sfxManager";

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

interface ToastData {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export function AchievementToast() {
  const [queue, setQueue] = useState<ToastData[]>([]);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<ToastData | null>(null);
  const prevSize = useRef(0);

  const achievements = useGameStore((s) => s.achievements);

  useEffect(() => {
    if (achievements.size > prevSize.current) {
      const entries = Array.from(achievements.values());
      const newest = entries[entries.length - 1];
      if (newest) {
        setQueue((q) => [
          ...q,
          {
            title: newest.title,
            description: newest.description,
            icon: newest.icon,
          },
        ]);
      }
    }
    prevSize.current = achievements.size;
  }, [achievements]);

  useEffect(() => {
    if (queue.length > 0 && !visible) {
      setCurrent(queue[0]);
      setVisible(true);
      playSfx("achievement");
      setQueue((q) => q.slice(1));
      const timer = setTimeout(() => setVisible(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [queue, visible]);

  if (!visible || !current) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 800,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 24px",
        background:
          "linear-gradient(135deg, rgba(10,10,40,0.95), rgba(30,10,50,0.95))",
        border: "1px solid rgba(255,170,0,0.3)",
        borderRadius: "12px",
        fontFamily: "'Courier New', monospace",
        color: "#e0e0ff",
        animation: "toastSlide 0.4s ease-out",
        boxShadow: "0 0 30px rgba(255,170,0,0.15)",
      }}
    >
      <div style={{ fontSize: "28px" }}>{ICONS[current.icon] ?? "\u2728"}</div>
      <div>
        <div
          style={{
            color: "#ffaa00",
            fontSize: "10px",
            letterSpacing: "2px",
            marginBottom: "2px",
          }}
        >
          ACHIEVEMENT UNLOCKED
        </div>
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>
          {current.title}
        </div>
        <div style={{ fontSize: "11px", opacity: 0.6, marginTop: "2px" }}>
          {current.description}
        </div>
      </div>
    </div>
  );
}
