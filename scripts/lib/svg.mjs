// Utilitários para montar SVGs que funcionam dentro de <img> no GitHub:
// sem fontes externas, sem script, animação só por CSS interno e desligada com prefers-reduced-motion.
import { readFileSync } from 'node:fs';
import { FONT } from './tokens.mjs';
import { glyph as glyphData } from './glyphs.mjs';

const ICONS = JSON.parse(readFileSync(new URL('../data/icons.json', import.meta.url), 'utf8'));

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Animação compartilhada: um pulso que percorre um caminho (pathLength="100") e para com "reduzir movimento".
const MOTION = '.pulse{animation:pulse 6s linear infinite}@keyframes pulse{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}'
  + '@media (prefers-reduced-motion:reduce){.pulse{animation:none;opacity:0}}';

export function svgDoc(w, h, label, body, { motion = false } = {}) {
  const style = motion ? `<style>${MOTION}</style>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title>${style}${body}</svg>\n`;
}

export function text(x, y, value, o = {}) {
  const { size = 14, fill, mono = false, weight = 400, anchor = 'start', ls = 0, opacity } = o;
  return `<text x="${x}" y="${y}" font-family="${mono ? FONT.mono : FONT.sans}" font-size="${size}"`
    + `${weight !== 400 ? ` font-weight="${weight}"` : ''} fill="${fill}"${anchor !== 'start' ? ` text-anchor="${anchor}"` : ''}`
    + `${ls ? ` letter-spacing="${ls}"` : ''}${opacity != null ? ` opacity="${opacity}"` : ''}>${esc(value)}</text>`;
}

export const line = (x1, y1, x2, y2, stroke, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}"${extra}/>`;

// Largura aproximada de texto monoespaçado (0,6 em por caractere + espaçamento).
export const monoWidth = (chars, size, ls = 0) => chars * (size * 0.6 + ls);

// Título em contorno (Geologica 600). `size` em px; y é a linha de base.
export function title(value, x, y, size, fill) {
  const g = glyphData(value);
  return `<path d="${g.d}" transform="translate(${x} ${y}) scale(${size / 100})" fill="${fill}"/>`;
}
export const titleWidth = (value, size) => glyphData(value).w * size / 100;

// Glifos neutros (traço) para o que não tem ícone livre: PowerShell, Playwright, LXC, redes, segurança.
const GENERIC = {
  terminal: '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M7 9l3 3-3 3M12 15h5"/>',
  browser: '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 9h20M6 6.5h.01M9 6.5h.01"/>',
  box: '<path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M3 7l9 5 9-5M12 12v10"/>',
  dns: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  agents: '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><path d="M8.5 7.5l2 8M15.5 7.5l-2 8M9 6h6"/>',
};
export const ICON_NAMES = [...Object.keys(ICONS), ...Object.keys(GENERIC)];

export function icon(name, x, y, size, fill) {
  if (GENERIC[name]) {
    return `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${fill}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${GENERIC[name]}</g>`;
  }
  if (!ICONS[name]) throw new Error(`Ícone desconhecido: ${name}`);
  return `<path d="${ICONS[name]}" transform="translate(${x} ${y}) scale(${size / 24})" fill="${fill}"/>`;
}
