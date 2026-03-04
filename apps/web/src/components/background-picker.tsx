import { Plus, X, Palette } from "lucide-react";
import { Slider } from "@favicon/ui/components/slider";

import {
  SOLID_COLOR_PRESETS,
  GRADIENT_PRESETS,
  type BackgroundConfig,
  type GradientPreset,
} from "../lib/gradient-presets";
import type { GradientType } from "../lib/favicon";

const GRADIENT_TYPES: { value: GradientType; label: string }[] = [
  { value: "linear", label: "linear" },
  { value: "radial", label: "radial" },
  { value: "diamond", label: "diamond" },
];

interface BackgroundPickerProps {
  config: BackgroundConfig;
  onChange: (config: BackgroundConfig) => void;
}

export function BackgroundPicker({ config, onChange }: BackgroundPickerProps): React.JSX.Element {
  const handleTypeChange = (type: BackgroundConfig["type"]) => {
    onChange({ ...config, type });
  };

  const handleSolidColorChange = (color: string) => {
    onChange({ ...config, type: "solid", solidColor: color });
  };

  const handleGradientPresetChange = (preset: GradientPreset) => {
    onChange({ ...config, type: "gradient", gradientPreset: preset });
  };

  const handleCustomGradientColorChange = (index: number, color: string) => {
    const colors = [...config.customGradient.colors];
    colors[index] = color;
    onChange({
      ...config,
      type: "custom",
      customGradient: { ...config.customGradient, colors },
    });
  };

  const handleAddCustomColor = () => {
    if (config.customGradient.colors.length >= 4) return;
    onChange({
      ...config,
      type: "custom",
      customGradient: {
        ...config.customGradient,
        colors: [...config.customGradient.colors, "#ffffff"],
      },
    });
  };

  const handleRemoveCustomColor = (index: number) => {
    if (config.customGradient.colors.length <= 2) return;
    onChange({
      ...config,
      type: "custom",
      customGradient: {
        ...config.customGradient,
        colors: config.customGradient.colors.filter((_, i) => i !== index),
      },
    });
  };

  const handleCustomGradientTypeChange = (type: GradientType) => {
    onChange({
      ...config,
      type: "custom",
      customGradient: { ...config.customGradient, type },
    });
  };

  const handleCustomGradientAngleChange = (angle: number) => {
    onChange({
      ...config,
      type: "custom",
      customGradient: { ...config.customGradient, angle },
    });
  };

  return (
    <div className="space-y-4">
      {/* Background type selector */}
      <div className="space-y-2">
        <span className="text-[11px] text-muted-foreground">background</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleTypeChange("solid")}
            className={`rounded-none border px-2.5 py-1.5 text-[11px] transition-colors ${
              config.type === "solid"
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
            }`}
          >
            solid
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("gradient")}
            className={`rounded-none border px-2.5 py-1.5 text-[11px] transition-colors ${
              config.type === "gradient"
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
            }`}
          >
            preset gradient
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("custom")}
            className={`flex items-center gap-1.5 rounded-none border px-2.5 py-1.5 text-[11px] transition-colors ${
              config.type === "custom"
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
            }`}
          >
            <Palette size={10} />
            custom
          </button>
        </div>
      </div>

      {/* Solid color picker */}
      {config.type === "solid" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">color</span>
            <label className="flex cursor-pointer items-center gap-1.5 rounded-none border border-border px-2 py-1">
              <input
                type="color"
                value={config.solidColor}
                onChange={(e) => handleSolidColorChange(e.target.value)}
                className="size-3 cursor-pointer appearance-none border-none bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-none [&::-webkit-color-swatch]:border-none"
              />
              <span className="font-mono text-[10px] text-muted-foreground">
                {config.solidColor.toUpperCase()}
              </span>
            </label>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {SOLID_COLOR_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                title={preset.name}
                onClick={() => handleSolidColorChange(preset.color)}
                className={`size-7 rounded-sm border transition-all ${
                  config.solidColor.toLowerCase() === preset.color.toLowerCase()
                    ? "border-foreground ring-1 ring-foreground ring-offset-1 ring-offset-background"
                    : "border-border hover:border-muted-foreground"
                }`}
                style={{ backgroundColor: preset.color }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Gradient preset picker */}
      {config.type === "gradient" && (
        <div className="space-y-2">
          <span className="text-[11px] text-muted-foreground">select gradient</span>
          <div className="grid grid-cols-6 gap-1.5">
            {GRADIENT_PRESETS.map((preset) => {
              const gradientStyle = getGradientCss(preset);
              const isSelected = config.gradientPreset?.id === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  title={preset.name}
                  onClick={() => handleGradientPresetChange(preset)}
                  className={`size-9 rounded-sm border transition-all ${
                    isSelected
                      ? "border-foreground ring-1 ring-foreground ring-offset-1 ring-offset-background"
                      : "border-border hover:border-muted-foreground"
                  }`}
                  style={{ background: gradientStyle }}
                />
              );
            })}
          </div>
          {config.gradientPreset && (
            <p className="text-[10px] text-muted-foreground">
              selected: <span className="text-foreground">{config.gradientPreset.name}</span>
            </p>
          )}
        </div>
      )}

      {/* Custom gradient editor */}
      {config.type === "custom" && (
        <div className="space-y-4">
          {/* Color stops */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">colors</span>
              {config.customGradient.colors.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddCustomColor}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Plus size={10} />
                  add
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {config.customGradient.colors.map((color, i) => (
                <div key={i} className="group relative">
                  <label className="flex cursor-pointer items-center gap-1.5 rounded-none border border-border px-2 py-1.5">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleCustomGradientColorChange(i, e.target.value)}
                      className="size-4 cursor-pointer appearance-none border-none bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-none [&::-webkit-color-swatch]:border-none"
                    />
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {color.toUpperCase()}
                    </span>
                  </label>
                  {config.customGradient.colors.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomColor(i)}
                      className="absolute -right-1.5 -top-1.5 hidden rounded-full border border-border bg-background p-0.5 text-muted-foreground transition-colors hover:text-foreground group-hover:block"
                    >
                      <X size={8} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Gradient type */}
          <div className="space-y-2">
            <span className="text-[11px] text-muted-foreground">type</span>
            <div className="flex gap-2">
              {GRADIENT_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => handleCustomGradientTypeChange(t.value)}
                  className={`rounded-none border px-2.5 py-1.5 text-[11px] transition-colors ${
                    config.customGradient.type === t.value
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Angle slider (linear only) */}
          {config.customGradient.type === "linear" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">angle</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {config.customGradient.angle}°
                </span>
              </div>
              <Slider
                value={[config.customGradient.angle]}
                onValueChange={(v: number | readonly number[]) =>
                  handleCustomGradientAngleChange(Array.isArray(v) ? v[0] : v)
                }
                min={0}
                max={360}
                step={1}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper to generate CSS gradient string for preview
function getGradientCss(preset: GradientPreset): string {
  const colors = preset.colors.join(", ");
  switch (preset.type) {
    case "radial":
      return `radial-gradient(circle, ${colors})`;
    case "diamond":
      return `linear-gradient(45deg, ${colors})`;
    case "linear":
    default:
      return `linear-gradient(${preset.angle}deg, ${colors})`;
  }
}
