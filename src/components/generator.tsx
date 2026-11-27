import { useState, useEffect, useRef, Activity, type ElementType } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import {
  UploadCloud,
  Download,
  X,
  ImageIcon,
  SmilePlus,
  Palette,
  Type,
  Shapes,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

import {
  fileToImage,
  generateAssetsZip,
  createFaviconUrl,
  type RequiredSizes,
} from "../lib/favicon";
import type { GeneratorTab } from "../lib/generator-tabs";
import { GradientPanel } from "./gradient-panel";
import { TextPanel } from "./text-panel";
import { EmojiPanel } from "./emoji-panel";
import { ShapePanel } from "./shape-panel";
import { ModeToggle } from "./mode-toggle";
import { InstallationSection } from "./installation-section";

// ---------------------------------------------------------------------------
// Hoisted constants
// ---------------------------------------------------------------------------

type UploadMode = "file" | "emoji" | "gradient" | "text" | "shapes";

const TAB_TO_MODE: Record<GeneratorTab, UploadMode> = {
  image: "file",
  emoji: "emoji",
  text: "text",
  shapes: "shapes",
  gradient: "gradient",
};

const MODE_TO_TAB: Record<UploadMode, GeneratorTab> = {
  file: "image",
  emoji: "emoji",
  text: "text",
  shapes: "shapes",
  gradient: "gradient",
};

const MODE_TABS: { value: UploadMode; label: string; icon: ElementType }[] = [
  { value: "file", label: "image", icon: ImageIcon },
  { value: "emoji", label: "emoji", icon: SmilePlus },
  { value: "text", label: "text", icon: Type },
  { value: "shapes", label: "shapes", icon: Shapes },
  { value: "gradient", label: "gradient", icon: Palette },
];

const DROPZONE_ACCEPT = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/svg+xml": [".svg"],
  "image/webp": [".webp"],
} as const;

const SIZES_FULL: RequiredSizes = {
  faviconIco: true,
  png16: true,
  png32: true,
  png48: true,
  appleTouch: true,
  androidIcon: true,
};

const SIZES_ICO_ONLY: RequiredSizes = {
  faviconIco: true,
  png16: false,
  png32: false,
  png48: false,
  appleTouch: false,
  androidIcon: false,
};

function triggerDownload(href: string, filename: string) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(href);
}

async function downloadGeneratedAsset(sourceImage: HTMLImageElement, withBundle: boolean) {
  // Yield to the event loop so the UI (toast, button state) can update
  // before heavy canvas work begins.
  await new Promise((resolve) => setTimeout(resolve, 0));

  const sizes = withBundle ? SIZES_FULL : SIZES_ICO_ONLY;
  const { zipBlob } = await generateAssetsZip(sourceImage, sizes);

  if (withBundle) {
    triggerDownload(URL.createObjectURL(zipBlob), "favicon-assets.zip");
    return;
  }

  const JSZip = (await import("jszip")).default;
  const zip = await JSZip.loadAsync(zipBlob);
  const icoFile = zip.file("favicon.ico");
  if (!icoFile) return;

  triggerDownload(URL.createObjectURL(await icoFile.async("blob")), "favicon.ico");
}

async function loadDroppedImage(
  acceptedFiles: File[],
  fileRejections: FileRejection[],
  onImage: (img: HTMLImageElement) => void,
  onError: (message: string | null) => void,
) {
  onError(null);

  if (fileRejections.length > 0) {
    onError(fileRejections[0].errors[0].message);
    return;
  }

  const file = acceptedFiles[0];
  if (!file) return;

  try {
    onImage(await fileToImage(file));
  } catch (error) {
    onError(error instanceof Error ? error.message : "Failed to parse image.");
  }
}

// ---------------------------------------------------------------------------
// Generator — main component
// ---------------------------------------------------------------------------

