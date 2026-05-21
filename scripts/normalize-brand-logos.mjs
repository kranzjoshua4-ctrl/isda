/**
 * Erzeugt scharfe Web-Logos aus den hochauflösenden Quellen in public/logos.
 * Originale werden einmalig nach public/logos/_source/ gesichert.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOGO_DIR = path.join(ROOT, "public", "logos");
const SOURCE_DIR = path.join(LOGO_DIR, "_source");
const CANVAS_W = 400;
const CANVAS_H = 240;
const LOGO_FILL = 0.82;
const MIN_SOURCE_WIDTH = 400;

function isBackgroundPixel(r, g, b, a) {
  if (a < 10) return true;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max === 0 ? 0 : (max - min) / max;
  if (max < 20 && saturation < 0.18) return true;
  return false;
}

async function removeBackground(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  for (let i = 0; i < width * height; i++) {
    const o = i * channels;
    if (isBackgroundPixel(data[o], data[o + 1], data[o + 2], data[o + 3])) {
      data[o + 3] = 0;
    }
  }

  return sharp(data, { raw: { width, height, channels } }).trim().png().toBuffer();
}

async function normalizeLogo(sourcePath, outputPath) {
  const trimmed = await removeBackground(sourcePath);
  const meta = await sharp(trimmed).metadata();
  const maxW = Math.round(CANVAS_W * LOGO_FILL);
  const maxH = Math.round(CANVAS_H * LOGO_FILL);
  const scale = Math.min(maxW / meta.width, maxH / meta.height);
  const w = Math.max(1, Math.round(meta.width * scale));
  const h = Math.max(1, Math.round(meta.height * scale));

  const resized = await sharp(trimmed)
    .resize(w, h, { fit: "inside", kernel: "lanczos3" })
    .png()
    .toBuffer();

  const padLeft = Math.floor((CANVAS_W - w) / 2);
  const padRight = CANVAS_W - w - padLeft;
  const padTop = Math.floor((CANVAS_H - h) / 2);
  const padBottom = CANVAS_H - h - padTop;

  await sharp(resized)
    .extend({
      top: padTop,
      bottom: padBottom,
      left: padLeft,
      right: padRight,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 6 })
    .toFile(outputPath);
}

if (!fs.existsSync(SOURCE_DIR)) {
  fs.mkdirSync(SOURCE_DIR, { recursive: true });
}

const files = fs
  .readdirSync(LOGO_DIR)
  .filter((f) => f.startsWith("logo_") && f.endsWith(".png"));

for (const file of files) {
  const filePath = path.join(LOGO_DIR, file);
  const meta = await sharp(filePath).metadata();

  if (meta.width < MIN_SOURCE_WIDTH) {
    console.log("SKIP (already web-sized)", file, `${meta.width}x${meta.height}`);
    continue;
  }

  const backupPath = path.join(SOURCE_DIR, file);
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log("BACKUP", file);
  }

  await normalizeLogo(backupPath, filePath);
  const outMeta = await sharp(filePath).metadata();
  const kb = Math.round(fs.statSync(filePath).size / 1024);
  console.log("OK", file, `→ ${outMeta.width}x${outMeta.height}`, `${kb}KB`);
}

console.log(`Done. Sources in logos/_source/, display assets ${CANVAS_W}×${CANVAS_H}px`);
