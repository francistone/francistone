// Gera os cartões de atividade com dados REAIS da API do GitHub e atualiza o bloco "atividade" do README.
// Roda na Action semanal (.github/workflows/atividade.yml). Não usa dependências externas.
//
// Variáveis de ambiente:
//   GITHUB_TOKEN   obrigatória. Lê o calendário de contribuições (dado público do perfil).
//   METRICS_TOKEN  opcional. Token "fine-grained" só de leitura (Metadata: read em todos os repositórios).
//                  Com ele, entra o cartão de linguagens somando também os repositórios privados.
//                  Só os totais por linguagem aparecem; nomes de repositórios privados nunca saem daqui.
//
// Regras: nada é inventado. O cartão de ritmo só aparece com pelo menos MIN_CONTRIB contribuições
// no ano; se nenhum cartão tiver dados, a seção "Atividade" some do README.
//
// Uso local para conferir o visual com dados de EXEMPLO (não grava no repositório):
//   node scripts/atividade.mjs --exemplo   → docs/preview/atividade-exemplo-*.svg
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { THEMES } from './lib/tokens.mjs';
import { ritmo, linguagens } from './lib/cartoes.mjs';
import { picture, replaceBlock } from './lib/readme.mjs';

const MIN_CONTRIB = 50;
const TOP = 5; // linguagens mostradas; o resto vira "outras"
const user = process.env.PERFIL || process.env.GITHUB_REPOSITORY_OWNER || 'francistone';
const quando = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });

async function api(path, token, body) {
  const res = await fetch(`https://api.github.com${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'francistone-perfil' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`API do GitHub respondeu HTTP ${res.status} em ${path}`);
  const json = await res.json();
  if (json.errors) throw new Error(`GraphQL: ${json.errors.map(e => e.message).join('; ')}`);
  return json;
}

async function dadosRitmo(token) {
  const query = 'query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{contributionCount}}}}}}';
  const { data } = await api('/graphql', token, { query, variables: { login: user } });
  const cal = data.user.contributionsCollection.contributionCalendar;
  const semanas = cal.weeks.slice(-52).map(w => w.contributionDays.reduce((s, d) => s + d.contributionCount, 0));
  let maior = 0, atual = 0;
  for (const d of cal.weeks.flatMap(w => w.contributionDays)) { atual = d.contributionCount > 0 ? atual + 1 : 0; maior = Math.max(maior, atual); }
  return { total: cal.totalContributions, semanas: semanas.length, semanasAtivas: semanas.filter(Boolean).length, maiorSequencia: maior, porSemana: semanas, quando };
}

async function dadosLinguagens(token) {
  const repos = [];
  for (let page = 1; ; page++) {
    const lote = await api(`/user/repos?affiliation=owner&per_page=100&page=${page}`, token);
    repos.push(...lote.filter(r => !r.fork));
    if (lote.length < 100) break;
  }
  const bytes = {};
  for (const r of repos) for (const [lang, n] of Object.entries(await api(`/repos/${r.full_name}/languages`, token))) bytes[lang] = (bytes[lang] || 0) + n;
  const total = Object.values(bytes).reduce((a, b) => a + b, 0);
  if (!total) return null;
  const ord = Object.entries(bytes).sort((a, b) => b[1] - a[1]);
  const pct = n => Math.round((n / total) * 1000) / 10;
  const itens = ord.slice(0, TOP).map(([l, n]) => [l, pct(n)]);
  const resto = ord.slice(TOP).reduce((s, [, n]) => s + n, 0);
  if (resto) itens.push(['outras', pct(resto)]);
  return { itens, quando };
}

const OUT = new URL('../assets/generated/', import.meta.url);
const gravar = (nome, fn, dados) => { for (const [tema, t] of Object.entries(THEMES)) writeFileSync(new URL(`${nome}-${tema}.svg`, OUT), fn(t, dados)); };
const apagar = nome => { for (const tema of Object.keys(THEMES)) { const f = new URL(`${nome}-${tema}.svg`, OUT); if (existsSync(f)) rmSync(f); } };

if (process.argv.includes('--exemplo')) {
  const prev = new URL('../docs/preview/', import.meta.url);
  mkdirSync(prev, { recursive: true });
  const ex = { total: 1234, semanas: 52, semanasAtivas: 38, maiorSequencia: 12, porSemana: Array.from({ length: 52 }, (_, i) => Math.max(0, Math.round(20 + 18 * Math.sin(i / 4) + (i % 7) * 2 - (i < 10 ? 25 : 0)))), quando };
  const exl = { itens: [['TypeScript', 64], ['PLpgSQL', 14], ['JavaScript', 9], ['Shell', 5], ['CSS', 5], ['outras', 3]], quando };
  for (const [tema, t] of Object.entries(THEMES)) {
    writeFileSync(new URL(`atividade-exemplo-ritmo-${tema}.svg`, prev), ritmo(t, ex));
    writeFileSync(new URL(`atividade-exemplo-linguagens-${tema}.svg`, prev), linguagens(t, exl));
  }
  console.log('Cartões de EXEMPLO gravados em docs/preview/ (não vão para o repositório).');
  process.exit(0);
}

if (!process.env.GITHUB_TOKEN) { console.error('Falta a variável GITHUB_TOKEN.'); process.exit(1); }
mkdirSync(OUT, { recursive: true });
const cartoes = [];

const r = await dadosRitmo(process.env.GITHUB_TOKEN);
if (r.total >= MIN_CONTRIB) {
  gravar('ritmo', ritmo, r);
  cartoes.push(picture('assets/generated/ritmo', `Ritmo nos últimos 12 meses: ${r.total} contribuições, ${r.semanasAtivas} de ${r.semanas} semanas ativas.`, 'width="400"'));
} else {
  apagar('ritmo');
  console.log(`Ritmo omitido: ${r.total} contribuições no ano (mínimo ${MIN_CONTRIB}). Ative "Private contributions" no perfil se o trabalho estiver em repositórios privados.`);
}

if (process.env.METRICS_TOKEN) {
  const l = await dadosLinguagens(process.env.METRICS_TOKEN);
  if (l) {
    gravar('linguagens', linguagens, l);
    cartoes.push(picture('assets/generated/linguagens', `Linguagens em todos os repositórios: ${l.itens.map(([n, p]) => `${n} ${p}%`).join(', ')}.`, 'width="400"'));
  }
} else {
  apagar('linguagens');
  console.log('Sem METRICS_TOKEN: cartão de linguagens não gerado (ver MANUTENCAO.md).');
}

const bloco = cartoes.length ? `### Atividade\n\n<p align="center">\n${cartoes.join('\n')}\n</p>` : '';
replaceBlock('atividade', bloco);
console.log(`Cartões publicados: ${cartoes.length}. Contribuições no ano: ${r.total}.`);
