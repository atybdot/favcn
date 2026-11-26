import { useState, useEffect, useRef } from "react";
import { Square, Circle, Triangle, Diamond, Hexagon, Star, Heart } from "lucide-react";

import { shapeToImage, type ShapeType, type ShapeSize } from "../lib/favicon";
import { ColorSwatchPicker } from "./color-swatch-picker";

interface ShapePanelProps {
  onImageReady: (img: HTMLImageElement, previewUrl: string) => void;
}

const SHAPES: { value: ShapeType; label: string; icon: typeof Square }[] = [
  { value: "square", label: "square", icon: Square },
  { value: "circle", label: "circle", icon: Circle },
  { value: "triangle", label: "triangle", icon: Triangle },
  { value: "diamond", label: "diamond", icon: Diamond },
  { value: "hexagon", label: "hexagon", icon: Hexagon },
  { value: "star", label: "star", icon: Star },
  { value: "heart", label: "heart", icon: Heart },
];

const SHAPE_SIZES: { value: ShapeSize; label: string }[] = [
  { value: "xs", label: "xs" },
  { value: "sm", label: "sm" },
  { value: "base", label: "base" },
  { value: "lg", label: "lg" },
  { value: "xl", label: "xl" },
];

export function ShapePanel({ onImageReady }: ShapePanelProps): React.JSX.Element {
  const [shapeType, setShapeType] = useState<ShapeType>("circle");
  const [shapeSize, setShapeSize] = useState<ShapeSize>("base");
  const [fillColor, setFillColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("#6366f1");

  const previewRef = useRef<HTMLCanvasElement>(null);

  const renderPreview = () => {
    const img = shapeToImage({
      shapeType,
      fillColor,
      shapeSize,
      background: { type: "solid", solidColor: backgroundColor },
      backgroundShape: "square",
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
  }, [shapeType, shapeSize, fillColor, backgroundColor]);

  return (
    <div className="flex flex-col gap-6">
      {/* live preview */}
      <div className="flex justify-center">
        <canvas
          ref={previewRef}
          width={256}
          height={256}
          className="size-32 rounded-md border border-border checkerboard"
        />
      </div>

      {/* shape type selector */}
      <div className="space-y-2">
        <span className="text-[11px] text-muted-foreground">shape</span>
        <div className="grid grid-cols-3 gap-1">
          {SHAPES.map((s) => {
            const Icon = s.icon;
            const active = shapeType === s.value;
            return (
              <button
                key={s.value}
                type="button"
                title={s.label}
                onClick={() => setShapeType(s.value)}
                className={`flex items-center justify-center rounded-none border py-2 transition-colors ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>
      </div>

      {/* shape size */}
      <div className="space-y-2">
        <span className="text-[11px] text-muted-foreground">size</span>
        <div className="grid grid-cols-5 gap-1 w-full">
          {SHAPE_SIZES.map((s) => {
            const active = shapeSize === s.value;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => setShapeSize(s.value)}
                className={`flex-1 rounded-none border py-1.5 text-[11px] transition-colors ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* shape fill color */}
      <div className="space-y-2">
        <span className="text-[11px] text-muted-foreground">shape color</span>
        <ColorSwatchPicker value={fillColor} onChange={setFillColor} />
      </div>

      {/* background color */}
      <div className="space-y-2">
        <span className="text-[11px] text-muted-foreground">background color</span>
        <ColorSwatchPicker
          value={backgroundColor}
          onChange={setBackgroundColor}
          withAlpha
          withTransparent
        />
      </div>
    </div>
  );
}
