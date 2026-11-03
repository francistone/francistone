// Pré-visualização local do README com o CSS oficial de Markdown do GitHub (github-markdown-css),
// nas larguras reais do perfil, em claro e escuro, e capturas de tela em docs/capturas/.
// Uso: npm run preview [-- --antes <arquivo.md>]   (requer `npm install` e Playwright com Chromium)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import MarkdownIt from 'markdown-it';

const require = createRequire(import.meta.url);
const ROOT = new URL('../', import.meta.url);
const OUT = new URL('docs/preview/', ROOT);
const SHOTS = new URL('docs/capturas/', ROOT);
mkdirSync(OUT, { recursive: true }); mkdirSync(SHOTS, { recursive: true });

const css = readFileSync(require.resolve('github-markdown-css/github-markdown.css'), 'utf8');
const md = new MarkdownIt({ html: true, linkify: false });

// Moldura que imita a coluna do README no perfil: 846 px de conteúdo no desktop (1280),
// 16 px de margem + 16 px de caixa no celular (390).
function page(markdown) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<base href="../../"><title>Prévia do README</title><style>${css}
body{margin:0;background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans',Helvetica,Arial,sans-serif}
@media (prefers-color-scheme:dark){body{background:#0d1117}}
.box{max-width:846px;margin:24px auto;padding:24px;border:1px solid #d1d9e0;border-radius:6px}
@media (prefers-color-scheme:dark){.box{border-color:#3d444d}}
@media (max-width:600px){.box{margin:16px;padding:16px}}
</style></head><body><article class="box markdown-body">${md.render(markdown)}</article></body></html>`;
}

const args = process.argv.slice(2);
const antes = args.includes('--antes') ? args[args.indexOf('--antes') + 1] : null;
writeFileSync(new URL('depois.html', OUT), page(readFileSync(new URL('README.md', ROOT), 'utf8')));
if (antes) writeFileSync(new URL('antes.html', OUT), page(readFileSync(antes, 'utf8')));

let chromium;
try { ({ chromium } = require('playwright')); } catch {
  console.log('Prévia gerada em docs/preview/. Para as capturas, instale o Playwright com Chromium.');
  process.exit(0);
}
const browser = await chromium.launch();
const shots = [
  ['depois', 'desktop', 'dark', 1280], ['depois', 'desktop', 'light', 1280], ['depois', 'celular', 'dark', 390], ['depois', 'celular', 'light', 390],
  ...(antes ? [['antes', 'desktop', 'dark', 1280], ['antes', 'celular', 'dark', 390]] : []),
];
for (const [which, vp, scheme, w] of shots) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto(new URL(`${which}.html`, OUT).href);
  await p.waitForLoadState('networkidle').catch(() => {});
  await p.evaluate(() => document.querySelectorAll('details').forEach(d => { d.open = true; }));
  await p.waitForTimeout(300);
  await p.screenshot({ path: new URL(`${which}-${vp}-${scheme === 'dark' ? 'escuro' : 'claro'}.jpg`, SHOTS).pathname, fullPage: true, type: 'jpeg', quality: 82 });
  await ctx.close();
}
await browser.close();
console.log(`${shots.length} capturas em docs/capturas/`);
