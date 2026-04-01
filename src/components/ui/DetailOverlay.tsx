import { useEffect, useCallback, useState, useMemo } from "react";
import type { PlatformId } from "../../utils/platformDetail.ts";
import { closePlatformDetail } from "../../utils/platformDetail.ts";
import { skills } from "../../data/skills.ts";
import { projects } from "../../data/projects.ts";
import { experience } from "../../data/experience.ts";
import { profile } from "../../data/profile.ts";
import { InteractiveTerminal } from "./InteractiveTerminal.tsx";
import { AchievementGallery } from "./AchievementGallery.tsx";

const OVERLAY_STYLE: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0, 0, 8, 0.85)",
  backdropFilter: "blur(8px)",
  fontFamily: "'Courier New', monospace",
  color: "#e0e0ff",
  animation: "fadeIn 0.2s ease-out",
};

const PANEL_STYLE: React.CSSProperties = {
  maxWidth: "720px",
  maxHeight: "80vh",
  width: "90vw",
  overflowY: "auto",
  background: "linear-gradient(135deg, rgba(10,10,30,0.95), rgba(5,5,20,0.95))",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  padding: "32px",
};

const CLOSE_STYLE: React.CSSProperties = {
  position: "absolute",
  top: "12px",
  right: "12px",
  background: "rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.15)",
  color: "#a0a0c0",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "14px",
  fontFamily: "'Courier New', monospace",
  zIndex: 701,
};

