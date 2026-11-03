<!--
  README do perfil de @francistone.
  Imagens: pasta assets/, geradas por "npm run build" a partir de scripts/. Não edite os SVGs à mão.
  Os blocos entre os marcadores "nome:inicio" e "nome:fim" são reescritos automaticamente:
    destaque e stack: npm run build (dados em scripts/data/conteudo.mjs)
    atividade: Action semanal (.github/workflows/atividade.yml)
  Guia completo: MANUTENCAO.md
-->

<!-- ══════════ Cabeçalho ══════════ -->
<p align="center">
<picture><source media="(prefers-color-scheme: dark)" srcset="assets/header-dark.svg"><img src="assets/header-light.svg" width="100%" alt="Francistone P. Silva. Infraestrutura, redes e produtos construídos com agentes de IA."></picture>
</p>

<!-- Links essenciais: aguardam confirmação (PENDENCIAS.md, itens 1 e 3). -->

<!-- ══════════ Sobre ══════════ -->
### Sobre

Cuido de infraestrutura Linux e redes: um servidor dedicado com Proxmox, um homelab com DNS recursivo próprio e muito diagnóstico e ajuste fino de rede. Nos produtos, uso o Claude Code como IDE principal. Escrevo a especificação, divido o trabalho em fases e coordeno agentes que implementam, testam e revisam a segurança uns dos outros.

Sou *vibe coder* assumido. Não digito cada linha, mas respondo por cada decisão de arquitetura, e o que chega à produção passa antes por uma revisão independente. Fora do terminal: PC, games e automação no Windows com PowerShell.

<!-- ══════════ Em destaque (gerado: npm run build) ══════════ -->
### Em destaque

<!-- destaque:inicio -->
<p align="center">
<picture><source media="(prefers-color-scheme: dark)" srcset="assets/card-meu-imovel-dark.svg"><img src="assets/card-meu-imovel-light.svg" alt="Meu Imóvel, pré-lançamento. Anúncios de imóveis: proprietários e corretores. RLS no banco, MFA no admin e fotos privadas. Stack: Next.js, Supabase, Postgres, Cloudflare." width="400"></picture>
<picture><source media="(prefers-color-scheme: dark)" srcset="assets/card-unificar-dark.svg"><img src="assets/card-unificar-light.svg" alt="UnifiCar, uso interno. Gestão de locadora de veículos e oficina. Três livros contábeis isolados, OCR e PDFs. Stack: NestJS, React, Prisma, Docker." width="400"></picture>
</p>
<p align="center">
<picture><source media="(prefers-color-scheme: dark)" srcset="assets/card-amorinha-dark.svg"><img src="assets/card-amorinha-light.svg" alt="Amorinha, projeto pessoal. Pet virtual para celular, tablet e PC. PWA offline, minigames e cenários em SVG. Stack: React, TypeScript, Vite, PWA." width="400"></picture>
<a href="https://github.com/francistone/infra-labs"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/card-infra-labs-dark.svg"><img src="assets/card-infra-labs-light.svg" alt="infra-labs, aberto. Laboratório de redes e Linux. Checklists de diagnóstico e script de testes. Stack: Bash, Linux, Redes." width="400"></picture></a>
</p>
<!-- destaque:fim -->

<!-- ══════════ Como eu trabalho ══════════ -->
### Como eu trabalho

<picture><source media="(prefers-color-scheme: dark)" srcset="assets/fluxo-dark.svg"><img align="right" width="380" src="assets/fluxo-light.svg" alt="Fluxo de trabalho: 1 especificação, 2 plano em fases, 3 campanha autônoma com agentes, 4 auditoria independente feita por outro modelo, que pode devolver correções duas vezes antes de a decisão passar para mim, e 5 produção só com aprovação humana."></picture>

Antes de qualquer código existe uma especificação versionada: produto, regras de negócio, arquitetura e segurança. O trabalho anda em **campanhas por fases**. Cada fase é uma missão autônoma, com testes, revisão por subagentes especializados e uma **auditoria independente** feita por outro modelo, que só lê e não edita.

Se a auditoria pede correção, o ciclo volta, no máximo duas vezes; na terceira, a decisão é minha. Produção, segredos e custos sempre passam por mim.

- Spec-Driven Development com `.specs/`, skills e subagentes
- MCP servers e automação de navegador
- Verificações automáticas: tipos, lint, testes e acessibilidade

<br clear="right">

<!-- ══════════ Stack (gerado: npm run build) ══════════ -->
### Stack

