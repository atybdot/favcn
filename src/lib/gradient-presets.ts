import type { GradientType } from "./favicon";

export interface GradientPreset {
  id: string;
  name: string;
  colors: string[];
  type: GradientType;
  angle: number;
}

export interface SolidColorPreset {
  id: string;
  name: string;
  color: string;
}

// Curated solid color presets
export const SOLID_COLOR_PRESETS: SolidColorPreset[] = [
  { id: "black", name: "Black", color: "#000000" },
  { id: "white", name: "White", color: "#ffffff" },
  { id: "zinc-900", name: "Zinc", color: "#18181b" },
  { id: "slate-800", name: "Slate", color: "#1e293b" },
  { id: "red-500", name: "Red", color: "#ef4444" },
  { id: "orange-500", name: "Orange", color: "#f97316" },
  { id: "amber-500", name: "Amber", color: "#f59e0b" },
  { id: "yellow-500", name: "Yellow", color: "#eab308" },
  { id: "lime-500", name: "Lime", color: "#84cc16" },
  { id: "green-500", name: "Green", color: "#22c55e" },
  { id: "emerald-500", name: "Emerald", color: "#10b981" },
  { id: "teal-500", name: "Teal", color: "#14b8a6" },
  { id: "cyan-500", name: "Cyan", color: "#06b6d4" },
  { id: "sky-500", name: "Sky", color: "#0ea5e9" },
  { id: "blue-500", name: "Blue", color: "#3b82f6" },
  { id: "indigo-500", name: "Indigo", color: "#6366f1" },
  { id: "violet-500", name: "Violet", color: "#8b5cf6" },
  { id: "purple-500", name: "Purple", color: "#a855f7" },
  { id: "fuchsia-500", name: "Fuchsia", color: "#d946ef" },
  { id: "pink-500", name: "Pink", color: "#ec4899" },
  { id: "rose-500", name: "Rose", color: "#f43f5e" },
];

// Well-curated gradient presets sourced from uiGradients, WebGradients, and Coolors
export const GRADIENT_PRESETS: GradientPreset[] = [
  // Vibrant / Bold
  {
    id: "flare",
    name: "Flare",
    colors: ["#f12711", "#f5af19"],
    type: "linear",
    angle: 135,
  },
  {
    id: "sublime",
    name: "Sublime",
    colors: ["#FC466B", "#3F5EFB"],
    type: "linear",
    angle: 135,
  },
  {
    id: "hyper",
    name: "Hyper",
    colors: ["#f953c6", "#b91d73"],
    type: "linear",
    angle: 135,
  },
  {
    id: "jshine",
    name: "JShine",
    colors: ["#12c2e9", "#c471ed", "#f64f59"],
    type: "linear",
    angle: 135,
  },
  {
    id: "wiretap",
    name: "Wiretap",
    colors: ["#8A2387", "#E94057", "#F27121"],
    type: "linear",
    angle: 135,
  },
  {
    id: "quepal",
    name: "Quepal",
    colors: ["#11998e", "#38ef7d"],
    type: "linear",
    angle: 135,
  },

  // Cool
  {
    id: "aqua",
    name: "Aqua Marine",
    colors: ["#1A2980", "#26D0CE"],
    type: "linear",
    angle: 135,
  },
  {
    id: "cool-blues",
    name: "Cool Blues",
    colors: ["#2193b0", "#6dd5ed"],
    type: "linear",
    angle: 135,
  },
  {
    id: "stripe",
    name: "Stripe",
    colors: ["#6772E5", "#00D4FF"],
    type: "linear",
    angle: 135,
  },
  {
    id: "azur",
    name: "Azur Lane",
    colors: ["#7F7FD5", "#86A8E7", "#91EAE4"],
    type: "linear",
    angle: 135,
  },

  // Warm
  {
    id: "sunrise",
    name: "Sunrise",
    colors: ["#FF512F", "#F09819"],
    type: "linear",
    angle: 135,
  },
  {
    id: "relay",
    name: "Relay",
    colors: ["#3A1C71", "#D76D77", "#FFAF7B"],
    type: "linear",
    angle: 135,
  },
  {
    id: "mango",
    name: "Mango Pulp",
    colors: ["#F09819", "#EDDE5D"],
    type: "linear",
    angle: 90,
  },

  // Dark / Moody
  {
    id: "celestial",
    name: "Celestial",
    colors: ["#C33764", "#1D2671"],
    type: "linear",
    angle: 135,
  },
  {
    id: "witching",
    name: "Witching Hour",
    colors: ["#c31432", "#240b36"],
    type: "linear",
    angle: 180,
  },
  {
    id: "moonlit",
    name: "Moonlit",
    colors: ["#0F2027", "#203A43", "#2C5364"],
    type: "linear",
    angle: 135,
  },
];

export type BackgroundType = "solid" | "gradient" | "custom";

export interface BackgroundConfig {
  type: BackgroundType;
  solidColor: string;
  gradientPreset: GradientPreset | null;
  customGradient: {
    colors: string[];
    type: GradientType;
    angle: number;
  };
}

export const DEFAULT_BACKGROUND_CONFIG: BackgroundConfig = {
  type: "solid",
  solidColor: "#18181b",
  gradientPreset: null,
  customGradient: {
    colors: ["#6366f1", "#ec4899"],
    type: "linear",
    angle: 135,
  },
};
