import { useProgress } from "@react-three/drei";

export function LoadingScreen() {
  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000010",
        fontFamily: "'Courier New', monospace",
        color: "#00f0ff",
        transition: "opacity 0.5s",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "24px", letterSpacing: "8px" }}>COSMIC PORTFOLIO</h1>
      <div style={{ width: "300px", height: "4px", background: "#111", borderRadius: "2px" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #00f0ff, #ff00ff)",
            borderRadius: "2px",
            transition: "width 0.3s",
            boxShadow: "0 0 10px #00f0ff",
          }}
        />
      </div>
      <p style={{ marginTop: "16px", fontSize: "12px", opacity: 0.6 }}>LOADING SYSTEMS... {Math.round(progress)}%</p>
      <div style={{ marginTop: "40px", fontSize: "11px", opacity: 0.4, textAlign: "center" }}>
        <p>WASD / ARROWS - Move</p>
        <p>MOUSE - Look around</p>
        <p>SPACE - Jump</p>
      </div>
    </div>
  );
}
