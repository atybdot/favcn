// --- Types ---
export type RequiredSizes = {
  faviconIco: boolean;
  png16: boolean;
  png32: boolean;
  png48: boolean;
  appleTouch: boolean;
  androidIcon: boolean;
};

// --- Core Parsers ---

export async function fileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function emojiToImage(emoji: string): Promise<HTMLImageElement> {
  const canvas = document.createElement("canvas");
  const size = 512;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context for emoji");

  ctx.font = `${size * 0.75}px 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.clearRect(0, 0, size, size);
  ctx.fillText(emoji, size / 2, size / 2 + size * 0.05);

  const dataUrl = canvas.toDataURL("image/png");
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}

// --- Types for gradient / text modes ---

export type BackgroundShape = "square" | "circle" | "rounded-rect";
export type GradientType = "linear" | "radial" | "diamond";
export type ShapeType = "square" | "circle" | "triangle" | "diamond" | "hexagon" | "star" | "heart";
export type ShapeSize = "xs" | "sm" | "base" | "lg" | "xl";
export type RadialPosition =
  | "center"
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left"
  | "top-left";
export type RadialSize = "small" | "medium" | "large" | "full";

function resolveRadialCenter(position: RadialPosition, size: number): { cx: number; cy: number } {
  const map: Record<RadialPosition, [number, number]> = {
    center: [0.5, 0.5],
    top: [0.5, 0],
    "top-right": [1, 0],
    right: [1, 0.5],
    "bottom-right": [1, 1],
    bottom: [0.5, 1],
    "bottom-left": [0, 1],
    left: [0, 0.5],
    "top-left": [0, 0],
  };
  const [fx, fy] = map[position] ?? [0.5, 0.5];
  return { cx: fx * size, cy: fy * size };
}

function resolveRadialRadius(radialSize: RadialSize, size: number): number {
  const map: Record<RadialSize, number> = {
    small: 0.3,
    medium: 0.5,
    large: 0.75,
    full: 1.0,
  };
  return (map[radialSize] ?? 0.5) * size;
}

export interface GradientOptions {
  colors: string[];
  gradientType: GradientType;
  angle: number; // degrees, used for linear
  shape: BackgroundShape;
  radialPosition?: RadialPosition;
  radialSize?: RadialSize;
}

export interface BackgroundOptions {
  type: "solid" | "gradient";
  solidColor?: string;
  gradientColors?: string[];
  gradientType?: GradientType;
  gradientAngle?: number;
}

export interface TextOptions {
  text: string;
  fontSize: number; // 0-100 slider value, mapped internally
  textColor: string;
  fontFamily?: string; // optional custom font family
  fontWeight?: string; // optional font weight (e.g., "bold", "600")
  background: BackgroundOptions;
  shape: BackgroundShape;
}

export interface EmojiOptions {
  emoji: string;
  background: BackgroundOptions;
  shape: BackgroundShape;
}

export interface ShapeOptions {
  shapeType: ShapeType;
  fillColor: string;
  shapeSize?: ShapeSize;
  background: BackgroundOptions;
  backgroundShape: BackgroundShape;
}

// --- Shape clipping helpers ---

/**
 * Clip the canvas to the given background shape, edge-to-edge.
 * The preview should match exactly how the favicon appears in the browser tab.
 */
function clipToShape(ctx: CanvasRenderingContext2D, size: number, shape: BackgroundShape): void {
  ctx.beginPath();
  switch (shape) {
    case "circle":
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      break;
    case "rounded-rect": {
      const r = size * 0.2;
      ctx.moveTo(r, 0);
      ctx.lineTo(size - r, 0);
      ctx.quadraticCurveTo(size, 0, size, r);
      ctx.lineTo(size, size - r);
      ctx.quadraticCurveTo(size, size, size - r, size);
      ctx.lineTo(r, size);
      ctx.quadraticCurveTo(0, size, 0, size - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      break;
    }
    case "square":
    default:
      ctx.rect(0, 0, size, size);
      break;
  }
  ctx.closePath();
  ctx.clip();
}

// --- Gradient rendering ---

export function gradientToImage(opts: GradientOptions): HTMLImageElement {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context for gradient");

  ctx.save();
  clipToShape(ctx, size, opts.shape);

  const colors = opts.colors.length >= 2 ? opts.colors : [opts.colors[0] ?? "#000000", "#ffffff"];

  let gradient: CanvasGradient;

  switch (opts.gradientType) {
    case "radial": {
      const { cx: rcx, cy: rcy } = resolveRadialCenter(opts.radialPosition ?? "center", size);
      const rr = resolveRadialRadius(opts.radialSize ?? "large", size);
      gradient = ctx.createRadialGradient(rcx, rcy, 0, rcx, rcy, rr);
      break;
    }
    case "diamond": {
      // Diamond = rotated 45° linear gradient
      const rad = (45 * Math.PI) / 180;
      const cx = size / 2;
      const cy = size / 2;
      const len = (size / 2) * (Math.abs(Math.cos(rad)) + Math.abs(Math.sin(rad)));
      gradient = ctx.createLinearGradient(
        cx - Math.cos(rad) * len,
        cy - Math.sin(rad) * len,
        cx + Math.cos(rad) * len,
        cy + Math.sin(rad) * len,
      );
      break;
    }
    case "linear":
    default: {
      const rad = ((opts.angle - 90) * Math.PI) / 180;
      const cx = size / 2;
      const cy = size / 2;
      const len = (size / 2) * (Math.abs(Math.cos(rad)) + Math.abs(Math.sin(rad)));
      gradient = ctx.createLinearGradient(
        cx - Math.cos(rad) * len,
        cy - Math.sin(rad) * len,
        cx + Math.cos(rad) * len,
        cy + Math.sin(rad) * len,
      );
      break;
    }
  }

  colors.forEach((color, i) => {
    gradient.addColorStop(i / (colors.length - 1), color);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  ctx.restore();

  const img = new Image();
  img.src = canvas.toDataURL("image/png");
  return img;
}

// --- Background rendering helper ---

function fillBackground(
  ctx: CanvasRenderingContext2D,
  size: number,
  background: BackgroundOptions,
): void {
  if (
    background.type === "gradient" &&
    background.gradientColors &&
    background.gradientColors.length >= 2
  ) {
    const colors = background.gradientColors;
    const gradientType = background.gradientType ?? "linear";
    const angle = background.gradientAngle ?? 135;

    let gradient: CanvasGradient;

    switch (gradientType) {
      case "radial": {
        gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        break;
      }
      case "diamond": {
        const rad = (45 * Math.PI) / 180;
        const cx = size / 2;
        const cy = size / 2;
        const len = (size / 2) * (Math.abs(Math.cos(rad)) + Math.abs(Math.sin(rad)));
        gradient = ctx.createLinearGradient(
          cx - Math.cos(rad) * len,
          cy - Math.sin(rad) * len,
          cx + Math.cos(rad) * len,
          cy + Math.sin(rad) * len,
        );
        break;
      }
      case "linear":
      default: {
        const rad = ((angle - 90) * Math.PI) / 180;
        const cx = size / 2;
        const cy = size / 2;
        const len = (size / 2) * (Math.abs(Math.cos(rad)) + Math.abs(Math.sin(rad)));
        gradient = ctx.createLinearGradient(
          cx - Math.cos(rad) * len,
          cy - Math.sin(rad) * len,
          cx + Math.cos(rad) * len,
          cy + Math.sin(rad) * len,
        );
        break;
      }
    }

    colors.forEach((color, i) => {
      gradient.addColorStop(i / (colors.length - 1), color);
    });

    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = background.solidColor ?? "#18181b";
  }
  ctx.fillRect(0, 0, size, size);
}

// --- Text rendering ---

export function textToImage(opts: TextOptions): HTMLImageElement {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context for text");

  ctx.save();
  clipToShape(ctx, size, opts.shape);

  // Background
  fillBackground(ctx, size, opts.background);

  // Text — map 0-100 slider to a reasonable font size range
  const minPx = size * 0.2;
  const maxPx = size * 0.7;
  const fontPx = minPx + ((maxPx - minPx) * opts.fontSize) / 100;

  const fontWeight = opts.fontWeight || "bold";
  const fontFamily = opts.fontFamily || '"Inter", "Geist Mono", ui-monospace, monospace';

  ctx.fillStyle = opts.textColor;
  ctx.font = `${fontWeight} ${fontPx}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(opts.text, size / 2, size / 2 + fontPx * 0.04);

  ctx.restore();

  const img = new Image();
  img.src = canvas.toDataURL("image/png");
  return img;
}

