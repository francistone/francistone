// Cartões de atividade (gerados pela Action a partir de dados reais da API do GitHub).
// Mesmo formato dos cartões de projeto: 400 × 190, painel, rótulo em caixa alta monoespaçada.
import { svgDoc, text, line } from './svg.mjs';

const W = 400, H = 190;
const frame = t => `<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="12" fill="${t.panel}" stroke="${t.line}"/>`;
const eyebrow = (t, s) => text(22, 34, s, { size: 10.5, fill: t.muted, mono: true, ls: 1.2 });
const stamp = (t, quando) => text(W - 22, 178, `atualizado em ${quando}`, { size: 9.5, fill: t.muted, mono: true, anchor: 'end' });
const fmt = n => n.toLocaleString('pt-BR');

// dados: { total, semanasAtivas, semanas, maiorSequencia, porSemana: number[52], quando }
export function ritmo(t, d) {
  let b = frame(t) + eyebrow(t, 'RITMO · ÚLTIMOS 12 MESES');
  const stats = [[fmt(d.total), 'contribuições'], [`${d.semanasAtivas}/${d.semanas}`, 'semanas ativas'], [`${fmt(d.maiorSequencia)} ${d.maiorSequencia === 1 ? 'dia' : 'dias'}`, 'maior sequência']];
  stats.forEach(([v, k], i) => {
    const x = 22 + i * 122;
    b += text(x, 72, v, { size: 22, fill: t.ink, weight: 600 }) + text(x, 90, k, { size: 10, fill: t.muted, mono: true });
  });
  const base = 160, maxH = 50, n = d.porSemana.length, bw = (W - 44) / n, max = Math.max(1, ...d.porSemana);
  b += line(22, base + 0.5, W - 22, base + 0.5, t.line);
  d.porSemana.forEach((v, i) => {
    if (!v) return;
    const h = Math.max(2, (v / max) * maxH), x = 22 + i * bw + 1;
    b += `<rect x="${x.toFixed(1)}" y="${(base - h).toFixed(1)}" width="${(bw - 2).toFixed(1)}" height="${h.toFixed(1)}" rx="1.5" fill="${i === n - 1 ? t.warm : t.accent}" opacity="${(0.4 + 0.6 * v / max).toFixed(2)}"/>`;
  });
  b += text(22, 178, '12 meses atrás', { size: 9.5, fill: t.muted, mono: true }) + stamp(t, d.quando);
  return svgDoc(W, H, `Ritmo nos últimos 12 meses: ${fmt(d.total)} contribuições, ${d.semanasAtivas} de ${d.semanas} semanas ativas, maior sequência de ${d.maiorSequencia} dias.`, b);
}

// dados: { itens: [[nome, porcentagem]], quando } — já ordenado, com "outras" no fim se houver
export function linguagens(t, d) {
  let b = frame(t) + eyebrow(t, 'LINGUAGENS · TODOS OS REPOSITÓRIOS');
  const cores = [[t.accent, 1], [t.accent, 0.55], [t.warm, 1], [t.muted, 1], [t.muted, 0.55], [t.line, 1]];
  const bw = W - 44;
  let x = 22;
  b += `<clipPath id="barra"><rect x="22" y="54" width="${bw}" height="10" rx="5"/></clipPath><g clip-path="url(#barra)">`;
  d.itens.forEach(([, pct], i) => { const w = bw * pct / 100; b += `<rect x="${x.toFixed(1)}" y="54" width="${w.toFixed(1)}" height="10" fill="${cores[i][0]}" opacity="${cores[i][1]}"/>`; x += w; });
  b += '</g>';
  d.itens.forEach(([nome, pct], i) => {
    const cx = 22 + (i % 2) * 186, cy = 98 + Math.floor(i / 2) * 26;
    b += `<rect x="${cx}" y="${cy - 9}" width="10" height="10" rx="2" fill="${cores[i][0]}" opacity="${cores[i][1]}"/>`;
    b += text(cx + 18, cy, nome, { size: 13, fill: t.ink }) + text(cx + 164, cy, `${pct.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`, { size: 12, fill: t.muted, mono: true, anchor: 'end' });
  });
  b += stamp(t, d.quando);
  return svgDoc(W, H, `Linguagens em todos os repositórios: ${d.itens.map(([n, p]) => `${n} ${p}%`).join(', ')}.`, b);
}
