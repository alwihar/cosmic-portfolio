import { useState, useCallback } from "react";
import { toggleMusic, isMusicPlaying } from "../../audio/audioManager.ts";
import { setSfxEnabled } from "../../audio/sfxManager.ts";

export function AudioToggle() {
  const [playing, setPlaying] = useState(isMusicPlaying);

  const handleToggle = useCallback(() => {
    const nowPlaying = toggleMusic();
    setPlaying(nowPlaying);
    setSfxEnabled(nowPlaying);
  }, []);

  return (
    <button
      tabIndex={-1}
      onClick={handleToggle}
      style={{
        position: "fixed",
        top: "16px",
        right: "230px",
        zIndex: 100,
        background: "rgba(0,0,0,0.7)",
        border: `1px solid ${playing ? "#00f0ff40" : "#ffffff15"}`,
        color: playing ? "#00f0ff" : "#505060",
        padding: "8px 16px",
        cursor: "pointer",
        fontSize: "12px",
        borderRadius: "4px",
        fontFamily: "'Courier New', monospace",
        transition: "all 0.3s",
      }}
    >
      {playing ? "SOUND ON" : "SOUND OFF"}
    </button>
  );
}
