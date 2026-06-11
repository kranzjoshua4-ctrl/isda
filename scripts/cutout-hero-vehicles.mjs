/**
 * Entfernt schwarze Studio-Hintergründe bei Hero-Fahrzeug-PNGs (transparent + trim).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HERO_DIR = path.join(ROOT, "public", "Herobilder");
const SOURCE_DIR = path.join(HERO_DIR, "_source");

function backgroundAlpha(r, g, b, a) {
  if (a < 8) return 0;

  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max === 0 ? 0 : (max - min) / max;

  // Harte Studio-Schwarz-Backdrops (und Kompressionsrauschen) zuverlässig entfernen.
  // Regel: sehr dunkle Pixel -> transparent, dunkle Pixel -> weiche Kante.
  if (max < 18) return 0;
  if (max < 42) {
    return Math.min(255, Math.round(((max - 18) / 24) * 255));
  }

  // Fallback: luminanz/sättigungsbasiert (für sehr dunkle, wenig gesättigte Hintergründe).
  if (lum < 22 && saturation < 0.16) return 0;
  if (lum < 60 && saturation < 0.12) {
    return Math.min(255, Math.round(((lum - 22) / 38) * 255));
  }

  return 255;
}

async function cutout(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  for (let i = 0; i < width * height; i++) {
    const o = i * channels;
    const nextAlpha = backgroundAlpha(data[o], data[o + 1], data[o + 2], data[o + 3]);
    data[o + 3] = Math.min(data[o + 3], nextAlpha);
  }

  await sharp(data, { raw: { width, height, channels } })
    .trim()
    .png({ compressionLevel: 6, effort: 8 })
    .toFile(outputPath);
}

async function processFile(name) {
  const input = path.join(HERO_DIR, name);
  if (!fs.existsSync(input)) {
    console.warn(`Übersprungen (fehlt): ${name}`);
    return;
  }

  if (!fs.existsSync(SOURCE_DIR)) {
    fs.mkdirSync(SOURCE_DIR, { recursive: true });
  }

  const sourceCopy = path.join(SOURCE_DIR, name);
  if (!fs.existsSync(sourceCopy)) {
    fs.copyFileSync(input, sourceCopy);
    console.log(`Backup: ${path.relative(ROOT, sourceCopy)}`);
  }

  const temp = path.join(HERO_DIR, `.${name}.tmp.png`);
  await cutout(sourceCopy, temp);
  fs.renameSync(temp, input);
  console.log(`Freigestellt: ${path.relative(ROOT, input)}`);
}

const files = process.argv.slice(2);
const targets = files.length > 0 ? files : ["hero_dacia.png"];

for (const file of targets) {
  await processFile(file);
}
