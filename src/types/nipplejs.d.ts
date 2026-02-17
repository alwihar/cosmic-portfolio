declare module "nipplejs" {
  interface JoystickManagerOptions {
    zone: HTMLElement;
    mode?: string;
    position?: { left?: string; bottom?: string; top?: string; right?: string };
    color?: string;
    size?: number;
  }

  interface JoystickOutputData {
    vector: { x: number; y: number };
  }

  interface JoystickManager {
    on(event: "move", handler: (evt: unknown, data: JoystickOutputData) => void): void;
    on(event: "end", handler: () => void): void;
    destroy(): void;
  }

  function create(options: JoystickManagerOptions): JoystickManager;
  export default { create };
}
