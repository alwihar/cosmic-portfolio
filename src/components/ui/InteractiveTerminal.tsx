import { useState, useRef, useEffect, useCallback } from "react";
import { useGameStore } from "../../store/gameStore";
import { closePlatformDetail } from "../../utils/platformDetail";

const COMMANDS: Record<string, string> = {
  help: "Available commands: help, about, skills, projects, experience, contact, secret, status, clear, exit",
  about: "Frontend Engineer with 6+ years building high-performance web apps.\nSpecializing in React, TypeScript, and Next.js.\nPassionate about clean architecture and scalable systems.",
  skills: "React | TypeScript | Next.js | React Native | Redux | Zustand\nMUI | Tailwind | SCSS | AWS | Docker | GraphQL | PostgreSQL",
  projects: "1. Property Management Dashboard (React + TS + AWS)\n2. Landing Page Builder (React + PHP)\n3. Loyalty Whitelabel App (React + Web3)\n4. Loyalty Admin Dashboard (React + MUI)\n5. This portfolio! (React Three Fiber)",
  experience: "Sync Design Tech (2025-Present) \u2192 Frontend Engineer\nWooskill (2024-2025) \u2192 Software Engineer\nqiibee (2021-2023) \u2192 React Developer\nSportion (2021) \u2192 UI/UX Engineer\nIU Networks (2020-2021) \u2192 Frontend Developer",
  contact: "Email: alwinaharutyunyan@gmail.com\nGitHub: github.com/alwihar\nLinkedIn: linkedin.com/in/alwina-harutyunyan\nPhone: +37455400444\nWebsite: alwi.me",
  secret: "The Observatory holds more than meets the eye.\nLook for the glow where walls should be solid.\n\n[HACKER achievement unlocked]",
  "sudo hire-me": "Permission granted. Sending resume to all Fortune 500 companies...\nJust kidding. But seriously, let's chat \u2192 alwinaharutyunyan@gmail.com",
};

export function InteractiveTerminal() {
  const [history, setHistory] = useState<readonly { readonly cmd: string; readonly output: string }[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const visited = useGameStore((s) => s.visitedPlatforms.size);
  const collected = useGameStore((s) => s.collectedOrbs.size);
  const xp = useGameStore((s) => s.xp);
  const achievementCount = useGameStore((s) => s.achievements.size);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [history]);

  const execute = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      if (!trimmed) return;
      if (trimmed === "clear") { setHistory([]); return; }
      if (trimmed === "exit") { closePlatformDetail(); return; }

      let output = COMMANDS[trimmed];
      if (trimmed === "status") {
        output = `Platforms visited: ${visited}/7\nOrbs collected: ${collected}/12\nAchievements: ${achievementCount}\nXP: ${xp}`;
      }
      if (trimmed === "secret") { unlockAchievement("hacker"); }
      if (!output) {
        output = `Command not found: ${trimmed}\nType 'help' for available commands.`;
      }
      setHistory((h) => [...h, { cmd, output }]);
    },
    [visited, collected, xp, achievementCount, unlockAchievement],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { execute(input); setInput(""); }
  };

  return (
    <div>
      <h2 style={{ color: "#00ff88", margin: "0 0 16px 0", fontSize: "16px", letterSpacing: "3px" }}>
        TERMINAL
      </h2>
      <div
        ref={scrollRef}
        style={{
          height: "350px", overflowY: "auto", background: "rgba(0,0,0,0.6)",
          border: "1px solid rgba(0,255,136,0.15)", borderRadius: "6px",
          padding: "12px", fontFamily: "'Courier New', monospace", fontSize: "13px",
          lineHeight: 1.6, marginBottom: "12px",
        }}
      >
        <div style={{ color: "#00ff88", opacity: 0.5, marginBottom: "8px" }}>
          Welcome to COSMIC OS v1.0<br />Type 'help' for available commands.
        </div>
        {history.map((entry, i) => (
          <div key={i} style={{ marginBottom: "8px" }}>
            <div style={{ color: "#00f0ff" }}>
              <span style={{ color: "#808090" }}>visitor@cosmic</span>:~$ {entry.cmd}
            </div>
            <div style={{ color: "#e0e0ff", opacity: 0.8, whiteSpace: "pre-wrap" }}>{entry.output}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,255,136,0.1)",
          borderRadius: "6px", padding: "8px 12px",
        }}
      >
        <span style={{ color: "#808090", fontSize: "13px", fontFamily: "'Courier New', monospace" }}>
          visitor@cosmic:~$
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            color: "#00f0ff", fontSize: "13px", fontFamily: "'Courier New', monospace",
          }}
          autoFocus
        />
      </div>
    </div>
  );
}
