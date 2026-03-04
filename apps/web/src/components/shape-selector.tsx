import type { BackgroundShape } from "../lib/favicon";
import { Square, Circle, RectangleHorizontal } from "lucide-react";

const SHAPES: { value: BackgroundShape; label: string; icon: typeof Square }[] = [
  { value: "square", label: "square", icon: Square },
  { value: "circle", label: "circle", icon: Circle },
  { value: "rounded-rect", label: "rounded", icon: RectangleHorizontal },
];

interface ShapeSelectorProps {
  value: BackgroundShape;
  onChange: (shape: BackgroundShape) => void;
}

export function ShapeSelector({ value, onChange }: ShapeSelectorProps): React.JSX.Element {
  return (
    <div className="space-y-2">
      <span className="text-[11px] text-muted-foreground">background shape</span>
      <div className="flex gap-2">
        {SHAPES.map((s) => {
          const Icon = s.icon;
          const active = value === s.value;
          return (
            <button
              key={s.value}
              type="button"
              onClick={() => onChange(s.value)}
              className={`flex items-center gap-1.5 rounded-none border px-2.5 py-1.5 text-[11px] transition-colors ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={12} />
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
