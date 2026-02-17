import { useEffect, useRef } from "react";
import nipplejs from "nipplejs";

interface MobileControlsProps {
  readonly onMove: (x: number, y: number) => void;
  readonly onEnd: () => void;
}

export function MobileControls({ onMove, onEnd }: MobileControlsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const manager = nipplejs.create({
      zone: containerRef.current,
      mode: "static",
      position: { left: "80px", bottom: "80px" },
      color: "#00f0ff",
      size: 120,
    });

    manager.on("move", (_, data) => {
      if (data.vector) {
        onMove(data.vector.x, data.vector.y);
      }
    });

    manager.on("end", () => {
      onEnd();
    });

    return () => {
      manager.destroy();
    };
  }, [onMove, onEnd]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "200px",
        height: "200px",
        zIndex: 100,
      }}
    />
  );
}
