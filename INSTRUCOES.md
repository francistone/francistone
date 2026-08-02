# 🚀 Guia de Configuração do GitHub Profile README (Estilo ChrisTitusTech)

Este guia orienta passo a passo como publicar e manter o seu novo perfil estilizado do GitHub, incluindo a automação do feed de atividades dinâmico via **GitHub Actions**.

---

## 📌 Passos de Configuração

### 1. Verificar o Nome do Repositório
Para que este `README.md` apareça na sua página inicial do GitHub (`https://github.com/francistone`), ele **deve** estar em um repositório público com o **mesmo nome do seu nome de usuário**:

- **Nome do repositório:** `francistone/francistone`
- **Visibilidade:** Público (`Public`)

---

### 2. Publicar as Alterações no GitHub

Execute os comandos no seu terminal (Git Bash ou PowerShell no VS Code):

```bash
git add README.md .github/workflows/github-activity.yml INSTRUCOES.md
git commit -m "feat: reformular perfil do GitHub no estilo ChrisTitusTech com automação CI/CD"
git push origin main
```

*(Caso sua branch principal seja `master`, substitua `main` por `master`)*

---

### 3. Configurar Permissões do GitHub Actions (Obrigatório para Automação)

Para que a Action de atualização diária consiga modificar a seção de atividades no `README.md`:

1. Acesse seu repositório no navegador: `https://github.com/francistone/francistone`
2. Clique na aba **Settings** (Configurações).
3. No menu lateral esquerdo, vá em **Actions** ➔ **General**.
4. Role até a seção **Workflow permissions**.
5. Selecione a opção **Read and write permissions** (Permissões de leitura e escrita).
6. Marque a opção **Allow GitHub Actions to create and approve pull requests**.
7. Clique em **Save** (Salvar).

---

### 4. Disparar a Automação Manualmente (Primeiro Teste)

1. Vá na aba **Actions** do seu repositório `francistone/francistone`.
2. Clique no workflow **Update GitHub Activity** na barra lateral esquerda.
3. Clique no botão **Run workflow** ➔ selecione a branch `main` e confirme.
4. Após o término da execução (ícone verde ✅), atualize sua página de perfil do GitHub para ver a seção de atividades e projetos recentes preenchida automaticamente!

---

### 5. Personalizações Adicionais

- **Redes Sociais:** No [README.md](file:///d:/DEV/francistone/README.md), altere os links das redes sociais para seus perfis reais no LinkedIn, YouTube, Telegram e E-mail.
- **Projetos em Destaque:** Adicione novos repositórios na tabela de *Projetos em Destaque & Ferramentas* conforme for desenvolvendo novos laboratórios de infraestrutura e automação.
- **Estatísticas Pessoais:** O `github-readme-stats` busca seus commits públicos e privados. Se desejar ocultar commits em repositórios privados, remova a flag `&count_private=true` na URL das estatísticas.
