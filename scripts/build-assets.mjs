// Gera todos os SVGs estáticos do perfil (claro e escuro) e os blocos automáticos do README.
// Uso: npm run build
import { mkdirSync, writeFileSync } from 'node:fs';
import { THEMES, ICON_TINT } from './lib/tokens.mjs';
import { svgDoc, text, line, title, monoWidth, icon, esc } from './lib/svg.mjs';
import { picture, replaceBlock } from './lib/readme.mjs';
import { PROJETOS, STACK, SOCIAL } from './data/conteudo.mjs';

const OUT = new URL('../assets/', import.meta.url);
const write = (name, svg) => { writeFileSync(new URL(name, OUT), svg); written.push(name); };
const written = [];
for (const dir of ['', 'icons', 'social']) mkdirSync(new URL(dir, OUT), { recursive: true });

/* Topologia "do pacote ao produto", em coordenadas locais (330 × 175).
   Pacote → rede → servidor e containers → agentes → produto, com um pulso de sinal percorrendo o caminho. */
function topology(t, { animate = true } = {}) {
  const links = [[20, 38, 100, 90], [30, 140, 100, 90], [100, 90, 168, 34], [100, 90, 172, 146], [168, 34, 240, 90], [172, 146, 240, 90], [240, 90, 272, 90]];
  let b = `<g stroke="${t.line}" stroke-width="1.5" fill="none">${links.map(([a, c, d, e]) => `<line x1="${a}" y1="${c}" x2="${d}" y2="${e}"/>`).join('')}`
    + '<line x1="168" y1="34" x2="172" y2="146" stroke-dasharray="3 5"/></g>';
  if (animate) b += `<path class="pulse" d="M20 38 L100 90 L168 34 L240 90 L272 90" pathLength="100" fill="none" stroke="${t.accent}" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 94"/>`;
  b += `<g fill="${t.panel}" stroke="${t.muted}" stroke-width="1.5"><circle cx="20" cy="38" r="4"/><circle cx="30" cy="140" r="4"/><circle cx="168" cy="34" r="5"/><circle cx="172" cy="146" r="5"/></g>`;
  b += `<circle cx="100" cy="90" r="7" fill="${t.panel}" stroke="${t.accent}" stroke-width="2"/>`;
  b += `<rect x="233" y="83" width="14" height="14" transform="rotate(45 240 90)" fill="${t.panel}" stroke="${t.warm}" stroke-width="2"/>`;
  b += `<rect x="272" y="52" width="50" height="76" rx="6" fill="${t.panel}" stroke="${t.ink}" stroke-opacity=".55" stroke-width="1.5"/>`;
  b += line(272, 64, 322, 64, t.ink, ' stroke-opacity=".35"');
  b += `<g stroke-width="3" stroke-linecap="round">${line(282, 78, 306, 78, t.accent)}${line(282, 92, 312, 92, t.muted)}${line(282, 106, 298, 106, t.muted)}${line(290, 118, 310, 118, t.muted)}</g>`;
  const lab = (x, y, s, c = t.muted) => text(x, y, s, { size: 10, fill: c, mono: true, anchor: 'middle', ls: 0.6 });
  return b + lab(100, 118, 'rede') + lab(168, 18, 'servidor') + lab(172, 170, 'containers') + lab(240, 120, 'agentes', t.warm) + lab(297, 148, 'produto');
}

/* ── Cabeçalho (846 × 250, ocupa a largura do README) ── */
function header(t) {
  const W = 846, H = 250;
  let b = `<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="14" fill="${t.panel}" stroke="${t.line}"/>`;
  let dots = '';
  for (let x = 504; x <= 822; x += 18) for (let y = 26; y <= 226; y += 18) dots += `<circle cx="${x}" cy="${y}" r="1"/>`;
  b += `<g fill="${t.line}">${dots}</g>`;
  b += text(38, 62, '@francistone', { size: 13, fill: t.accent, mono: true, ls: 0.4 });
  b += title('Francistone P. Silva', 35, 120, 46, t.ink);
  b += text(38, 160, 'Infraestrutura, redes e produtos', { size: 22, fill: t.muted });
  b += text(38, 190, 'construídos com agentes de IA.', { size: 22, fill: t.muted });
  b += text(38, 224, 'BRASIL · PT-BR', { size: 10.5, fill: t.muted, mono: true, ls: 1.6 });
  b += `<g transform="translate(500 40)">${topology(t)}</g>`;
  return svgDoc(W, H, 'Francistone P. Silva. Infraestrutura, redes e produtos construídos com agentes de IA.', b, { motion: true });
}

