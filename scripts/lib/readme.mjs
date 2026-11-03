// Edição de blocos marcados no README e HTML de imagem com tema claro/escuro.
import { readFileSync, writeFileSync } from 'node:fs';
import { esc } from './svg.mjs';

export const README = new URL('../../README.md', import.meta.url);

// <picture> com variante escura e clara (padrão documentado pelo GitHub).
// `base` é o caminho sem o sufixo: assets/header → assets/header-dark.svg / assets/header-light.svg
export function picture(base, alt, attrs = '') {
  return `<picture><source media="(prefers-color-scheme: dark)" srcset="${base}-dark.svg">`
    + `<img src="${base}-light.svg" alt="${esc(alt)}"${attrs ? ' ' + attrs : ''}></picture>`;
}

// Substitui o conteúdo entre <!-- nome:inicio --> e <!-- nome:fim -->. Devolve true se mudou.
export function replaceBlock(name, content) {
  const src = readFileSync(README, 'utf8');
  const re = new RegExp(`(<!-- ${name}:inicio -->)[\\s\\S]*?(<!-- ${name}:fim -->)`);
  if (!re.test(src)) throw new Error(`Marcadores do bloco "${name}" não encontrados no README.md`);
  const next = src.replace(re, (_, a, b) => `${a}\n${content}\n${b}`);
  if (next !== src) writeFileSync(README, next);
  return next !== src;
}
