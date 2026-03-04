import { useState } from "react";
import { X } from "lucide-react";
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
} from "@favicon/ui/components/ui/emoji-picker";

import { emojiToImage } from "../lib/favicon";

interface EmojiPanelProps {
  onImageReady: (img: HTMLImageElement, previewUrl: string) => void;
}

export function EmojiPanel({ onImageReady }: EmojiPanelProps): React.JSX.Element {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleEmojiSelect = async ({ emoji }: { emoji: string }) => {
    const char = Array.from(emoji)[0];
    if (!char) return;
    setSelectedEmoji(char);

    // Generate the image (async)
    const img = await emojiToImage(char);
    const url = img.src;
    setPreviewUrl(url);
    onImageReady(img, url);
  };

  const clearSelection = () => {
    setSelectedEmoji(null);
    setPreviewUrl(null);
  };

  // Show preview when emoji is selected (like image mode)
  if (selectedEmoji && previewUrl) {
    return (
      <div className="relative flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={clearSelection}
          className="absolute -right-2 -top-2 rounded-full border border-border bg-background p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X size={14} />
        </button>
        <div className="flex items-end gap-6">
          <div className="space-y-2 text-center">
            <img
              src={previewUrl}
              className="size-24 rounded-md border border-border bg-muted/30 object-cover"
              alt="Preview"
            />
            <span className="text-[10px] text-muted-foreground">original</span>
          </div>
          <div className="space-y-2 text-center">
            <img
              src={previewUrl}
              className="size-8 rounded-sm border border-border bg-muted/30 object-cover"
              alt="32px"
            />
            <span className="text-[10px] text-muted-foreground">32px</span>
          </div>
          <div className="space-y-2 text-center">
            <img
              src={previewUrl}
              className="size-4 rounded-sm border border-border bg-muted/30 object-cover"
              alt="16px"
            />
            <span className="text-[10px] text-muted-foreground">16px</span>
          </div>
        </div>
        <button
          type="button"
          onClick={clearSelection}
          className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          change emoji
        </button>
      </div>
    );
  }

  // Show emoji picker when no emoji is selected
  return (
    <div className="space-y-2">
      <span className="text-[11px] text-muted-foreground">select emoji</span>
      <EmojiPicker
        className="h-[250px] w-full rounded-lg border border-border"
        onEmojiSelect={handleEmojiSelect}
      >
        <EmojiPickerSearch placeholder="search emoji..." />
        <EmojiPickerContent />
        <EmojiPickerFooter />
      </EmojiPicker>
    </div>
  );
}
