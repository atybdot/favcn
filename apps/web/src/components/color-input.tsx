import {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@favicon/ui/components/color-picker";
interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
  withAlpha?: boolean;
}

export function ColorInput({
  value,
  onChange,
  withAlpha = false,
}: ColorInputProps): React.JSX.Element {
  return (
    <ColorPicker value={value} onValueChange={onChange}>
      <ColorPickerTrigger
        variant="outline"
        size="sm"
        className="h-8 w-full justify-start gap-2 rounded-none px-2 font-mono text-[10px] text-muted-foreground"
      >
        <ColorPickerSwatch className="size-4 shrink-0 rounded-none border-none shadow-none" />
        <span>{value.toUpperCase()}</span>
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
  );
}