/* ── Cartão de projeto (400 × 190: dois por linha no desktop, um por linha no celular) ── */
function card(p, t) {
  const W = 400, H = 190, c = t[p.tom], st = p.status.toUpperCase(), pw = monoWidth(st.length, 10, 0.6) + 30;
  let b = `<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="12" fill="${t.panel}" stroke="${t.line}"/>`;
  b += `<g stroke="${t.accent}" stroke-width="1.4" fill="${t.panel}">${line(24, 30, 36, 30, t.accent)}<circle cx="22" cy="30" r="3"/><circle cx="38" cy="30" r="3"/></g>`;
  b += text(50, 34, `${p.categoria} · REPO ${p.repo.toUpperCase()}`, { size: 10.5, fill: t.muted, mono: true, ls: 1.2 });
  b += `<rect x="${W - 20 - pw}" y="18" width="${pw}" height="22" rx="11" fill="none" stroke="${c}" stroke-opacity=".6"/>`;
  b += `<circle cx="${W - 20 - pw + 12}" cy="29" r="3" fill="${c}"/>` + text(W - 20 - pw + 21, 33, st, { size: 10, fill: c, mono: true, ls: 0.6 });
  b += title(p.nome, 21, 82, 27, t.ink);
  b += text(22, 110, p.linhas[0], { size: 14, fill: t.muted }) + text(22, 130, p.linhas[1], { size: 14, fill: t.muted });
  b += line(22, 150, W - 22, 150, t.line);
  let x = 22;
  for (const [ic, nome] of p.stack) {
    b += icon(ic, x, 160, 15, ICON_TINT) + text(x + 21, 171.7, nome, { size: 11, fill: t.muted, mono: true });
    x += 21 + monoWidth(nome.length, 11) + 11;
  }
  return svgDoc(W, H, cardAlt(p), b);
}
const cardAlt = p => `${p.nome}, ${p.status}. ${p.linhas[0]}. ${p.linhas[1]}. Stack: ${p.stack.map(s => s[1]).join(', ')}.`;

/* ── Como eu trabalho (380 × 336, vertical: flutua à direita do texto no desktop) ── */
const ETAPAS = [['Especificação', 'PRD, regras e arquitetura'], ['Plano em fases', 'escopo e critério de aceite'], ['Campanha autônoma', 'agentes implementam e testam'],
  ['Auditoria independente', 'outro modelo, só leitura'], ['Produção', 'só com aprovação humana']];
function fluxo(t) {
  const W = 380, H = 336, y0 = 34, gap = 62;
  let b = `<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="12" fill="${t.panel}" stroke="${t.line}"/>`;
  b += line(36, y0, 36, y0 + gap * 4, t.line, ' stroke-width="1.5"');
  b += `<path class="pulse" d="M36 ${y0} V${y0 + gap * 4}" pathLength="100" stroke="${t.accent}" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 94"/>`;
  ETAPAS.forEach(([n, s], i) => {
    const y = y0 + i * gap, c = i === 3 ? t.warm : t.accent;
    b += `<circle cx="36" cy="${y}" r="13" fill="${t.panel}" stroke="${c}" stroke-width="1.6"/>` + text(36, y + 4, String(i + 1), { size: 11, fill: c, mono: true, anchor: 'middle' });
    b += text(62, y - 1, n, { size: 15.5, fill: t.ink, weight: 600 }) + text(62, y + 17, s, { size: 11.5, fill: t.muted, mono: true });
  });
  // A auditoria pode devolver correções (FIX) para a campanha, no máximo 3 vezes.
  const ya = y0 + gap * 3, yb = ya - gap, xr = 334;
  b += `<path d="M${xr} ${ya} C ${xr + 34} ${ya}, ${xr + 34} ${yb}, ${xr + 4} ${yb}" fill="none" stroke="${t.warm}" stroke-width="1.4" stroke-dasharray="4 4"/>`;
  b += `<path d="M${xr + 10} ${yb - 4} l-6 4 6 4" fill="none" stroke="${t.warm}" stroke-width="1.4"/>`;
  b += text(xr - 8, yb + gap / 2 + 1, 'FIX', { size: 10, fill: t.warm, mono: true, anchor: 'end', ls: 1 }) + text(xr - 8, yb + gap / 2 + 14, 'até 3×', { size: 9.5, fill: t.warm, mono: true, anchor: 'end' });
  return svgDoc(W, H, 'Fluxo de trabalho: 1 especificação, 2 plano em fases, 3 campanha autônoma com agentes, 4 auditoria independente feita por outro modelo, que pode devolver correções até 3 vezes, e 5 produção só com aprovação humana.', b, { motion: true });
}

