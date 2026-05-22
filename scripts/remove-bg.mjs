import sharp from 'sharp';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const input  = resolve(__dirname, '../public/website/img/mrlogo.jpg');
const output = resolve(__dirname, '../public/website/img/mrlogo.png');

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixels = new Uint8Array(data);

// Umbral suave para fondo blanco/casi blanco
const THRESHOLD = 235;

for (let i = 0; i < pixels.length; i += channels) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];
  if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
    pixels[i + 3] = 0; // transparente
  }
}

await sharp(Buffer.from(pixels), { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log('✅ mrlogo.png generado en public/website/img/');
