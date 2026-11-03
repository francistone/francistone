# Manutenção do perfil

Guia curto para manter o README do perfil. Substitui o antigo `INSTRUCOES.md`.

## Como funciona

- **Tudo que é visual é SVG versionado** em `assets/`, nas versões clara e escura. Nenhuma imagem depende de serviço externo.
- Os SVGs **não são editados à mão**. Eles são gerados por `scripts/build-assets.mjs` a partir de:
  - `scripts/lib/tokens.mjs`: cores (tema claro e escuro) e fontes;
  - `scripts/data/conteudo.mjs`: textos dos cartões, tabela de stack e social previews.
- Os títulos usam a fonte Geologica convertida em contorno, porque imagem no GitHub não carrega fonte externa. O contorno fica guardado em `scripts/data/glyphs.json`.
- Os blocos **Em destaque** e **Stack** do README são reescritos pelo build. O bloco **Atividade** é reescrito pela Action semanal.
- O tema claro ou escuro de cada imagem segue a preferência do navegador ou do sistema, que é o método oficial do GitHub (`<picture>` com `prefers-color-scheme`).

| Pasta ou arquivo | O que é |
|---|---|
| `README.md` | A página do perfil |
| `assets/*.svg` | Cabeçalho, cartões, fluxo, homelab e rodapé (gerados) |
| `assets/icons/` | Ícones da tabela de stack, um tom só que funciona nos dois temas |
| `assets/social/` | Social previews 1280×640 (SVG e PNG) |
| `assets/generated/` | Cartões de atividade (gerados pela Action) |
| `scripts/` | Geradores e verificações |
| `docs/PERFIL.md` | Mudanças fora do README: bio, fixados, topics |
| `PENDENCIAS.md` | O que ainda depende da sua confirmação |

## Mudar um texto, um projeto ou a stack

1. Edite `scripts/data/conteudo.mjs`. Cada projeto tem nome, status, duas linhas de descrição, stack e link.
2. Rode, na pasta do repositório:

```bash
npm install
```

```bash
npm run build
```

```bash
npm run check
```

3. Se o `check` terminar com "Tudo certo.", faça o commit.

O `npm install` só é necessário na primeira vez e quando um **título novo** (por exemplo, o nome de um projeto novo) precisa virar contorno.

Os textos "Sobre", "Como eu trabalho" e "Homelab" ficam direto no `README.md`.

## Ver como vai ficar antes de publicar

```bash
npm run preview
```

O comando gera capturas em `docs/capturas/`, em desktop e celular, nos temas claro e escuro. Usa o CSS oficial de Markdown do GitHub e precisa do Playwright com Chromium.

## Cartões de atividade

A Action **Cartões de atividade** (`.github/workflows/atividade.yml`) roda toda segunda-feira e também pode ser disparada à mão em **Actions → Cartões de atividade → Run workflow**.

- **Ritmo**: contribuições dos últimos 12 meses, lidas do calendário público do perfil. O cartão só aparece com pelo menos 50 contribuições no ano. Se o seu trabalho fica em repositórios privados, ative **Private contributions** no perfil (passo a passo em `docs/PERFIL.md`).
- **Linguagens**: só aparece se existir o segredo `METRICS_TOKEN`. Mostra apenas os totais por linguagem, nunca o nome de repositório privado. Para ligar:
  1. Acesse https://github.com/settings/personal-access-tokens/new
  2. Em **Token name**, escreva `perfil-linguagens`. Em **Expiration**, escolha 1 ano.
  3. Em **Repository access**, marque **All repositories**.
  4. Em **Permissions**, deixe só o **Metadata: Read-only**, que já vem marcado. Não marque mais nada.
  5. Clique em **Generate token** e copie o valor. Ele aparece uma vez só.
  6. Em https://github.com/francistone/francistone/settings/secrets/actions clique em **New repository secret**. Em **Name**, escreva `METRICS_TOKEN`; em **Secret**, cole o valor e salve.
  7. Dispare a Action à mão, como descrito acima. Em menos de um minuto o cartão aparece no perfil.
- Quando o token vencer, a Action falha e o GitHub avisa por e-mail. Basta gerar outro e trocar o segredo.
- O GitHub desliga Actions agendadas de repositórios sem nenhuma atividade por 60 dias. Se isso acontecer, reative em **Actions → Cartões de atividade → Enable workflow**.

## Social previews

Os PNGs em `assets/social/` são enviados à mão: no repositório, **Settings → General → Social preview → Edit → Upload an image**. Para criar o de um repositório novo, adicione-o em `SOCIAL` no `conteudo.mjs` e rode:

```bash
npm run build
```

```bash
npm run social
```

## Regras do perfil

- **Nada inventado.** Projeto, número ou habilidade só entra com lastro: um repositório, um projeto real ou um uso que você declarou.
- **Privacidade.** Nunca entram CNPJ, endereço, nomes de familiares, IPs ou faixas de rede, nomes de máquinas, provedor, local dos servidores, valores, preços, dados de clientes ou segredos. O `npm run check` procura esses padrões e uma lista de termos sensíveis, guardada só como hash para não expor o que protege.
- **Sem dependência frágil.** Nenhuma imagem de serviço externo; a Action só usa o checkout oficial, fixado por hash.
- **Pouca animação.** Só o pulso do cabeçalho e o do fluxo, e os dois param quando o sistema pede "reduzir movimento".
