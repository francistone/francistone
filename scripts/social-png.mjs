// Converte assets/social/*.svg em PNG 1280×640, o formato que o GitHub aceita como social preview.
// Uso: npm run social   (requer Playwright com Chromium)
import { readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const DIR = new URL('../assets/social/', import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { console.error('Instale o Playwright com Chromium para gerar os PNGs.'); process.exit(1); }

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 640 }, deviceScaleFactor: 1 });
for (const f of readdirSync(DIR).filter(f => f.endsWith('.svg'))) {
  await page.setContent(`<style>html,body{margin:0}</style>${readFileSync(new URL(f, DIR), 'utf8')}`);
  await page.screenshot({ path: new URL(f.replace(/\.svg$/, '.png'), DIR).pathname, clip: { x: 0, y: 0, width: 1280, height: 640 } });
  console.log(`assets/social/${f.replace(/\.svg$/, '.png')}`);
}
await browser.close();
