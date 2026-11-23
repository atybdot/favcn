import { useState, useEffect, useRef } from "react";
import {
  Plus,
  X,
  ArrowUpLeft,
  ArrowUp,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ArrowDownLeft,
  ArrowDown,
  ArrowDownRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  gradientToImage,
  type GradientType,
  type RadialPosition,
  type RadialSize,
} from "../lib/favicon";
import { GRADIENT_PRESETS, type GradientPreset } from "../lib/gradient-presets";
import { ColorInput } from "./color-input";

const GRADIENT_TYPES: { value: GradientType; label: string }[] = [
  { value: "linear", label: "linear" },
  { value: "radial", label: "radial" },
];

const DEFAULT_COLORS = ["#6366f1", "#ec4899"];

// Direction grid for linear angle: maps position to degrees
const DIRECTION_ANGLES: { icon: typeof ArrowUp | null; angle: number }[] = [
  { icon: ArrowUpLeft, angle: 315 },
  { icon: ArrowUp, angle: 0 },
  { icon: ArrowUpRight, angle: 45 },
  { icon: ArrowLeft, angle: 270 },
  { icon: null, angle: -1 }, // center = custom input
  { icon: ArrowRight, angle: 90 },
  { icon: ArrowDownLeft, angle: 225 },
  { icon: ArrowDown, angle: 180 },
  { icon: ArrowDownRight, angle: 135 },
];

// Radial position grid: 9 positions
const RADIAL_POSITIONS: RadialPosition[] = [
  "top-left",
  "top",
  "top-right",
  "left",
  "center",
  "right",
  "bottom-left",
  "bottom",
  "bottom-right",
];

const RADIAL_SIZES: { value: RadialSize; label: string }[] = [
  { value: "small", label: "S" },
  { value: "medium", label: "M" },
  { value: "large", label: "L" },
  { value: "full", label: "Full" },
];

interface GradientPanelProps {
  onImageReady: (img: HTMLImageElement, previewUrl: string) => void;
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

export function GradientPanel({ onImageReady }: GradientPanelProps): React.JSX.Element {
  const [colors, setColors] = useState<string[]>(DEFAULT_COLORS);
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(135);
  const [radialPosition, setRadialPosition] = useState<RadialPosition>("center");
  const [radialSize, setRadialSize] = useState<RadialSize>("large");
  const [selectedPreset, setSelectedPreset] = useState<GradientPreset | null>(null);

  const previewRef = useRef<HTMLCanvasElement>(null);

  // Render the gradient preview and notify parent.
  // We pass values explicitly to avoid any stale-closure issues.
  const doRender = (opts: {
    colors: string[];
    gradientType: GradientType;
    angle: number;
    radialPosition: RadialPosition;
    radialSize: RadialSize;
  }) => {
    const img = gradientToImage({
      colors: opts.colors,
      gradientType: opts.gradientType,
      angle: opts.angle,
      shape: "square",
      radialPosition: opts.radialPosition,
      radialSize: opts.radialSize,
    });

    const canvas = previewRef.current;

    const finish = () => {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }
      onImageReady(img, img.src);
    };

    if (img.complete) finish();
    else img.onload = finish;
  };

  // Re-render preview whenever any gradient parameter changes
  useEffect(() => {
    doRender({ colors, gradientType, angle, radialPosition, radialSize });
  }, [colors, gradientType, angle, radialPosition, radialSize]);

  const addColor = () => {
    if (colors.length >= 4) return;
    setColors([...colors, "#ffffff"]);
  };

  const removeColor = (index: number) => {
    if (colors.length <= 2) return;
    setColors(colors.filter((_, i) => i !== index));
  };

  const updateColor = (index: number, value: string) => {
    const next = [...colors];
    next[index] = value;
    setColors(next);
    setSelectedPreset(null);
  };

  const handlePresetSelect = (preset: GradientPreset) => {
    setSelectedPreset(preset);
    setColors(preset.colors);
    setGradientType(preset.type);
    setAngle(preset.angle);
  };

  const handleGradientTypeChange = (type: GradientType) => {
    setGradientType(type);
    setSelectedPreset(null);
  };

