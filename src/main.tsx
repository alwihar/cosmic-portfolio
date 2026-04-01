import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";

// Console Easter eggs
console.log(
  "%c COSMIC PORTFOLIO ",
  "background: linear-gradient(90deg, #00f0ff, #ff00ff); color: #000; font-size: 20px; font-weight: bold; padding: 8px 16px; border-radius: 4px;",
);
console.log(
  "%cPeeking under the hood? I like that. Let's talk \u2192 alwinaharutyunyan@gmail.com",
  "color: #00f0ff; font-size: 13px;",
);
console.log(
  "%cTry: window.hireMe() for a surprise",
  "color: #808090; font-size: 11px;",
);

(window as any).hireMe = () => {
  console.log(
    "%c\u2728 You've discovered the secret! Clearly you have great taste. %c\nLet's build something together \u2192 alwinaharutyunyan@gmail.com",
    "color: #ffaa00; font-size: 16px; font-weight: bold;",
    "color: #00ff88; font-size: 13px;",
  );
  return "Check your email outbox... just kidding. But seriously, let's chat!";
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
