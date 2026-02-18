import { useState, useCallback, useMemo } from "react";

interface IntroPortalProps {
  readonly onEnter: (withMusic: boolean) => void;
}

const STAR_COUNT = 80;

export function IntroPortal({ onEnter }: IntroPortalProps) {
  const [entering, setEntering] = useState(false);
  const [hovered, setHovered] = useState<"music" | "silent" | null>(null);

  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        animDelay: Math.random() * 4,
        animDur: 2 + Math.random() * 3,
      })),
    [],
  );

  const handleEnter = useCallback(
    (withMusic: boolean) => {
      setEntering(true);
      setTimeout(() => onEnter(withMusic), 1200);
    },
    [onEnter],
  );

  return (
    <>
      <style>{`
        @keyframes portalPulse {
          0%, 100% {
            box-shadow: 0 0 40px #00f0ff25, 0 0 80px #ff00ff08,
              inset 0 0 40px #00f0ff10;
          }
          50% {
            box-shadow: 0 0 80px #00f0ff50, 0 0 150px #ff00ff20,
              inset 0 0 60px #00f0ff25;
          }
        }
        @keyframes portalSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.9; }
        }
        @keyframes portalOpen {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(25); opacity: 0; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes subtleDrift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          background:
            "radial-gradient(ellipse at center, #080818 0%, #020208 70%, #000003 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Courier New', monospace",
          color: "#e0e0ff",
          overflow: "hidden",
          animation: entering ? "fadeOut 1.2s ease-in forwards" : "none",
        }}
      >
        {/* Starfield */}
        {stars.map((star, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: "50%",
              background: i % 5 === 0 ? "#00f0ff" : i % 7 === 0 ? "#ff00ff" : "#ffffff",
              animation: `starTwinkle ${star.animDur}s ease-in-out ${star.animDelay}s infinite`,
              opacity: 0.15,
            }}
          />
        ))}

        {/* Ambient glow behind portal */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #00f0ff06 0%, #ff00ff04 40%, transparent 70%)",
            animation: "subtleDrift 6s ease-in-out infinite",
          }}
        />

        {/* Portal ring */}
        <div
          style={{
            position: "relative",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            border: "2px solid #00f0ff50",
            animation: entering
              ? "portalOpen 1.2s ease-in forwards"
              : "portalPulse 3s ease-in-out infinite",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "48px",
          }}
        >
          {/* Outer spinning ring */}
          <div
            style={{
              position: "absolute",
              inset: "-8px",
              borderRadius: "50%",
              border: "1px solid transparent",
              borderTopColor: "#00f0ff30",
              borderBottomColor: "#00f0ff15",
              animation: "portalSpin 12s linear infinite",
            }}
          />
          {/* Inner spinning ring 1 */}
          <div
            style={{
              position: "absolute",
              inset: "12px",
              borderRadius: "50%",
              border: "1px solid transparent",
              borderTopColor: "#ff00ff40",
              borderRightColor: "#ff00ff15",
              animation: "portalSpin 8s linear infinite",
            }}
          />
          {/* Inner spinning ring 2 */}
          <div
            style={{
              position: "absolute",
              inset: "30px",
              borderRadius: "50%",
              border: "1px solid transparent",
              borderBottomColor: "#00f0ff35",
              borderLeftColor: "#00f0ff10",
              animation: "portalSpin 6s linear infinite reverse",
            }}
          />
          {/* Portal core gradient */}
          <div
            style={{
              position: "absolute",
              inset: "45px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #0a0a3050 0%, #00f0ff06 50%, transparent 70%)",
            }}
          />
          {/* Center text */}
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "6px",
                color: "#00f0ff60",
                marginBottom: "8px",
              }}
            >
              ENTER THE
            </div>
            <div
              style={{
                fontSize: "24px",
                letterSpacing: "6px",
                color: "#00f0ff",
                fontWeight: "bold",
                textShadow: "0 0 20px #00f0ff40",
              }}
            >
              COSMOS
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            zIndex: 1,
          }}
        >
          <button
            onClick={() => handleEnter(true)}
            disabled={entering}
            onMouseEnter={() => setHovered("music")}
            onMouseLeave={() => setHovered(null)}
            style={{
              background:
                hovered === "music"
                  ? "rgba(0, 240, 255, 0.15)"
                  : "rgba(0, 240, 255, 0.06)",
              border: "1px solid #00f0ff40",
              color: "#00f0ff",
              padding: "14px 32px",
              fontSize: "12px",
              letterSpacing: "3px",
              fontFamily: "'Courier New', monospace",
              cursor: entering ? "default" : "pointer",
              borderRadius: "4px",
              transition: "all 0.3s",
              opacity: entering ? 0.5 : 1,
            }}
          >
            WITH MUSIC
          </button>
          <button
            onClick={() => handleEnter(false)}
            disabled={entering}
            onMouseEnter={() => setHovered("silent")}
            onMouseLeave={() => setHovered(null)}
            style={{
              background:
                hovered === "silent"
                  ? "rgba(255, 255, 255, 0.06)"
                  : "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#606070",
              padding: "14px 32px",
              fontSize: "12px",
              letterSpacing: "3px",
              fontFamily: "'Courier New', monospace",
              cursor: entering ? "default" : "pointer",
              borderRadius: "4px",
              transition: "all 0.3s",
              opacity: entering ? 0.5 : 1,
            }}
          >
            SILENT
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            fontSize: "10px",
            color: "#252535",
            letterSpacing: "4px",
          }}
        >
          PORTFOLIO EXPERIENCE
        </div>
      </div>
    </>
  );
}