  const handleAngleChange = (newAngle: number) => {
    setAngle(newAngle);
    setSelectedPreset(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* live preview */}
      <div className="flex justify-center">
        <canvas
          ref={previewRef}
          width={256}
          height={256}
          className="size-32 rounded-md border border-border bg-muted/30"
        />
      </div>

      {/* preset gradients */}
      <div className="space-y-2">
        <span className="text-[11px] text-muted-foreground">presets</span>
        <div className="grid grid-cols-8 gap-1.5">
          {GRADIENT_PRESETS.map((preset) => {
            const gradientStyle = getGradientCss(preset);
            const isSelected = selectedPreset?.id === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                title={preset.name}
                onClick={() => handlePresetSelect(preset)}
                className={`aspect-square w-full rounded-sm border-none transition-all ${
                  isSelected
                    ? "border-foreground ring-1 ring-foreground ring-offset-1 ring-offset-background"
                    : "border-border hover:border-muted-foreground"
                }`}
                style={{ background: gradientStyle }}
              />
            );
          })}
        </div>
        {selectedPreset && (
          <p className="text-[10px] text-muted-foreground">
            selected: <span className="text-foreground">{selectedPreset.name}</span>
          </p>
        )}
      </div>

      {/* color stops */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">colors</span>
          {colors.length < 4 && (
            <button
              type="button"
              onClick={addColor}
              className="flex items-center gap-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Plus size={10} />
              add
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {colors.map((color, i) => (
            <div key={i} className="group relative">
              <div className="w-28">
                <ColorInput value={color} onChange={(v) => updateColor(i, v)} />
              </div>
              {colors.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeColor(i)}
                  className="absolute -right-1.5 -top-1.5 hidden rounded-full border border-border bg-background p-0.5 text-muted-foreground transition-colors hover:text-foreground group-hover:block"
                >
                  <X size={8} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* gradient type + controls — side by side */}
      <div className="flex gap-6">
        {/* gradient type */}
        <div className="space-y-2">
          <span className="text-[11px] text-muted-foreground">type</span>
          <div className="flex flex-col gap-1">
            {GRADIENT_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => handleGradientTypeChange(t.value)}
                className={`rounded-none border px-3 py-1.5 text-[11px] transition-colors ${
                  gradientType === t.value
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* angle direction grid (linear only) */}
        {gradientType === "linear" && (
          <div className="flex-1 space-y-2">
            <span className="text-[11px] text-muted-foreground">angle</span>
            <div className="grid grid-cols-3 gap-1">
              {DIRECTION_ANGLES.map((d, i) => {
                if (d.angle === -1) {
                  // Center cell: custom angle input
                  return (
                    <Input
                      key={i}
                      type="number"
                      min={0}
                      max={360}
                      value={angle}
                      onChange={(e) => handleAngleChange(Number(e.target.value))}
                      className="h-8 rounded-none border p-0 text-center font-mono text-[10px] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  );
                }
                const active = angle === d.angle;
                const Icon = d.icon!;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAngleChange(d.angle)}
                    className={cn(
                      "flex h-8 items-center justify-center rounded-none border transition-colors",
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon size={14} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* radial controls — stacked beside type buttons */}
        {gradientType === "radial" && (
          <div className="flex flex-1 flex-col gap-4">
            {/* position grid */}
            <div className="space-y-2">
              <span className="text-[11px] text-muted-foreground">position</span>
              <div className="grid grid-cols-3 gap-1">
                {RADIAL_POSITIONS.map((pos) => {
                  const active = radialPosition === pos;
                  return (
                    <button
                      key={pos}
                      type="button"
                      title={pos}
                      onClick={() => {
                        setRadialPosition(pos);
                        setSelectedPreset(null);
                      }}
                      className={cn(
                        "flex h-8 items-center justify-center rounded-none border transition-colors",
                        active
                          ? "border-foreground bg-foreground"
                          : "border-border hover:border-muted-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          active ? "bg-background" : "bg-muted-foreground/40",
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* size buttons — horizontal row */}
            <div className="space-y-2">
              <span className="text-[11px] text-muted-foreground">size</span>
              <div className="flex gap-1">
                {RADIAL_SIZES.map((s) => {
                  const active = radialSize === s.value;
                  return (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => {
                        setRadialSize(s.value);
                        setSelectedPreset(null);
                      }}
                      className={cn(
                        "flex-1 rounded-none border px-3 py-1 text-[11px] font-medium transition-colors",
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground",
                      )}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
