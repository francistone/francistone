// Títulos em contorno: SVG carregado por <img> não baixa fontes, então os textos de destaque
// viram <path>. O resultado fica em cache em scripts/data/glyphs.json (versionado), e o build
// funciona sem dependências. Só um título NOVO precisa de `npm install` (opentype.js + Geologica).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const CACHE = new URL('../data/glyphs.json', import.meta.url);
const FONT_FILE = '@fontsource/geologica/files/geologica-latin-600-normal.woff';
let cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {};
let font = null;

function loadFont() {
  if (font) return font;
  const require = createRequire(import.meta.url);
  let opentype;
  try { opentype = require('opentype.js'); } catch {
    throw new Error('Título novo sem contorno em cache. Rode `npm install` e depois `npm run build`.');
  }
  font = opentype.parse(readFileSync(require.resolve(FONT_FILE)).buffer.slice(0));
  return font;
}

function build(textValue) {
  const f = loadFont();
  const scale = 100 / f.unitsPerEm;
  const r = v => +v.toFixed(1);
  let x = 0, d = '', prev = null;
  for (const ch of textValue) {
    const g = f.charToGlyph(ch);
    const kern = prev ? f.getKerningValue(prev, g) : 0;
    if (Number.isFinite(kern)) x += kern * scale; // alguns pares voltam NaN na biblioteca
    // Os comandos são formatados à mão: o toPathData() da biblioteca às vezes emite "NaN".
    for (const c of g.getPath(x, 0, 100).commands) {
      if (c.type === 'M' || c.type === 'L') d += `${c.type}${r(c.x)} ${r(c.y)}`;
      else if (c.type === 'Q') d += `Q${r(c.x1)} ${r(c.y1)} ${r(c.x)} ${r(c.y)}`;
      else if (c.type === 'C') d += `C${r(c.x1)} ${r(c.y1)} ${r(c.x2)} ${r(c.y2)} ${r(c.x)} ${r(c.y)}`;
      else if (c.type === 'Z') d += 'Z';
    }
    x += g.advanceWidth * scale;
    prev = g;
  }
  if (/NaN|undefined/.test(d)) throw new Error(`Contorno inválido para "${textValue}"`);
  return { d, w: r(x) };
}

// Devolve { d, w } com tamanho de referência 100 px e linha de base em y = 0.
export function glyph(textValue) {
  if (!cache[textValue]) {
    cache[textValue] = build(textValue);
    writeFileSync(CACHE, JSON.stringify(cache, null, 0) + '\n');
  }
  return cache[textValue];
}
