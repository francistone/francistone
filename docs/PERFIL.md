# Mudanças fora do README

O perfil é a página inteira, não só o README. Abaixo está tudo que fica **fora deste repositório** e que você aplica ou aprova. Nada aqui foi alterado na sua conta: visibilidade e configurações só mudam com a sua aprovação.

## 1. Bio, empresa, localização e links

Onde: https://github.com/settings/profile

| Campo | Hoje | Proposta |
|---|---|---|
| Bio (máx. 160) | 🔧 Infraestrutura de Redes • 🐧 Linux • 📊 Performance • 📡 Troubleshooting | `Infra Linux, redes e homelab. Construo produtos completos orquestrando agentes de IA no Claude Code. Vibe coder, com método.` (124 caracteres) |
| Company | Freelancer / IT Infrastructure | Deixar em branco: o README já explica o que você faz. Se preferir manter, use `Autônomo`. |
| Location | Brasil 🇧🇷 | `Brasil` (sem cidade) |
| Website | — | Só depois de confirmar (PENDENCIAS.md, itens 1 e 3) |
| Social accounts | — | LinkedIn, se você quiser (PENDENCIAS.md, item 3) |

**Contribuições privadas** (necessário para o cartão de ritmo refletir o seu trabalho real): no seu perfil, clique em **Contribution settings**, logo acima do gráfico de contribuições, e marque **Private contributions**. Só aparecem números; nomes e conteúdo de repositórios privados continuam ocultos.

## 2. Repositórios fixados (6)

Hoje só existem 2 repositórios públicos, e um deles é o próprio perfil. Fixar repositório privado não adianta, porque visitantes não o veem. A proposta abaixo depende de publicar projetos (seção 4).

| Ordem | Repositório | Situação | Por que fixar |
|---|---|---|---|
| 1 | `agent-loop` | A extrair do Meu Imóvel, em versão genérica | Mostra o seu diferencial: campanhas por fases com auditoria independente |
| 2 | `homelab` | A criar: documentação sanitizada | Infra e redes na prática |
| 3 | `dns-speed-benchmark` | A publicar, se o código existir no seu PC | Ferramenta útil e fácil de entender |
| 4 | `infra-labs` | Já é público | Diagnóstico de rede |
| 5 | `amorinha` | Hoje é privado | Produto completo feito com agentes, jogável no navegador |
| 6 | `triade` (ou outro jogo) | A publicar, se o código existir | Variedade: 3D com React Three Fiber |

**Enquanto isso:** fixe só o `infra-labs`. Onde: no seu perfil, **Customize your pins**.

## 3. Descrição, topics e social preview de cada repositório público

Descrição e topics: na página do repositório, clique na engrenagem ao lado de **About**. Social preview: **Settings → General → Social preview → Edit → Upload an image**.

| Repositório | Descrição | Topics | Social preview |
|---|---|---|---|
| `francistone` | README de perfil: infraestrutura, redes e produtos construídos com agentes de IA | `github-profile` `profile-readme` `svg` `github-actions` | `assets/social/francistone.png` |
| `infra-labs` | Laboratório de infraestrutura, redes e automação: diagnóstico na prática | `linux` `networking` `troubleshooting` `bash` `sysadmin` `network-diagnostics` | `assets/social/infra-labs.png` |

**README do `infra-labs`:** há uma proposta revisada no mesmo padrão em [`docs/repos/infra-labs-README.md`](repos/infra-labs-README.md). Ela tira os emojis dos títulos, liga cada guia ao seu arquivo e deixa de anunciar pastas que ainda estão vazias. Só aplico no repositório `infra-labs` com a sua aprovação.

## 4. O que vale tornar público e o que limpar antes

Antes de abrir qualquer repositório: lembre que **o histórico inteiro fica público**, não só a versão atual.

| Projeto | Vale publicar? | Limpar antes |
|---|---|---|
| **Homelab** (novo repo) | Sim, só a documentação | IPs e faixas de rede, nomes de máquinas, MACs, provedor, localização, chaves SSH, senhas em configs do Pi-hole e do Proxmox. Diagramas só conceituais. Começar o repo do zero, sem histórico. |
| **DNS Speed Benchmark** | Sim | Resultados salvos ou capturas com IPs da sua rede ou do provedor. Adicionar LICENSE e uma captura sem dados. A detecção dos DNS da rede local pode ficar, porque acontece só na máquina de quem roda. |
| **Amorinha** | Sim, se você aceitar que o nome do pet e a menção à família fiquem públicos | Os commits já usam o e-mail privado do GitHub. Conferir se há fotos reais ou nomes de pessoas no histórico. Decidir se o link do GitHub Pages entra no cartão. |
| **Jogos** (estilo Undertale, xadrez e damas em LAN, TRÍADE) | Sim, com cuidado | **Estilo Undertale:** não pode usar música, sprites, personagens nem nomes do jogo original, só a mecânica. **LAN com voz:** nada de IP fixo no código. Adicionar LICENSE. |
| **agent-loop** (extraído do Meu Imóvel) | Sim, é o diferencial mais forte | É uma missão à parte: tirar tudo que é do Meu Imóvel (docs, infraestrutura, regras de negócio) e deixar só o mecanismo genérico. Começar o repo do zero, sem histórico. |
| Meu Imóvel, o projeto imobiliário anterior e o UnifiCar | **Não** | Têm dados do negócio, documentos jurídicos, detalhes de infraestrutura e de pagamentos. Ficam como "case" no README, sem código. |
| `OSINT_Toolkit` | Não, por enquanto | Está vazio. Apagar se não for usar. |
| Pesquisa com Freqtrade | Opcional | Se entrar, só como "explorando", sem promessa de resultado, sem chaves de corretora nem resultados financeiros. |

## 5. O que saiu deste repositório

- `INSTRUCOES.md`: apagado. Descrevia o visual antigo e tinha um link para um arquivo do seu Windows. Foi substituído por `MANUTENCAO.md`.
- `.github/workflows/github-activity.yml`: apagado. Só enxergava repositórios públicos, criava commits vazios para não ser desligado e usava uma ação de terceiros presa em `@master`. Foi substituído por `.github/workflows/atividade.yml`.