/* ── Homelab conceitual (400 × 316). Sem IPs, faixas, nomes de máquina, provedor ou local. ── */
function homelab(t) {
  const W = 400, H = 316;
  const box = (x, y, w, h, t1, t2, stroke = t.line) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${t.panel}" stroke="${stroke}" stroke-width="1.3"/>`
    + text(x + w / 2, y + h / 2 - 3, t1, { size: 12.5, fill: t.ink, weight: 600, anchor: 'middle' }) + text(x + w / 2, y + h / 2 + 13, t2, { size: 10, fill: t.muted, mono: true, anchor: 'middle' });
  const v = (x, y1, y2) => line(x, y1, x, y2, t.accent, ' stroke-width="1.3"');
  let b = `<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="12" fill="${t.panel}" stroke="${t.line}"/>`;
  b += box(120, 16, 160, 40, 'Internet', 'provedor');
  b += v(200, 56, 74) + box(100, 74, 200, 42, 'Roteador e ONT', 'auditados e ajustados');
  b += v(200, 116, 134) + box(80, 134, 240, 42, 'Servidor dedicado', 'Linux · Proxmox VE', t.accent);
  b += `<path d="M200 176 V188 M73 188 H327 M73 188 V200 M200 188 V200 M327 188 V200" fill="none" stroke="${t.accent}" stroke-width="1.3"/>`;
  b += box(14, 200, 118, 46, 'DNS primário', 'Pi-hole + Unbound') + box(141, 200, 118, 46, 'DNS secundário', 'Pi-hole + Unbound') + box(268, 200, 118, 46, 'Laboratório', 'VMs isoladas');
  b += text(14, 274, 'PRÓXIMOS PASSOS', { size: 9.5, fill: t.warm, mono: true, ls: 1.4 });
  for (const [x, s] of [[14, 'rack MikroTik · VLANs'], [206, 'NAS para backup']]) {
    b += `<rect x="${x}" y="280" width="180" height="26" rx="10" fill="${t.panel}" stroke="${t.warm}" stroke-width="1.3" stroke-dasharray="4 4"/>`;
    b += text(x + 90, 297, s, { size: 10.5, fill: t.ink, mono: true, anchor: 'middle' });
  }
  return svgDoc(W, H, 'Homelab conceitual: internet, roteador e ONT auditados e ajustados, servidor dedicado com Linux e Proxmox VE, DNS primário e secundário com Pi-hole e Unbound em containers LXC e VMs de laboratório isoladas. Próximos passos: rack MikroTik com VLANs e NAS para backup.', b);
}

/* ── Rodapé (846 × 56) ── */
function footer(t) {
  const W = 846, H = 56;
  let b = `<defs><linearGradient id="fio" x1="0" x2="1"><stop offset="0" stop-color="${t.line}" stop-opacity="0"/><stop offset=".5" stop-color="${t.line}"/><stop offset="1" stop-color="${t.line}" stop-opacity="0"/></linearGradient></defs>`;
  b += `<rect x="40" y="19" width="766" height="1.5" fill="url(#fio)"/><circle cx="423" cy="20" r="4.5" fill="${t.panel}" stroke="${t.accent}" stroke-width="2"/>`;
  b += text(423, 46, 'do pacote ao produto', { size: 10.5, fill: t.muted, mono: true, anchor: 'middle', ls: 1.2 });
  return svgDoc(W, H, 'Fim do perfil: do pacote ao produto.', b);
}

