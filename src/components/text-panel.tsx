import { useState, useEffect, useRef } from "react";
import { Input } from "@favicon/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@favicon/ui/components/select";
import { cn } from "@favicon/ui/lib/utils";

import { textToImage } from "../lib/favicon";
import { ColorSwatchPicker } from "./color-swatch-picker";

interface TextPanelProps {
  onImageReady: (img: HTMLImageElement, previewUrl: string) => void;
}

const FONTS = [
  { value: "geist-sans", label: "Geist Sans", family: '"Geist", sans-serif', variable: true },
  { value: "geist-mono", label: "Geist Mono", family: '"Geist Mono", monospace', variable: true },
  {
    value: "geist-pixel-square",
    label: "Geist Pixel Square",
    family: '"Geist Pixel Square", monospace',
    variable: false,
  },
  {
    value: "geist-pixel-grid",
    label: "Geist Pixel Grid",
    family: '"Geist Pixel Grid", monospace',
    variable: false,
  },
  {
    value: "geist-pixel-circle",
    label: "Geist Pixel Circle",
    family: '"Geist Pixel Circle", monospace',
    variable: false,
  },
  {
    value: "geist-pixel-triangle",
    label: "Geist Pixel Triangle",
    family: '"Geist Pixel Triangle", monospace',
    variable: false,
  },
  {
    value: "geist-pixel-line",
    label: "Geist Pixel Line",
    family: '"Geist Pixel Line", monospace',
    variable: false,
  },
  { value: "system-ui", label: "System UI", family: "system-ui, sans-serif", variable: true },
  { value: "arial", label: "Arial", family: "Arial, sans-serif", variable: true },
  { value: "georgia", label: "Georgia", family: "Georgia, serif", variable: true },
  {
    value: "times",
    label: "Times New Roman",
    family: '"Times New Roman", serif',
    variable: true,
  },
  {
    value: "courier",
    label: "Courier New",
    family: '"Courier New", monospace',
    variable: true,
  },
];

const FONT_WEIGHTS = [
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semibold" },
  { value: "700", label: "Bold" },
  { value: "800", label: "Extrabold" },
  { value: "900", label: "Black" },
];

const FONT_SIZES = [
  { value: 20, label: "xs" },
  { value: 35, label: "sm" },
  { value: 50, label: "base" },
  { value: 70, label: "lg" },
  { value: 90, label: "xl" },
];

export function TextPanel({ onImageReady }: TextPanelProps): React.JSX.Element {
  const [text, setText] = useState("Ico");
  const [fontSize, setFontSize] = useState(50);
  const [textColor, setTextColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("#000");
  const [selectedFont, setSelectedFont] = useState("geist-mono");
  const [fontWeight, setFontWeight] = useState("500");

  const previewRef = useRef<HTMLCanvasElement>(null);

  const currentFont = FONTS.find((f) => f.value === selectedFont);
  const isPixelFont = currentFont ? !currentFont.variable : false;

  // Get the font family string for the selected font
  const getFontFamily = () => {
    return currentFont?.family ?? "system-ui, sans-serif";
  };

  // Force weight to 500 for pixel fonts
  const effectiveWeight = isPixelFont ? "500" : fontWeight;

  const renderPreview = () => {
    if (!text) return;

    const img = textToImage({
      text,
      fontSize,
      textColor,
      fontFamily: getFontFamily(),
      fontWeight: effectiveWeight,
      background: { type: "solid", solidColor: backgroundColor },
      shape: "square",
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

  useEffect(() => {
    renderPreview();
  }, [text, fontSize, textColor, backgroundColor, effectiveWeight, selectedFont]);

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

      {/* font selector */}
      {/* text input */}
      <div className="space-y-2">
        <span className="text-[11px] text-muted-foreground">text (1-3 characters)</span>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 3))}
          placeholder="Ico"
          maxLength={3}
          className="font-mono text-lg"
        />
      </div>
      <div className="space-y-2">
        <span className="text-[11px] text-muted-foreground">font</span>
        <div className="flex gap-2">
          <Select value={selectedFont} onValueChange={(v) => v && setSelectedFont(v)}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select font">
                {(value: string | null) => {
                  const font = FONTS.find((f) => f.value === value);
                  return font?.label ?? value ?? "Select font";
                }}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <div className="px-2 py-1.5 text-[10px] font-medium text-muted-foreground">Geist</div>
              {FONTS.filter((f) => f.value.startsWith("geist")).map((font) => (
                <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.family }}>
                  {font.label}
                </SelectItem>
              ))}
              <div className="px-2 py-1.5 text-[10px] font-medium text-muted-foreground">
                System
              </div>
              {FONTS.filter((f) => !f.value.startsWith("geist")).map((font) => (
                <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.family }}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={effectiveWeight}
            onValueChange={(v) => v && setFontWeight(v)}
            disabled={isPixelFont}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Weight">
                {(value: string | null) => {
                  const weight = FONT_WEIGHTS.find((w) => w.value === value);
                  return weight?.label ?? value ?? "Weight";
                }}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {FONT_WEIGHTS.map((weight) => (
                <SelectItem key={weight.value} value={weight.value}>
                  {weight.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* font size */}
      <div className="space-y-2">
        <span className="text-[11px] text-muted-foreground">size</span>
        <div className="flex gap-1">
          {FONT_SIZES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setFontSize(s.value)}
              className={cn(
                "flex-1 rounded-none border px-2 py-1 text-[11px] font-medium transition-colors",
                fontSize === s.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/50",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* colors */}
      <div className="flex flex-col gap-4">
        {/* text color */}
        <div className="space-y-2">
          <span className="text-[11px] text-muted-foreground">text color</span>
          <ColorSwatchPicker value={textColor} onChange={setTextColor} />
        </div>

        {/* background color */}
        <div className="space-y-2">
          <span className="text-[11px] text-muted-foreground">background</span>
          <ColorSwatchPicker value={backgroundColor} onChange={setBackgroundColor} />
        </div>
      </div>
    </div>
  );
}