export function Generator({ onSourceChange }: { onSourceChange?: (hasSource: boolean) => void }) {
  const search = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });

  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [mode, setMode] = useState<UploadMode>("file");
  // Ref to avoid mode dependency in handleModeChange (rerender-defer-reads)
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const [isGenerating, setIsGenerating] = useState(false);

  // Per-mode image cache: file mode stores its image here since it has no
  // auto-rendering effect like the other panels.
  const fileImageRef = useRef<{ img: HTMLImageElement; url: string } | null>(null);

  const [downloadZip, setDownloadZip] = useState(true);

  const onDrop = async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setError(null);
    if (fileRejections.length > 0) {
      setError(fileRejections[0].errors[0].message);
      return;
    }
    if (acceptedFiles.length === 0) return;
    try {
      const file = acceptedFiles[0];
      const img = await fileToImage(file);
      setSourceImage(img);
      setPreviewUrl(img.src);
      // Store file image for restoration when switching back
      fileImageRef.current = { img, url: img.src };
    } catch (e: any) {
      setError(e.message || "Failed to parse image.");
    }
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: DROPZONE_ACCEPT,
    maxFiles: 1,
    multiple: false,
    noClick: !!previewUrl && mode === "file",
    noKeyboard: !!previewUrl && mode === "file",
  });

  const clearSource = () => {
    setSourceImage(null);
    setPreviewUrl(null);
    setError(null);
    // If in file mode, also clear the stored file image
    if (modeRef.current === "file") {
      fileImageRef.current = null;
    }
  };

  const handleGenerate = async () => {
    if (!sourceImage) return;

    setIsGenerating(true);
    setError(null);

    const toastId = toast.loading("generating favicon assets\u2026");

    try {
      const sizesToGenerate = downloadZip ? SIZES_FULL : SIZES_ICO_ONLY;

      // Yield to the event loop so the UI (toast, button state) can update
      // before heavy canvas work begins.
      await new Promise((r) => setTimeout(r, 0));

      const { zipBlob } = await generateAssetsZip(sourceImage, sizesToGenerate);

      let downloadUrl = "";
      let filename = "";

      if (downloadZip) {
        downloadUrl = URL.createObjectURL(zipBlob);
        filename = "favicon-assets.zip";
      } else {
        const JSZip = (await import("jszip")).default;
        const zip = await JSZip.loadAsync(zipBlob);
        const icoFile = zip.file("favicon.ico");
        if (icoFile) {
          const icoBlob = await icoFile.async("blob");
          downloadUrl = URL.createObjectURL(icoBlob);
          filename = "favicon.ico";
        }
      }

      if (downloadUrl) {
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
      }

      toast.success("favicon assets ready \u2014 download started.", { id: toastId });
    } catch (e: any) {
      const msg = e.message || "Generation failed.";
      setError(msg);
      toast.error(msg, { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper: does the active mode have an image selected?
  const hasFilePreview = mode === "file" && previewUrl;

  // Switches the visible panel and restores the cached image for the chosen mode.
  const applyMode = (newMode: UploadMode) => {
    if (newMode === modeRef.current) return;
    setMode(newMode);
    modeRef.current = newMode;

    if (newMode !== "file") {
      // Activity makes the panel visible, its effects re-fire renderPreview()
      // -> onImageReady(), so sourceImage/previewUrl restore themselves.
      return;
    }

    // Restore file image from ref (other panels have no auto-effect for file mode)
    setSourceImage(fileImageRef.current?.img ?? null);
    setPreviewUrl(fileImageRef.current?.url ?? null);
  };

  // A ?tab= link, the back button, or a keyword redirect can change the URL
  // without remounting this component. Keep the panel in sync with the URL.
  useEffect(() => {
    if (!search.tab) return;
    applyMode(TAB_TO_MODE[search.tab]);
  }, [search.tab]);

  const handleModeChange = (newMode: UploadMode) => {
    applyMode(newMode);
    void navigate({
      to: "/",
      search: { tab: MODE_TO_TAB[newMode] },
      replace: true,
    });
  };

  // Activity visibility for the panel of the given mode.
  const panelMode = (target: UploadMode) => (mode === target ? "visible" : "hidden");

  // --- Live favicon update (debounced) ---
  // Uses a downscaled 32x32 data-URL so large source images don't break
  // the browser-tab favicon (multi-MB data-URLs are too large).
  const faviconTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasShownFaviconHint = useRef(false);
  useEffect(() => {
    if (!sourceImage) return;

    if (faviconTimerRef.current) clearTimeout(faviconTimerRef.current);

    faviconTimerRef.current = setTimeout(() => {
      createFaviconUrl(sourceImage).then((smallUrl) => {
        // Remove all competing static icon links so the browser uses ours.
        for (const el of document.querySelectorAll<HTMLLinkElement>(
          'link[rel="icon"]:not([data-live])',
        )) {
          el.remove();
        }

        let link = document.querySelector<HTMLLinkElement>('link[rel="icon"][data-live]');
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          link.setAttribute("data-live", "true");
          document.head.appendChild(link);
        }
        link.href = smallUrl;

        if (!hasShownFaviconHint.current) {
          // hasShownFaviconHint.current = true;
          toast("look at the browser tab. your favicon is live.", {
            duration: 4000,
            position: "top-left",
            dismissible: true,
            style: {
              borderRadius: "0px",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              background: "var(--background-secondary)",
              fontWeight: "200",
            },
          });
        }
      });
    }, 300);

    return () => {
      if (faviconTimerRef.current) clearTimeout(faviconTimerRef.current);
    };
  }, [sourceImage, previewUrl]);

  return (
    <div className="flex min-w-0 flex-col gap-12">
      {/* header */}
      <header className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl">favcn.</h1>
            <p className="text-lg text-muted-foreground">free favicon generator</p>
          </div>
          <ModeToggle />
        </div>
        <p className="text-muted-foreground tracking-tight">
          Start from an image, emoji, text, shape or gradient. Everything renders in this tab, so
          nothing uploads.
        </p>
      </header>

      {/* mode toggle — data-driven loop */}
      <div className="-mb-6 flex flex-wrap gap-x-4 gap-y-2 border-b border-border">
        {MODE_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleModeChange(tab.value)}
            className={`flex items-center gap-2 border-b-2 px-1 pb-3 text-sm transition-colors ${
              mode === tab.value
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* content panels — Activity preserves state when hidden */}
      <div>
        {/* file panel — no Activity wrapper needed (no component to preserve) */}
        {mode === "file" ? (
          <>
            {/* Hidden file input — always in the DOM so open() works from the preview */}
            <input {...getInputProps()} />

            {hasFilePreview ? (
              <div className="relative flex flex-col items-center gap-4">
                <button
                  type="button"
                  onClick={clearSource}
                  className="absolute -right-2 -top-2 rounded-full border border-border bg-background p-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X size={14} />
                </button>
                <div className="flex items-end gap-6">
                  <div className="space-y-2 text-center">
                    <img
                      src={previewUrl}
                      className="size-24 rounded-md border border-border checkerboard object-cover"
                      alt="Preview"
                    />
                    <span className="text-[10px] text-muted-foreground">original</span>
                  </div>
                  <div className="space-y-2 text-center">
                    <img
                      src={previewUrl}
                      className="size-8 rounded-sm border border-border checkerboard object-cover"
                      alt="32px"
                    />
                    <span className="text-[10px] text-muted-foreground">32px</span>
                  </div>
                  <div className="space-y-2 text-center">
                    <img
                      src={previewUrl}
                      className="size-4 rounded-sm border border-border checkerboard object-cover"
                      alt="16px"
                    />
                    <span className="text-[10px] text-muted-foreground">16px</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={open}
                  className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  change image
                </button>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-14 text-center transition-colors ${
                  isDragActive
                    ? "border-foreground bg-muted/50"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <UploadCloud size={20} className="text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    drop an image here, or{" "}
                    <span className="text-foreground underline underline-offset-4">browse</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground/60">png, svg, jpg, webp</p>
                </div>
              </div>
            )}
          </>
        ) : null}

        {/* emoji panel */}
        <Activity mode={panelMode("emoji")}>
          <EmojiPanel onImageReady={handleImageReady} onClear={clearSource} />
        </Activity>

        {/* text panel */}
        <Activity mode={panelMode("text")}>
          <TextPanel onImageReady={handleImageReady} />
        </Activity>

        {/* shapes panel */}
        <Activity mode={panelMode("shapes")}>
          <ShapePanel onImageReady={handleImageReady} />
        </Activity>

        {/* gradient panel */}
        <Activity mode={panelMode("gradient")}>
          <GradientPanel onImageReady={handleImageReady} />
        </Activity>
      </div>

      {/* error */}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {/* options + generate */}
      {sourceImage ? (
        <div className="flex flex-col gap-6 border-t border-border pt-6">
          <div className="flex items-start gap-3">
            <Checkbox
              id="downloadZip"
              checked={downloadZip}
              onCheckedChange={(checked) => setDownloadZip(checked === true)}
              className="mt-0.5"
            />
            <div className="space-y-1 leading-none">
              <Label htmlFor="downloadZip" className="text-sm">
                include the full bundle
              </Label>
              <p className="text-xs text-muted-foreground">
                png sizes, apple touch, android icons and the manifest alongside the ico
              </p>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full text-xs uppercase tracking-widest"
          >
            <Download size={14} className="mr-2" />
            {downloadZip ? "download bundle" : "download .ico"}
          </Button>
        </div>
      ) : null}

      {/* Installation instructions — shown as soon as a source image is selected */}
      {sourceImage ? <InstallationSection isBundle={downloadZip} /> : null}
    </div>
  );
}
