import {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerTrigger,
} from "@favicon/ui/components/color-picker";
import { cn } from "@favicon/ui/lib/utils";
import { PaintBucket } from "lucide-react";

const PRESET_COLORS = [
  "#ffffff",
  "#000000",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
];

interface ColorSwatchPickerProps {
  value: string;
  onChange: (value: string) => void;
  /** When true, includes an alpha slider and supports rgba values */
  withAlpha?: boolean;
}

export function ColorSwatchPicker({
  value,
  onChange,
  withAlpha = false,
}: ColorSwatchPickerProps): React.JSX.Element {
  return (
    <div className="flex items-center gap-1">
      {PRESET_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={cn(
            "size-6 shrink-0 rounded-none border transition-all",
            value.toLowerCase() === color.toLowerCase()
              ? "border-foreground ring-1 ring-foreground ring-offset-1 ring-offset-background"
              : "border-foreground/10 hover:border-muted-foreground",
          )}
          style={{ backgroundColor: color }}
        />
      ))}
      {/* Custom color picker trigger */}
      <ColorPicker value={value} onValueChange={onChange}>
        <ColorPickerTrigger variant="outline" size="icon-sm" className="shrink-0">
          <PaintBucket className="size-3.5" />
        </ColorPickerTrigger>
        <ColorPickerContent className="w-[280px] rounded-none p-3" align="start">
          <ColorPickerArea className="h-32 rounded-none" />
          <ColorPickerHueSlider />
          {withAlpha && <ColorPickerAlphaSlider />}
          <div className="flex items-center gap-2">
            <ColorPickerEyeDropper size="icon" className="size-8 shrink-0 rounded-none" />
            <ColorPickerInput
              {...(!withAlpha && { withoutAlpha: true })}
              className="flex-1 font-mono text-xs"
            />
          </div>
        </ColorPickerContent>
      </ColorPicker>
    </div>
  );
}