// --- Emoji with background rendering ---

export function emojiWithBackgroundToImage(opts: EmojiOptions): HTMLImageElement {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context for emoji");

  ctx.save();
  clipToShape(ctx, size, opts.shape);

  // Background
  fillBackground(ctx, size, opts.background);

  // Emoji
  ctx.font = `${size * 0.55}px 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(opts.emoji, size / 2, size / 2 + size * 0.03);

  ctx.restore();

  const img = new Image();
  img.src = canvas.toDataURL("image/png");
  return img;
}

// --- Shape rendering ---

const SHAPE_SIZE_INSET: Record<ShapeSize, number> = {
  xs: 0.35,
  sm: 0.28,
  base: 0.2,
  lg: 0.12,
  xl: 0.05,
};

function drawShape(
  ctx: CanvasRenderingContext2D,
  size: number,
  shapeType: ShapeType,
  fillColor: string,
  shapeSize: ShapeSize = "base",
): void {
  const insetFactor = SHAPE_SIZE_INSET[shapeSize] ?? 0.2;
  const inset = size * insetFactor;
  const x = inset;
  const y = inset;
  const w = size - inset * 2;
  const h = size - inset * 2;
  const cx = size / 2;
  const cy = size / 2;

  ctx.fillStyle = fillColor;
  ctx.beginPath();

  switch (shapeType) {
    case "square":
      ctx.rect(x, y, w, h);
      break;

    case "circle":
      ctx.arc(cx, cy, w / 2, 0, Math.PI * 2);
      break;

    case "triangle": {
      const triH = w * 0.866; // height of equilateral triangle
      const triY = cy - triH / 2;
      ctx.moveTo(cx, triY);
      ctx.lineTo(cx + w / 2, triY + triH);
      ctx.lineTo(cx - w / 2, triY + triH);
      ctx.closePath();
      break;
    }

    case "diamond": {
      ctx.moveTo(cx, y);
      ctx.lineTo(x + w, cy);
      ctx.lineTo(cx, y + h);
      ctx.lineTo(x, cy);
      ctx.closePath();
      break;
    }

    case "hexagon": {
      const r = w / 2;
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      break;
    }

    case "star": {
      const outerR = w / 2;
      const innerR = outerR * 0.4;
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI / 5) * i - Math.PI / 2;
        const r = i % 2 === 0 ? outerR : innerR;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      break;
    }

    case "heart": {
      const heartW = w * 0.9;
      const heartH = h * 0.85;
      const topY = y + h * 0.1;

      ctx.moveTo(cx, topY + heartH);
      ctx.bezierCurveTo(
        cx - heartW / 2,
        topY + heartH * 0.7,
        cx - heartW / 2,
        topY,
        cx,
        topY + heartH * 0.35,
      );
      ctx.bezierCurveTo(
        cx + heartW / 2,
        topY,
        cx + heartW / 2,
        topY + heartH * 0.7,
        cx,
        topY + heartH,
      );
      break;
    }
  }

  ctx.fill();
}

export function shapeToImage(opts: ShapeOptions): HTMLImageElement {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context for shape");

  ctx.save();
  clipToShape(ctx, size, opts.backgroundShape);

  // Background
  fillBackground(ctx, size, opts.background);

  // Shape
  drawShape(ctx, size, opts.shapeType, opts.fillColor, opts.shapeSize);

  ctx.restore();

  const img = new Image();
  img.src = canvas.toDataURL("image/png");
  return img;
}

// --- Image Processing ---

// Ensure image is fully loaded before processing
function ensureImageLoaded(img: HTMLImageElement): Promise<HTMLImageElement> {
  if (img.complete && img.naturalWidth > 0) return Promise.resolve(img);
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Image failed to load"));
  });
}

/**
 * Create a small (32x32) data-URL suitable for the browser-tab favicon.
 * Large source images (1-2 MB+) produce data-URLs that are too big for
 * browsers to render as a `<link rel="icon">` href, so we always downscale.
 */
export async function createFaviconUrl(sourceImg: HTMLImageElement): Promise<string> {
  const img = await ensureImageLoaded(sourceImg);
  const size = 32;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context for favicon url");

  const aspect = img.naturalWidth / img.naturalHeight;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  let sx = 0;
  let sy = 0;

  if (aspect > 1) {
    sw = img.naturalHeight;
    sx = (img.naturalWidth - sw) / 2;
  } else if (aspect < 1) {
    sh = img.naturalWidth;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);

  return canvas.toDataURL("image/png");
}

/**
 * Resize an image to a square using **cover** fill:
 * the image is scaled so the shorter side fills the canvas,
 * and any overflow on the longer side is cropped equally from both edges.
 */
export async function resizeImage(sourceImg: HTMLImageElement, size: number): Promise<Blob> {
  const img = await ensureImageLoaded(sourceImg);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context for resize");

  // Cover fill: scale to fill the entire canvas, crop overflow
  const aspect = img.naturalWidth / img.naturalHeight;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  let sx = 0;
  let sy = 0;

  if (aspect > 1) {
    // wider than tall — crop sides
    sw = img.naturalHeight;
    sx = (img.naturalWidth - sw) / 2;
  } else if (aspect < 1) {
    // taller than wide — crop top/bottom
    sh = img.naturalWidth;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to create blob"));
    }, "image/png");
  });
}

// --- ICO Encoding (PNG-in-ICO) ---
// ICO format spec: https://en.wikipedia.org/wiki/ICO_(file_format)
// Using PNG entries for maximum compatibility with modern browsers.

export async function generateIco(img: HTMLImageElement): Promise<Blob> {
  const loadedImg = await ensureImageLoaded(img);
  const sizes = [16, 32, 48];

  // Generate PNG blobs for each size
  const pngBlobs = await Promise.all(sizes.map((s) => resizeImage(loadedImg, s)));
  const pngArrayBuffers = await Promise.all(pngBlobs.map((b) => b.arrayBuffer()));

  const numImages = sizes.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * numImages;
  const totalDataSize = pngArrayBuffers.reduce((sum, buf) => sum + buf.byteLength, 0);

  const buffer = new ArrayBuffer(headerSize + dirSize + totalDataSize);
  const view = new DataView(buffer);
  const out = new Uint8Array(buffer);

  // ICO Header
  view.setUint16(0, 0, true); // Reserved
  view.setUint16(2, 1, true); // Type: ICO
  view.setUint16(4, numImages, true);

  let dataOffset = headerSize + dirSize;

  for (let i = 0; i < numImages; i++) {
    const size = sizes[i];
    const pngData = new Uint8Array(pngArrayBuffers[i]);
    const entryOff = headerSize + i * dirEntrySize;

    // Directory entry
    view.setUint8(entryOff, size < 256 ? size : 0); // width
    view.setUint8(entryOff + 1, size < 256 ? size : 0); // height
    view.setUint8(entryOff + 2, 0); // palette
    view.setUint8(entryOff + 3, 0); // reserved
    view.setUint16(entryOff + 4, 1, true); // color planes
    view.setUint16(entryOff + 6, 32, true); // bpp
    view.setUint32(entryOff + 8, pngData.byteLength, true); // data size
    view.setUint32(entryOff + 12, dataOffset, true); // data offset

    // PNG data
    out.set(pngData, dataOffset);
    dataOffset += pngData.byteLength;
  }

  return new Blob([buffer], { type: "image/x-icon" });
}

// --- Zipping & Payload Generation ---

export async function generateAssetsZip(
  sourceImage: HTMLImageElement,
  sizes: RequiredSizes,
): Promise<{ zipBlob: Blob; htmlCode: string }> {
  // Ensure the source image is fully loaded before processing
  const img = await ensureImageLoaded(sourceImage);
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  const htmlLines: string[] = [];

  // Always generate a multi-size .ico (16, 32, 48)
  if (sizes.faviconIco) {
    const icoBlob = await generateIco(img);
    zip.file("favicon.ico", icoBlob);
    htmlLines.push(`<link rel="icon" href="/favicon.ico" sizes="48x48" />`);
  }

  if (sizes.png16) {
    const blob = await resizeImage(img, 16);
    zip.file("favicon-16x16.png", blob);
    htmlLines.push(`<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />`);
  }

  if (sizes.png32) {
    const blob = await resizeImage(img, 32);
    zip.file("favicon-32x32.png", blob);
    htmlLines.push(`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />`);
  }

  if (sizes.png48) {
    const blob = await resizeImage(img, 48);
    zip.file("favicon-48x48.png", blob);
    // 48x48 is what Google recommends for search results
  }

  if (sizes.appleTouch) {
    const blob = await resizeImage(img, 180);
    zip.file("apple-touch-icon.png", blob);
    htmlLines.push(`<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`);
  }

  if (sizes.androidIcon) {
    const blob192 = await resizeImage(img, 192);
    zip.file("android-chrome-192x192.png", blob192);

    const blob512 = await resizeImage(img, 512);
    zip.file("android-chrome-512x512.png", blob512);

    const manifest = {
      name: "",
      short_name: "",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
    };
    zip.file("site.webmanifest", JSON.stringify(manifest, null, 2));
    htmlLines.push(`<link rel="manifest" href="/site.webmanifest" />`);
  }

  const htmlCode = htmlLines.join("\n");
  const zipBlob = await zip.generateAsync({ type: "blob" });
  return { zipBlob, htmlCode };
}