/* ── Social preview (1280 × 640, versão escura; o GitHub mostra a imagem como está) ── */
function social(s, t) {
  const W = 1280, H = 640;
  let b = `<rect width="${W}" height="${H}" fill="${t.panel}"/>`;
  let dots = '';
  for (let x = 700; x <= 1250; x += 24) for (let y = 40; y <= 600; y += 24) dots += `<circle cx="${x}" cy="${y}" r="1.3"/>`;
  b += `<g fill="${t.line}">${dots}</g>`;
  b += text(80, 132, 'francistone /', { size: 26, fill: t.muted, mono: true }) + text(80 + monoWidth(14, 26), 132, s.repo, { size: 26, fill: t.accent, mono: true });
  b += title(s.titulo, 76, 262, 104, t.ink);
  b += text(82, 340, s.linhas[0], { size: 34, fill: t.muted }) + text(82, 386, s.linhas[1], { size: 34, fill: t.muted });
  let x = 82;
  for (const [ic, nome] of s.stack) { b += icon(ic, x, 506, 28, ICON_TINT) + text(x + 40, 528, nome, { size: 22, fill: t.muted, mono: true }); x += 40 + monoWidth(nome.length, 22) + 30; }
  b += line(80, 470, 640, 470, t.line, ' stroke-width="1.5"');
  b += `<g transform="translate(760 150) scale(1.45)">${topology(t, { animate: false })}</g>`;
  b += text(W - 80, 590, 'github.com/francistone', { size: 20, fill: t.muted, mono: true, anchor: 'end' });
  return svgDoc(W, H, `${s.repo}: ${s.linhas.join(' ')}`, b);
}

/* ── Geração ── */
for (const [name, t] of Object.entries(THEMES)) {
  write(`header-${name}.svg`, header(t));
  for (const p of PROJETOS) write(`card-${p.arquivo}-${name}.svg`, card(p, t));
  write(`fluxo-${name}.svg`, fluxo(t));
  write(`homelab-${name}.svg`, homelab(t));
  write(`footer-${name}.svg`, footer(t));
}
for (const s of SOCIAL) write(`social/${s.repo}.svg`, social(s, THEMES.dark));

const iconNames = new Set([...PROJETOS.flatMap(p => p.stack.map(s => s[0])), ...STACK.flatMap(([, items]) => items.map(i => i[0]))]);
for (const n of iconNames) write(`icons/${n}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">${icon(n, 0, 0, 24, ICON_TINT)}</svg>\n`);

/* ── Blocos automáticos do README ── */
const cardHtml = p => {
  const img = picture(`assets/card-${p.arquivo}`, cardAlt(p), 'width="400"');
  return p.link ? `<a href="${p.link}">${img}</a>` : img;
};
const pares = [];
for (let i = 0; i < PROJETOS.length; i += 2) pares.push(`<p align="center">\n${PROJETOS.slice(i, i + 2).map(cardHtml).join('\n')}\n</p>`);
replaceBlock('destaque', pares.join('\n'));

// Em cada domínio: uma linha só de ícones (decorativos, com o nome no title) e, abaixo, os nomes em texto.
// Ícone e nome na mesma linha quebrariam separados: o navegador sempre pode quebrar ao lado de uma imagem.
const stackRows = STACK.map(([dominio, items]) => {
  const unicos = [...new Map(items.map(([ic, nome]) => [ic, nome])).entries()];
  const icones = unicos.map(([ic, nome]) => `<img src="assets/icons/${ic}.svg" width="18" height="18" alt="" title="${esc(nome)}">`).join(' ');
  return `| **${dominio}** | ${icones}<br>${items.map(([, nome]) => esc(nome)).join('&nbsp;· ')} |`;
});
replaceBlock('stack', ['| Domínio | Ferramentas |', '| :-- | :-- |', ...stackRows].join('\n'));

console.log(`${written.length} arquivos gerados em assets/ e blocos do README atualizados.`);