/* ── Skills ── */
function SkillsPanel() {
  return (
    <div>
      <h2
        style={{
          color: "#00ff88",
          margin: "0 0 24px 0",
          fontSize: "20px",
          letterSpacing: "3px",
        }}
      >
        SKILLS
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "16px",
        }}
      >
        {skills.map((skill) => (
          <div
            key={skill.id}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${skill.color}30`,
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <img
              src={skill.icon}
              alt={skill.name}
              width={40}
              height={40}
              style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.2))" }}
            />
            <div
              style={{
                color: "#e0e0ff",
                fontSize: "13px",
                marginTop: "8px",
                fontWeight: "bold",
              }}
            >
              {skill.name}
            </div>
            <div style={{ marginTop: "8px" }}>
              <div
                style={{
                  height: "4px",
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "2px",
                }}
              >
                <div
                  style={{
                    width: `${skill.proficiency * 100}%`,
                    height: "100%",
                    background: skill.color,
                    borderRadius: "2px",
                    boxShadow: `0 0 8px ${skill.color}60`,
                  }}
                />
              </div>
              <div
                style={{ fontSize: "10px", color: "#808090", marginTop: "4px" }}
              >
                {Math.round(skill.proficiency * 100)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Projects ── */
function ProjectsPanel() {
  return (
    <div>
      <h2
        style={{
          color: "#e040fb",
          margin: "0 0 24px 0",
          fontSize: "20px",
          letterSpacing: "3px",
        }}
      >
        PROJECTS
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <h3
              style={{
                color: "#00f0ff",
                margin: "0 0 8px 0",
                fontSize: "16px",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: "13px",
                lineHeight: 1.6,
                opacity: 0.8,
              }}
            >
              {project.description}
            </p>
            <div
              style={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                marginBottom: "12px",
              }}
            >
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "3px 8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                    fontSize: "11px",
                    color: "#a0a0c0",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#00f0ff",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  [LIVE]
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#00ff88",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  [CODE]
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Highlight helper ── */
const METRIC_RE = /(\d+%|\d+x\b)/g;
const TECH_RE =
  /\b(React Native|React|TypeScript|JavaScript|Next\.js|AWS|CloudFront|S3|Pulumi|PHP|Redux|Rx\.js|MUI|NFT|Binance|Localize\.js|GraphQL|Docker|Node\.js|MySQL|Three\.js|Rapier|Tailwind)\b/g;

function highlightText(text: string, accentColor: string): React.ReactNode {
  const combined = new RegExp(`(${METRIC_RE.source}|${TECH_RE.source})`, "g");
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = combined.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const word = match[0];
    const isMetric = METRIC_RE.test(word);
    METRIC_RE.lastIndex = 0; // reset
    parts.push(
      <span
        key={match.index}
        style={{
          color: isMetric ? accentColor : "#00f0ff",
          fontWeight: isMetric ? "bold" : "normal",
        }}
      >
        {word}
      </span>,
    );
    lastIndex = combined.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

/* ── Experience ── */
function ExperiencePanel() {
  return (
    <div>
      <h2
        style={{
          color: "#ff6b6b",
          margin: "0 0 24px 0",
          fontSize: "20px",
          letterSpacing: "3px",
        }}
      >
        EXPERIENCE
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {experience.map((entry) => (
          <div
            key={entry.id}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${entry.color}25`,
              borderRadius: "8px",
              padding: "20px",
              borderLeft: `3px solid ${entry.color}`,
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: entry.color,
                marginBottom: "4px",
              }}
            >
              {entry.period}
            </div>
            <h3
              style={{
                color: "#e0e0ff",
                margin: "0 0 4px 0",
                fontSize: "16px",
              }}
            >
              {entry.role}
            </h3>
            <div
              style={{
                color: "#808090",
                fontSize: "13px",
                marginBottom: "8px",
              }}
            >
              @ {entry.company}
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                lineHeight: 1.6,
                opacity: 0.8,
              }}
            >
              {highlightText(entry.description, entry.color)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── About ── */
function AboutPanel() {
  return (
    <div>
      {/* Header with name + title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "28px",
          paddingBottom: "20px",
          borderBottom: "1px solid rgba(139,92,246,0.15)",
        }}
      >
        <h2
          style={{
            color: "#8b5cf6",
            margin: "0 0 4px 0",
            fontSize: "20px",
            letterSpacing: "3px",
          }}
        >
          ABOUT
        </h2>
        <div style={{ color: "#a78bfa", fontSize: "16px", marginTop: "12px" }}>
          {profile.name}
        </div>
        <div
          style={{
            color: "#808090",
            fontSize: "12px",
            marginTop: "4px",
            letterSpacing: "2px",
          }}
        >
          {profile.title}
        </div>
      </div>

      {/* Bio with terminal feel */}
      <div
        style={{
          background: "rgba(139,92,246,0.04)",
          border: "1px solid rgba(139,92,246,0.1)",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            color: "#8b5cf6",
            fontSize: "10px",
            marginBottom: "8px",
            opacity: 0.5,
          }}
        >
          {"$ cat bio.txt"}
        </div>
        <p style={{ fontSize: "13px", lineHeight: 1.8, margin: 0 }}>
          {profile.bio}
        </p>
      </div>

      {/* Highlights as achievement cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "24px",
        }}
      >
        {profile.highlights.map((h, i) => (
          <div
            key={h}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(139,92,246,0.12)",
              borderRadius: "8px",
              padding: "14px",
              borderLeft: `3px solid ${i % 2 === 0 ? "#8b5cf6" : "#a78bfa"}`,
            }}
          >
            <div style={{ fontSize: "12px", lineHeight: 1.6 }}>{h}</div>
          </div>
        ))}
      </div>

      {/* Education & Languages */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,240,255,0.12)",
            borderRadius: "8px",
            padding: "14px",
            borderLeft: "3px solid #00f0ff",
          }}
        >
          <div
            style={{
              color: "#00f0ff",
              fontSize: "10px",
              marginBottom: "6px",
              opacity: 0.5,
              letterSpacing: "1px",
            }}
          >
            EDUCATION
          </div>
          <div style={{ fontSize: "12px", lineHeight: 1.6 }}>
            {profile.education.degree}
          </div>
          <div style={{ fontSize: "11px", opacity: 0.6, marginTop: "2px" }}>
            {profile.education.university}
          </div>
          <div style={{ fontSize: "10px", opacity: 0.4, marginTop: "2px" }}>
            {profile.education.period}
          </div>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,0,255,0.12)",
            borderRadius: "8px",
            padding: "14px",
            borderLeft: "3px solid #ff00ff",
          }}
        >
          <div
            style={{
              color: "#ff00ff",
              fontSize: "10px",
              marginBottom: "6px",
              opacity: 0.5,
              letterSpacing: "1px",
            }}
          >
            LANGUAGES
          </div>
          <div style={{ fontSize: "12px", lineHeight: 1.6 }}>
            {profile.languages.join(" / ")}
          </div>
        </div>
      </div>

      {/* Links as styled buttons */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <a
          href={profile.social.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            minWidth: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "12px",
            background: "rgba(255,170,0,0.04)",
            border: "1px solid rgba(255,170,0,0.15)",
            borderRadius: "8px",
            color: "#ffaa00",
            fontSize: "12px",
            textDecoration: "none",
            letterSpacing: "1px",
          }}
        >
          WEBSITE
        </a>
        <a
          href={profile.social.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            minWidth: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "12px",
            background: "rgba(0,255,136,0.04)",
            border: "1px solid rgba(0,255,136,0.15)",
            borderRadius: "8px",
            color: "#00ff88",
            fontSize: "12px",
            textDecoration: "none",
            letterSpacing: "1px",
          }}
        >
          GITHUB
        </a>
        <a
          href={profile.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            minWidth: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "12px",
            background: "rgba(139,92,246,0.04)",
            border: "1px solid rgba(139,92,246,0.15)",
            borderRadius: "8px",
            color: "#a78bfa",
            fontSize: "12px",
            textDecoration: "none",
            letterSpacing: "1px",
          }}
        >
          LINKEDIN
        </a>
        <a
          href={`mailto:${profile.social.email}`}
          style={{
            flex: 1,
            minWidth: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "12px",
            background: "rgba(0,240,255,0.04)",
            border: "1px solid rgba(0,240,255,0.15)",
            borderRadius: "8px",
            color: "#00f0ff",
            fontSize: "12px",
            textDecoration: "none",
            letterSpacing: "1px",
          }}
        >
          EMAIL
        </a>
      </div>
    </div>
  );
}

