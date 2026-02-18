import { useState, useEffect } from "react";

export function ControlsGuide() {
  const [visible, setVisible] = useState(true);
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFaded(true), 6000);
    const hideTimer = setTimeout(() => setVisible(false), 7000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) {
    return (
      <button
        tabIndex={-1}
        onClick={() => {
          setVisible(true);
          setFaded(false);
          (document.activeElement as HTMLElement)?.blur();
          setTimeout(() => setFaded(true), 6000);
          setTimeout(() => setVisible(false), 7000);
        }}
        style={{
          position: "fixed",
          bottom: "16px",
          left: "16px",
          zIndex: 100,
          background: "rgba(0,0,0,0.6)",
          border: "1px solid #00f0ff30",
          color: "#00f0ff",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "14px",
          fontFamily: "'Courier New', monospace",
        }}
      >
        ?
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: "16px",
        zIndex: 100,
        background: "rgba(0,0,0,0.7)",
        border: "1px solid #00f0ff30",
        borderRadius: "8px",
        padding: "12px 16px",
        fontFamily: "'Courier New', monospace",
        fontSize: "11px",
        color: "#a0a0c0",
        lineHeight: 1.8,
        opacity: faded ? 0 : 1,
        transition: "opacity 1s ease-out",
        pointerEvents: faded ? "none" : "auto",
      }}
    >
      <div style={{ color: "#00f0ff", marginBottom: "6px", fontSize: "12px" }}>
        CONTROLS
      </div>
      <div>
        <span style={{ color: "#e0e0ff" }}>W A S D</span> — Move
      </div>
      <div>
        <span style={{ color: "#e0e0ff" }}>SPACE</span> — Jump
      </div>
      <div>
        <span style={{ color: "#e0e0ff" }}>MOUSE</span> — Look around
      </div>
      <div style={{ marginTop: "4px", opacity: 0.5, fontSize: "10px" }}>
        Click TELEPORT to fast-travel
      </div>
    </div>
  );
}
