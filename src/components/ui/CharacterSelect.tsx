import { CHARACTERS, type CharacterVariant } from "../../config/characters.ts";

interface CharacterSelectProps {
  readonly onSelect: (variant: CharacterVariant) => void;
}

export function CharacterSelect({ onSelect }: CharacterSelectProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at center, #0a0a2e 0%, #000008 100%)",
        fontFamily: "'Courier New', monospace",
        color: "#e0e0ff",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#00f0ff",
          marginBottom: "8px",
          letterSpacing: "4px",
          textShadow: "0 0 20px rgba(0,240,255,0.4)",
        }}
      >
        SELECT YOUR EXPLORER
      </h1>
      <p
        style={{
          fontSize: "12px",
          color: "#6060a0",
          marginBottom: "36px",
        }}
      >
        Choose a character to explore the cosmic portfolio
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 20px",
        }}
      >
        {CHARACTERS.map((char) => (
          <button
            key={char.id}
            onClick={() => onSelect(char.id)}
            style={{
              background: "rgba(10,10,30,0.8)",
              border: `1px solid ${char.colors.stripe}40`,
              borderRadius: "12px",
              padding: "24px 20px",
              cursor: "pointer",
              width: "200px",
              textAlign: "center",
              transition: "all 0.2s ease",
              color: "#e0e0ff",
              fontFamily: "'Courier New', monospace",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = char.colors.stripe;
              e.currentTarget.style.boxShadow = `0 0 20px ${char.colors.stripe}30`;
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${char.colors.stripe}40`;
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Color preview */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "6px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: char.colors.body,
                  border: "2px solid rgba(255,255,255,0.1)",
                }}
              />
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: char.colors.visor,
                  border: "2px solid rgba(255,255,255,0.1)",
                  boxShadow: `0 0 8px ${char.colors.visor}60`,
                }}
              />
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: char.colors.accent,
                  border: "2px solid rgba(255,255,255,0.1)",
                }}
              />
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: char.colors.backpack,
                  border: "2px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>

            <div
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: char.colors.stripe,
                marginBottom: "8px",
                letterSpacing: "2px",
              }}
            >
              {char.name.toUpperCase()}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#8080a0",
                lineHeight: 1.5,
              }}
            >
              {char.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
