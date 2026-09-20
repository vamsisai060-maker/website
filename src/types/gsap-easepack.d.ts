declare module 'gsap/EasePack.js' {
  interface RoughEaseVars {
    clamp?: boolean;
    points?: number;
    randomize?: boolean;
    strength?: number;
    taper?: 'in' | 'out' | 'both' | 'none';
    template?: string | ((progress: number) => number);
  }

  type EaseFunction = (progress: number) => number;

  export const RoughEase: {
    config(vars?: RoughEaseVars): EaseFunction;
  };

  export const EasePack: {
    version: string;
    name: string;
  };
}