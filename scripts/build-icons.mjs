// Extrai do pacote simple-icons (licença CC0) só os ícones usados no perfil → scripts/data/icons.json.
// Só é preciso rodar ao adicionar um ícone novo (requer `npm install`). Uso: node scripts/build-icons.mjs
import { writeFileSync } from 'node:fs';
import * as si from 'simple-icons';

// nome usado no perfil → slug do Simple Icons
const MAP = {
  linux: 'linux', debian: 'debian', ubuntu: 'ubuntu', proxmox: 'proxmox', docker: 'docker', nginx: 'nginx', caddy: 'caddy',
  cloudflare: 'cloudflare', pihole: 'pihole', mikrotik: 'mikrotik', postgresql: 'postgresql', supabase: 'supabase', nestjs: 'nestjs',
  prisma: 'prisma', drizzle: 'drizzle', node: 'nodedotjs', typescript: 'typescript', react: 'react', next: 'nextdotjs', vite: 'vite',
  tailwind: 'tailwindcss', claude: 'claude', anthropic: 'anthropic', mcp: 'modelcontextprotocol', bash: 'gnubash', python: 'python',
  actions: 'githubactions', vitest: 'vitest', kali: 'kalilinux', resend: 'resend', zod: 'zod', pwa: 'pwa',
};
const key = slug => 'si' + slug.charAt(0).toUpperCase() + slug.slice(1);
const out = {};
for (const [name, slug] of Object.entries(MAP)) {
  const icon = si[key(slug)];
  if (!icon) throw new Error(`Ícone não encontrado no simple-icons: ${slug}`);
  out[name] = icon.path;
}
writeFileSync(new URL('./data/icons.json', import.meta.url), JSON.stringify(out) + '\n');
console.log(`${Object.keys(out).length} ícones gravados em scripts/data/icons.json`);