/* ── Contact ── */
function ContactPanel() {
  return (
    <div>
      <h2
        style={{
          color: "#ffaa00",
          margin: "0 0 24px 0",
          fontSize: "20px",
          letterSpacing: "3px",
        }}
      >
        CONTACT
      </h2>
      <p
        style={{
          fontSize: "13px",
          lineHeight: 1.6,
          marginBottom: "24px",
          opacity: 0.7,
        }}
      >
        Ready to connect? Reach out through any channel below.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <a
          href={`mailto:${profile.social.email}`}
          style={{
            display: "block",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,170,0,0.2)",
            borderRadius: "8px",
            padding: "16px",
            color: "#00f0ff",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          <span
            style={{
              color: "#808090",
              fontSize: "11px",
              display: "block",
              marginBottom: "4px",
            }}
          >
            EMAIL
          </span>
          {profile.social.email}
        </a>
        <a
          href={`tel:${profile.social.phone}`}
          style={{
            display: "block",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,170,0,0.2)",
            borderRadius: "8px",
            padding: "16px",
            color: "#ffaa00",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          <span
            style={{
              color: "#808090",
              fontSize: "11px",
              display: "block",
              marginBottom: "4px",
            }}
          >
            PHONE
          </span>
          {profile.social.phone}
        </a>
        <a
          href={profile.social.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,170,0,0.2)",
            borderRadius: "8px",
            padding: "16px",
            color: "#a78bfa",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          <span
            style={{
              color: "#808090",
              fontSize: "11px",
              display: "block",
              marginBottom: "4px",
            }}
          >
            WEBSITE
          </span>
          alwi.me
        </a>
        <a
          href={profile.social.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,170,0,0.2)",
            borderRadius: "8px",
            padding: "16px",
            color: "#00ff88",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          <span
            style={{
              color: "#808090",
              fontSize: "11px",
              display: "block",
              marginBottom: "4px",
            }}
          >
            GITHUB
          </span>
          {profile.social.github}
        </a>
        <a
          href={profile.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,170,0,0.2)",
            borderRadius: "8px",
            padding: "16px",
            color: "#ff00ff",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          <span
            style={{
              color: "#808090",
              fontSize: "11px",
              display: "block",
              marginBottom: "4px",
            }}
          >
            LINKEDIN
          </span>
          {profile.social.linkedin}
        </a>
      </div>
    </div>
  );
}

/* ── Observatory (Art Gallery) ── */
const ART_IMAGES = [
  "/art/art-01.jpg",
  "/art/art-02.jpg",
  "/art/art-03.png",
  "/art/art-05.png",
  "/art/art-06.jpeg",
  "/art/art-07.jpeg",
  "/art/art-08.jpeg",
  "/art/art-09.jpeg",
  "/art/art-10.jpeg",
  "/art/art-11.jpeg",
  "/art/art-12.jpeg",
  "/art/art-13.jpg",
  "/art/art-14.png",
  "/art/art-15.jpg",
];

interface ScatteredImage {
  src: string;
  x: number;
  y: number;
  w: number;
  rotation: number;
}

/* Place images around the edges, keeping the center clear for text.
   Uses predefined slots so images don't pile on top of each other. */
function generateScatter(): ScatteredImage[] {
  // Slots arranged around the perimeter, avoiding center (30-70% x, 30-70% y)
  const slots: [number, number][] = [
    // top row
    [5, 5],
    [30, 3],
    [58, 5],
    [82, 3],
    // left column
    [3, 32],
    [5, 62],
    // right column
    [82, 30],
    [84, 60],
    // bottom row
    [5, 82],
    [28, 85],
    [55, 82],
    [80, 84],
    // corners / near-edge extra
    [16, 18],
    [72, 18],
    [18, 72],
  ];

  const shuffled = [...ART_IMAGES];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.map((src, i) => {
    const slot = slots[i % slots.length];
    // Add small jitter so it doesn't look grid-like
    const jitterX = (Math.random() - 0.5) * 6;
    const jitterY = (Math.random() - 0.5) * 6;
    return {
      src,
      x: Math.max(2, Math.min(90, slot[0] + jitterX)),
      y: Math.max(2, Math.min(90, slot[1] + jitterY)),
      w: 10 + Math.random() * 6,
      rotation: (Math.random() - 0.5) * 20,
    };
  });
}

function ObservatoryPanel() {
  const scattered = useMemo(() => generateScatter(), []);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      {/* Lightbox */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 700,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => setSelected(null)}
        >
          <img
            src={selected}
            alt="art"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "4px",
              boxShadow: "0 0 60px rgba(68,136,255,0.3)",
            }}
          />
        </div>
      )}

      {/* Center message */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <h2
          style={{
            color: "#4488ff",
            fontSize: "20px",
            letterSpacing: "3px",
            margin: "0 0 12px 0",
            fontFamily: "'Courier New', monospace",
            textShadow: "0 0 30px rgba(0,0,20,0.9), 0 0 60px rgba(0,0,20,0.8)",
          }}
        >
          OBSERVATORY
        </h2>
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.8,
            color: "#4488ff",
            fontFamily: "'Courier New', monospace",
            textShadow: "0 0 30px rgba(0,0,20,0.9), 0 0 60px rgba(0,0,20,0.8)",
          }}
        >
          You found the secret observatory!
        </p>
        <p
          style={{
            fontSize: "13px",
            lineHeight: 1.6,
            opacity: 0.6,
            marginTop: "8px",
            color: "#e0e0ff",
            fontFamily: "'Courier New', monospace",
            textShadow: "0 0 30px rgba(0,0,20,0.9), 0 0 60px rgba(0,0,20,0.8)",
          }}
        >
          Thanks for exploring — curiosity is the best skill.
        </p>
      </div>

      {/* Scattered images */}
      {scattered.map((img) => (
        <img
          key={img.src}
          src={img.src}
          alt="art"
          loading="lazy"
          onClick={(e) => {
            e.stopPropagation();
            setSelected(img.src);
          }}
          style={{
            position: "absolute",
            left: `${img.x}%`,
            top: `${img.y}%`,
            width: `${img.w}vw`,
            transform: `translate(-50%, -50%) rotate(${img.rotation}deg)`,
            borderRadius: "4px",
            cursor: "pointer",
            boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
            border: "2px solid rgba(68,136,255,0.15)",
            transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(68,136,255,0.6)";
            el.style.boxShadow = "0 4px 40px rgba(68,136,255,0.3)";
            el.style.transform = `translate(-50%, -50%) rotate(${img.rotation}deg) scale(1.08)`;
            el.style.zIndex = "3";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(68,136,255,0.15)";
            el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.6)";
            el.style.transform = `translate(-50%, -50%) rotate(${img.rotation}deg) scale(1)`;
            el.style.zIndex = "1";
          }}
        />
      ))}
    </>
  );
}

