// Verificações do perfil. Uso: npm run check  (sai com código 1 se algo falhar)
//  1. Contraste WCAG AA de todos os pares de texto da paleta, nos dois temas.
//  2. README: toda imagem tem alt, todo caminho local existe, todo <picture> tem as variantes clara e escura,
//     nenhuma imagem vem de serviço externo.
//  3. SVGs: título acessível, sem script, sem recurso externo, sem valores inválidos, tamanho razoável.
//  4. Privacidade: nenhum IP privado, CNPJ, CPF, e-mail ou termo sensível nos arquivos versionados.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { THEMES, ICON_TINT, contrast } from './lib/tokens.mjs';

const ROOT = new URL('../', import.meta.url);
const falhas = [];
const ok = msg => console.log(`  ok  ${msg}`);
const falha = msg => { falhas.push(msg); console.log(`  ERRO ${msg}`); };

console.log('1. Contraste');
for (const [tema, t] of Object.entries(THEMES)) {
  for (const fg of ['ink', 'muted', 'accent', 'warm']) for (const bg of ['panel', 'canvas']) {
    const r = contrast(t[fg], t[bg]);
    if (r < 4.5) falha(`${tema}: ${fg} sobre ${bg} = ${r.toFixed(2)} (< 4,5)`);
  }
}
for (const bg of ['#ffffff', '#0d1117']) { const r = contrast(ICON_TINT, bg); if (r < 3) falha(`ícones sobre ${bg} = ${r.toFixed(2)} (< 3)`); }
if (!falhas.length) ok('todos os textos ≥ 4,5:1 e ícones ≥ 3:1 nos dois temas');

console.log('2. README');
const readme = readFileSync(new URL('README.md', ROOT), 'utf8');
const html = readme.replace(/<!--[\s\S]*?-->/g, '');
if (/<!--(?:(?!-->)[\s\S])*<!--/.test(readme)) falha('comentário HTML aninhado no README (o GitHub fecha no primeiro "-->")');
const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
for (const tag of imgs) {
  const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
  const alt = tag.match(/\balt="([^"]*)"/);
  if (!src) { falha(`imagem sem src: ${tag.slice(0, 60)}`); continue; }
  if (/^https?:/.test(src)) falha(`imagem externa (proibido): ${src}`);
  if (!alt) falha(`imagem sem alt: ${src}`);
  else if (!alt[1] && !src.startsWith('assets/icons/')) falha(`alt vazio fora dos ícones: ${src}`);
}
for (const s of [...html.matchAll(/\b(?:src|srcset)="([^"]+)"/g)].map(m => m[1]).filter(s => !/^https?:/.test(s))) {
  if (!existsSync(new URL(s, ROOT))) falha(`arquivo não existe: ${s}`);
}
for (const pic of html.match(/<picture>[\s\S]*?<\/picture>/g) || []) {
  if (!/prefers-color-scheme: dark\)" srcset="[^"]+-dark\.svg"/.test(pic) || !/<img [^>]*src="[^"]+-light\.svg"/.test(pic)) falha(`<picture> sem par claro/escuro: ${pic.slice(0, 90)}`);
}
if (/github-readme-stats|vercel\.app|shields\.io|skillicons/.test(readme)) falha('README depende de serviço externo de imagens');
const links = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
console.log(`  ..  ${imgs.length} imagens; links externos para conferir: ${[...new Set(links)].join(', ') || 'nenhum'}`);
if (!falhas.length) ok('alt, caminhos e pares claro/escuro');

console.log('3. SVGs');
const svgs = [];
const walk = dir => { for (const f of readdirSync(new URL(dir, ROOT))) { const p = `${dir}${f}`; if (statSync(new URL(p, ROOT)).isDirectory()) walk(`${p}/`); else if (f.endsWith('.svg')) svgs.push(p); } };
walk('assets/');
const antes = falhas.length;
for (const p of svgs) {
  const s = readFileSync(new URL(p, ROOT), 'utf8');
  if (!p.includes('/icons/') && !/<title>[^<]+<\/title>/.test(s)) falha(`${p}: sem <title>`);
  if (/<script|<foreignObject|\bon\w+=/i.test(s)) falha(`${p}: conteúdo ativo`);
  if (/(?:href|src)="https?:|@import|url\(\s*['"]?https?:/i.test(s)) falha(`${p}: recurso externo`);
  if (/NaN|undefined|Infinity/.test(s)) falha(`${p}: valor inválido`);
  if (s.length > 100_000) falha(`${p}: ${Math.round(s.length / 1024)} KB (> 100 KB)`);
  if (/<animate|<set\b/.test(s)) falha(`${p}: animação SMIL (não respeita "reduzir movimento")`);
  if (/class="pulse"/.test(s) && !/prefers-reduced-motion/.test(s)) falha(`${p}: animação sem prefers-reduced-motion`);
}
if (falhas.length === antes) ok(`${svgs.length} SVGs`);

console.log('4. Privacidade');
// Termos sensíveis guardados só como hash SHA-256: o próprio verificador não pode expor o que protege.
const PROIBIDOS = new Set([
  'ec7b4329bb0515729ece52ee7ab90f0508de47a9297e021e036ce8790bcf5ef8',
  '26207e2c4648604b8e09eecb27f816e60bb5ead1a40be9c1fa3b5305f1ccdcd3',
  '9f4bd264020e18c36cd234a2336c391df62dca71957a367c86e56e1a74972be4',
  '570c7003e2c9a023ca9ac98e648f4ffcaab4b204cbf1581dc3fb7a49706ede48',
  'ba05c6b92f0ba3da481146fd2b3967e07545c4006ea27ac3f26677734210c865',
  '78fbd9ef963cd1c189bf0d0b75bd173311370a1cafdfcf04946e1028caeef425',
  'b9f31cb8b92685ce51a5d03d0dd1072a0e28d938808c6407abeee5b65b5cf6bf',
  '372fb41298889bc4df223a601cf4475407cdeae0938692ae018737ec1335190b',
  '0383bee9326bbdb83410b6e974ba2d188041e04ecd3612dd7128314df24fe9ba',
]);
const sha = w => createHash('sha256').update(w).digest('hex');
const arquivos = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n').filter(f => f && /\.(md|mjs|js|json|yml|yaml|svg|txt|html)$/.test(f) && !f.endsWith('package-lock.json') && !f.startsWith('scripts/data/'));
const PADROES = [
  [/\b(?:10\.\d{1,3}|192\.168|172\.(?:1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}\b/, 'IP de rede interna'],
  [/\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/, 'CNPJ'],
  [/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/, 'CPF'],
  [/[\w.+-]+@(?!users\.noreply\.github\.com)[\w-]+\.[\w.]+/, 'e-mail'],
  [/(?:ghp|gho|ghs|github_pat|sk-ant|AKIA)[\w-]{10,}/, 'possível token/segredo'],
];
const antesP = falhas.length;
for (const f of arquivos) {
  const s = readFileSync(new URL(f, ROOT), 'utf8');
  for (const [re, nome] of PADROES) { const m = s.match(re); if (m) falha(`${f}: ${nome} (${m[0].slice(0, 12)}…)`); }
  for (const w of new Set(s.toLowerCase().match(/[a-zà-ú0-9-]{4,}/g) || [])) if (PROIBIDOS.has(sha(w))) falha(`${f}: termo sensível (hash ${sha(w).slice(0, 8)})`);
}
if (falhas.length === antesP) ok(`${arquivos.length} arquivos sem dado sensível`);

console.log(falhas.length ? `\n${falhas.length} problema(s).` : '\nTudo certo.');
process.exit(falhas.length ? 1 : 0);
