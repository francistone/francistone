// Conteúdo dos cartões e da tabela de stack.
// Regra do perfil: só entra aqui o que tem lastro (repositório, projeto real ou uso declarado pelo dono).
// Depois de editar, rode `npm run build` para regenerar os SVGs e os blocos do README.

// tom: 'accent' = rodando · 'warm' = a caminho · 'muted' = laboratório/pessoal
export const PROJETOS = [
  {
    nome: 'Meu Imóvel', arquivo: 'meu-imovel', categoria: 'PRODUTO', repo: 'privado',
    status: 'pré-lançamento', tom: 'warm',
    linhas: ['Anúncios de imóveis: proprietários e corretores', 'Regras no banco com RLS, MFA e fotos privadas'],
    stack: [['next', 'Next.js'], ['supabase', 'Supabase'], ['postgresql', 'Postgres'], ['cloudflare', 'Cloudflare']],
    link: null, // repo privado; o site só entra quando o dono liberar a divulgação (PENDENCIAS.md)
  },
  {
    nome: 'UnifiCar', arquivo: 'unificar', categoria: 'SISTEMA', repo: 'privado',
    status: 'em uso', tom: 'accent',
    linhas: ['Gestão de locadora de veículos e oficina', 'Três livros contábeis isolados, OCR e PDFs'],
    stack: [['nestjs', 'NestJS'], ['react', 'React'], ['prisma', 'Prisma'], ['docker', 'Docker']],
    link: null,
  },
  {
    nome: 'Amorinha', arquivo: 'amorinha', categoria: 'JOGO', repo: 'privado',
    status: 'projeto pessoal', tom: 'muted',
    linhas: ['Pet virtual para celular, tablet e PC', 'PWA offline, minigames e cenários em SVG'],
    stack: [['react', 'React'], ['typescript', 'TypeScript'], ['vite', 'Vite'], ['pwa', 'PWA']],
    link: null,
  },
  {
    nome: 'infra-labs', arquivo: 'infra-labs', categoria: 'LABORATÓRIO', repo: 'público',
    status: 'aberto', tom: 'muted',
    linhas: ['Laboratório de redes e Linux', 'Checklists de diagnóstico e script de testes'],
    stack: [['bash', 'Bash'], ['linux', 'Linux'], ['dns', 'Redes']],
    link: 'https://github.com/francistone/infra-labs',
  },
];

export const STACK = [
  ['Infra & Redes', [['linux', 'Linux (Debian, Ubuntu)'], ['proxmox', 'Proxmox VE'], ['box', 'LXC'], ['docker', 'Docker'], ['nginx', 'Nginx'], ['caddy', 'Caddy'], ['cloudflare', 'Cloudflare (DNS, Tunnel, R2, Workers)'], ['pihole', 'Pi-hole + Unbound']]],
  ['Backend & Dados', [['postgresql', 'PostgreSQL'], ['supabase', 'Supabase (Auth, RLS)'], ['nestjs', 'NestJS'], ['prisma', 'Prisma'], ['drizzle', 'Drizzle'], ['zod', 'Zod'], ['node', 'Node.js']]],
  ['Frontend', [['typescript', 'TypeScript'], ['react', 'React'], ['next', 'Next.js'], ['vite', 'Vite'], ['tailwind', 'Tailwind CSS'], ['pwa', 'PWA']]],
  ['IA & Agentes', [['claude', 'Claude Code'], ['mcp', 'MCP servers'], ['agents', 'Spec-Driven Development, subagentes e skills'], ['browser', 'Chrome DevTools MCP']]],
  ['Automação & Qualidade', [['bash', 'Bash'], ['terminal', 'PowerShell 7'], ['python', 'Python'], ['actions', 'GitHub Actions'], ['vitest', 'Vitest'], ['browser', 'Playwright + axe']]],
  ['Segurança (estudos)', [['kali', 'Kali Linux'], ['shield', 'Hardening'], ['shield', 'Verificação de integridade'], ['box', 'Isolamento de VMs']]],
];

// Social previews (1280×640) para os repositórios públicos. A imagem é enviada à mão em
// Settings → General → Social preview de cada repositório (o GitHub não tem API para isso).
export const SOCIAL = [
  { repo: 'francistone', titulo: 'francistone', linhas: ['Infraestrutura, redes e produtos', 'construídos com agentes de IA'],
    stack: [['linux', 'Linux'], ['proxmox', 'Proxmox'], ['claude', 'Claude Code'], ['postgresql', 'PostgreSQL']] },
  { repo: 'infra-labs', titulo: 'infra-labs', linhas: ['Laboratório de infraestrutura, redes', 'e automação: diagnóstico na prática'],
    stack: [['linux', 'Linux'], ['bash', 'Bash'], ['dns', 'Redes']] },
];
