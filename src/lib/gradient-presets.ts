import type { GradientType } from "./favicon";

export interface GradientPreset {
  id: string;
  name: string;
  colors: string[];
  type: GradientType;
  angle: number;
}

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