<!-- stack:inicio -->
| Domínio | Ferramentas |
| :-- | :-- |
| **Infra & Redes** | <img src="assets/icons/linux.svg" width="18" height="18" alt="" title="Linux (Debian, Ubuntu)"> <img src="assets/icons/proxmox.svg" width="18" height="18" alt="" title="Proxmox VE"> <img src="assets/icons/box.svg" width="18" height="18" alt="" title="LXC"> <img src="assets/icons/docker.svg" width="18" height="18" alt="" title="Docker"> <img src="assets/icons/nginx.svg" width="18" height="18" alt="" title="Nginx"> <img src="assets/icons/caddy.svg" width="18" height="18" alt="" title="Caddy"> <img src="assets/icons/cloudflare.svg" width="18" height="18" alt="" title="Cloudflare (DNS, R2, Workers)"> <img src="assets/icons/pihole.svg" width="18" height="18" alt="" title="Pi-hole + Unbound"><br>Linux (Debian, Ubuntu)&nbsp;· Proxmox VE&nbsp;· LXC&nbsp;· Docker&nbsp;· Nginx&nbsp;· Caddy&nbsp;· Cloudflare (DNS, R2, Workers)&nbsp;· Pi-hole + Unbound |
| **Backend & Dados** | <img src="assets/icons/postgresql.svg" width="18" height="18" alt="" title="PostgreSQL"> <img src="assets/icons/supabase.svg" width="18" height="18" alt="" title="Supabase (Auth, RLS)"> <img src="assets/icons/nestjs.svg" width="18" height="18" alt="" title="NestJS"> <img src="assets/icons/prisma.svg" width="18" height="18" alt="" title="Prisma"> <img src="assets/icons/drizzle.svg" width="18" height="18" alt="" title="Drizzle"> <img src="assets/icons/zod.svg" width="18" height="18" alt="" title="Zod"> <img src="assets/icons/node.svg" width="18" height="18" alt="" title="Node.js"><br>PostgreSQL&nbsp;· Supabase (Auth, RLS)&nbsp;· NestJS&nbsp;· Prisma&nbsp;· Drizzle&nbsp;· Zod&nbsp;· Node.js |
| **Frontend** | <img src="assets/icons/typescript.svg" width="18" height="18" alt="" title="TypeScript"> <img src="assets/icons/react.svg" width="18" height="18" alt="" title="React"> <img src="assets/icons/next.svg" width="18" height="18" alt="" title="Next.js"> <img src="assets/icons/vite.svg" width="18" height="18" alt="" title="Vite"> <img src="assets/icons/tailwind.svg" width="18" height="18" alt="" title="Tailwind CSS"> <img src="assets/icons/pwa.svg" width="18" height="18" alt="" title="PWA"><br>TypeScript&nbsp;· React&nbsp;· Next.js&nbsp;· Vite&nbsp;· Tailwind CSS&nbsp;· PWA |
| **IA & Agentes** | <img src="assets/icons/claude.svg" width="18" height="18" alt="" title="Claude Code"> <img src="assets/icons/mcp.svg" width="18" height="18" alt="" title="MCP servers"> <img src="assets/icons/agents.svg" width="18" height="18" alt="" title="Spec-Driven Development, subagentes e skills"> <img src="assets/icons/browser.svg" width="18" height="18" alt="" title="Chrome DevTools MCP"><br>Claude Code&nbsp;· MCP servers&nbsp;· Spec-Driven Development, subagentes e skills&nbsp;· Chrome DevTools MCP |
| **Automação & Qualidade** | <img src="assets/icons/bash.svg" width="18" height="18" alt="" title="Bash"> <img src="assets/icons/terminal.svg" width="18" height="18" alt="" title="PowerShell 7"> <img src="assets/icons/python.svg" width="18" height="18" alt="" title="Python"> <img src="assets/icons/actions.svg" width="18" height="18" alt="" title="GitHub Actions"> <img src="assets/icons/vitest.svg" width="18" height="18" alt="" title="Vitest"> <img src="assets/icons/browser.svg" width="18" height="18" alt="" title="Playwright + axe"><br>Bash&nbsp;· PowerShell 7&nbsp;· Python&nbsp;· GitHub Actions&nbsp;· Vitest&nbsp;· Playwright + axe |
| **Segurança (estudos)** | <img src="assets/icons/kali.svg" width="18" height="18" alt="" title="Kali Linux"> <img src="assets/icons/shield.svg" width="18" height="18" alt="" title="Verificação de integridade"> <img src="assets/icons/box.svg" width="18" height="18" alt="" title="Isolamento de VMs"><br>Kali Linux&nbsp;· Hardening&nbsp;· Verificação de integridade&nbsp;· Isolamento de VMs |
<!-- stack:fim -->

<!-- ══════════ Homelab (recolhido) ══════════ -->
<details>
<summary><b>Homelab</b>: rede, DNS e virtualização</summary>
<br>

<picture><source media="(prefers-color-scheme: dark)" srcset="assets/homelab-dark.svg"><img align="right" width="400" src="assets/homelab-light.svg" alt="Homelab conceitual: internet, roteador e ONT auditados e ajustados, servidor dedicado com Linux e Proxmox VE, DNS primário e secundário com Pi-hole e Unbound em containers LXC e VMs de laboratório isoladas. Próximos passos: rack MikroTik com VLANs e NAS para backup."></picture>

Um servidor dedicado com Proxmox VE concentra o laboratório. O DNS da rede é recursivo e próprio: Pi-hole com Unbound em dois containers LXC, primário e secundário. O SSH só aceita chave.

VMs de estudo de segurança, como o Kali, ficam isoladas do resto da rede. Roteador e ONT passaram por auditoria e ajuste de desempenho.

**Próximos passos:** rack com MikroTik (RouterOS) e VLANs separando cada tipo de tráfego, e um NAS para backup.

<br clear="right">
</details>

<!-- ══════════ Atividade (gerado pela Action semanal; some se não houver dados) ══════════ -->
<!-- atividade:inicio -->
<!-- atividade:fim -->

<!-- ══════════ Rodapé ══════════ -->
<p align="center">
<picture><source media="(prefers-color-scheme: dark)" srcset="assets/footer-dark.svg"><img src="assets/footer-light.svg" width="100%" alt="Fim do perfil: do pacote ao produto."></picture>
</p>