/* ── Terminal ── */
function TerminalPanel() {
  return <InteractiveTerminal />;
}

/* ── Achievements ── */
function AchievementsPanel() {
  return <AchievementGallery />;
}

/* ── Panels map ── */
const PANELS: Record<PlatformId, () => React.JSX.Element> = {
  skills: SkillsPanel,
  projects: ProjectsPanel,
  experience: ExperiencePanel,
  about: AboutPanel,
  contact: ContactPanel,
  observatory: ObservatoryPanel,
  terminal: TerminalPanel,
  achievements: AchievementsPanel,
};

/* ── Main overlay ── */
interface DetailOverlayProps {
  readonly platform: PlatformId;
}

export function DetailOverlay({ platform }: DetailOverlayProps) {
  const Panel = PANELS[platform];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") closePlatformDetail();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const isObservatory = platform === "observatory";

  return (
    <div
      style={{
        ...OVERLAY_STYLE,
        ...(isObservatory ? { overflow: "hidden" } : {}),
      }}
      onClick={closePlatformDetail}
    >
      <button style={CLOSE_STYLE} onClick={closePlatformDetail}>
        &times;
      </button>
      {isObservatory ? (
        <Panel />
      ) : (
        <div style={PANEL_STYLE} onClick={(e) => e.stopPropagation()}>
          <Panel />
        </div>
      )}
    </div>
  );
}
