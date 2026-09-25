# Caio Data Portability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tornar `caio-csar/Caio-Data` a fonte completa e autossuficiente para retomar o desenvolvimento em outro computador após um clone.

**Architecture:** O site permanece estático e visualmente inalterado. A entrega acrescenta uma camada documental versionada, comandada por `AGENTS.md`, e testes Node.js que verificam a presença, as ligações e os valores críticos dessa documentação antes de qualquer publicação.

**Tech Stack:** HTML5, CSS3, JavaScript puro, Node.js test runner, Playwright, Markdown, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-23-caio-data-portability-design.md`

## Global Constraints

- O site é estático, sem backend e sem etapa de build de produção.
- Não alterar o visual nem o comportamento do painel publicado nesta entrega.
- Tecnologias de produção: HTML5, CSS3 e JavaScript puro; não adicionar dependências de produção sem autorização.
- Preservar `CAIO` azul, `DATA` cinza e o subtítulo `Ferramentas de consulta, automação, otimização e gerenciamento de dados.`
- Manter exatamente seis acessos: MaxDeck, NEXUS, Guia Manager, MaxHub, NotebookLM novo e NotebookLM antigo.
- NotebookLM novo usa `Baseado no BD Manager 152`; NotebookLM antigo usa `Baseado no BD Manager 151`.
- O comando literal é `irm https://caio-csar.github.io/NEXUS/NEXUS_CORE.ps1 | iex`.
- MaxHub abre `https://github.com/caio-csar/MaxHub-Releases/releases/latest`; não prometer download direto.
- GitHub Pages publica a branch `main`, pasta `/(root)`, em `https://caio-csar.github.io/Caio-Data/`.
- Não versionar credenciais, tokens, cookies, senhas, `.env`, `node_modules/`, resultados de testes, ZIPs, uploads de referência ou temporários do Codex.
- Código, testes, documentação, especificações e planos devem viajar no mesmo repositório.

## Review Focus

- Clone novo sem histórico da conversa: `AGENTS.md` deve orientar arquitetura, comandos, restrições e documentos seguintes.
- Documentação divergente do painel: testes devem fixar os seis acessos, versões 152/151, comando NEXUS e URL do MaxHub.
- Upload manual incompleto: teste de inventário deve falhar se faltar qualquer arquivo essencial.
- Pacote contaminado: inspeção deve rejeitar dependências, resultados, segredos, ZIPs aninhados e imagens de referência.
- Retomada em outro computador: `HANDOFF.md` deve conter do clone à validação do Pages, incluindo um prompt pronto para o Codex.

---

### Task 1: Documentation contract tests

**Files:**
- Modify: `tests/static.test.js`
- Test: `tests/static.test.js`

**Interfaces:**
- Consumes: estrutura final e valores literais definidos na especificação.
- Produces: testes `a documentação de continuidade está completa e interligada` e `a documentação preserva decisões críticas do produto`.

- [ ] **Step 1: Write the failing inventory and consistency tests**

Adicionar a `tests/static.test.js` uma lista literal dos arquivos obrigatórios (`AGENTS.md`, `CHANGELOG.md`, cinco documentos em `docs/`, a especificação e os dois planos) e asserts que verifiquem existência. Ler `AGENTS.md`, `README.md`, `docs/PROJECT_CONTEXT.md` e `docs/HANDOFF.md` e fixar:

```js
assert.match(agents, /docs\/PROJECT_CONTEXT\.md/);
assert.match(agents, /npm test/);
assert.match(readme, /docs\/HANDOFF\.md/);
assert.match(context, /BD Manager 152/);
assert.match(context, /BD Manager 151/);
assert.match(context, /irm https:\/\/caio-csar\.github\.io\/NEXUS\/NEXUS_CORE\.ps1 \| iex/);
assert.match(context, /MaxHub-Releases\/releases\/latest/);
assert.match(handoff, /git clone https:\/\/github\.com\/caio-csar\/Caio-Data\.git/);
assert.match(handoff, /npm ci/);
```

- [ ] **Step 2: Run the focused tests and verify failure**

Run: `node --test tests/static.test.js`

Expected: FAIL porque `AGENTS.md`, `CHANGELOG.md` e os documentos modulares ainda não existem.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/static.test.js
git commit -m "test: define project continuity contract"
```

### Task 2: Agent map and stable project context

**Files:**
- Create: `AGENTS.md`
- Create: `docs/PROJECT_CONTEXT.md`
- Create: `docs/ARCHITECTURE.md`
- Test: `tests/static.test.js`

**Interfaces:**
- Consumes: `index.html`, `styles.css`, `script.js`, `package.json` and the approved design/portability specs.
- Produces: authoritative agent entry point and stable functional/technical sources referenced by all later documents.

- [ ] **Step 1: Create concise root instructions**

Escrever `AGENTS.md` with: project purpose; static architecture; exact file map; `npm ci`, `npm test`, `npm run serve`, `npx playwright install chromium`, `npm run test:e2e`; GitHub Pages target; non-negotiable visual/content constraints; localized-change rule; required test order; prohibition on secrets/generated directories; routing links to every document in `docs/`.

- [ ] **Step 2: Record the stable product truth**

Escrever `docs/PROJECT_CONTEXT.md` with the repository/site URLs, approved brand/subtitle, exactly six cards and their official targets, NotebookLM 152/151 distinction, exact NEXUS command, MaxHub release-page behavior and the decision that Guia Manager prioritization belongs to its own project.

- [ ] **Step 3: Document the implemented architecture**

Escrever `docs/ARCHITECTURE.md` mapping `index.html`, `styles.css`, `script.js`, preview assets, search normalization, empty state, `/` focus shortcut, NEXUS clipboard fallback, responsive breakpoints, accessibility hooks, tests, and intentional absence of backend/framework/build.

- [ ] **Step 4: Run the contract tests**

Run: `node --test tests/static.test.js`

Expected: ainda FAIL apenas nos documentos restantes do inventário; nenhum erro nos asserts de `AGENTS.md` ou `PROJECT_CONTEXT.md`.

- [ ] **Step 5: Commit the project map**

```bash
git add AGENTS.md docs/PROJECT_CONTEXT.md docs/ARCHITECTURE.md
git commit -m "docs: add agent map and project context"
```

### Task 3: Maintenance, deployment, and machine handoff

**Files:**
- Create: `docs/MAINTENANCE.md`
- Create: `docs/DEPLOYMENT.md`
- Create: `docs/HANDOFF.md`
- Create: `CHANGELOG.md`
- Modify: `README.md`
- Test: `tests/static.test.js`

**Interfaces:**
- Consumes: sources of truth from Task 2 and commands from `package.json`.
- Produces: human entry point, safe maintenance playbook, deployment guide, and end-to-end recovery checklist.

- [ ] **Step 1: Write safe maintenance procedures**

Escrever `docs/MAINTENANCE.md` with exact procedures for editing a card, official link/text, preview path and proportions, synchronized `#nexus-command`/`NEXUS_COMMAND`, Guia Manager counts, and paired test/documentation updates.

- [ ] **Step 2: Write deployment and troubleshooting procedures**

Escrever `docs/DEPLOYMENT.md` with prerequisites, `npm ci`, local server, static tests, optional Chromium/E2E setup, branch `main` + root Pages setup, public URL verification, and fixes for broken relative paths, stale cache, missing assets and unavailable Chromium CDN.

- [ ] **Step 3: Write the complete recovery checklist**

Escrever `docs/HANDOFF.md` with numbered commands from `git clone https://github.com/caio-csar/Caio-Data.git` through `npm ci`, static/E2E validation, branch choice, `git status`, commit, push and Pages verification. End with a copyable prompt telling a new Codex to read `AGENTS.md`, inspect `git status`, run static tests first, preserve documented constraints and report before changing scope.

- [ ] **Step 4: Establish version history and refresh the README**

Create `CHANGELOG.md` with `Unreleased` and `1.0.0` sections. Expand `README.md` into the human landing page with public URL, features, repository layout, quick start, test commands, deployment summary and links to all five operational docs plus specs/plans.

- [ ] **Step 5: Run the full static suite**

Run: `npm test`

Expected: PASS for the original six tests and the new documentation contract tests.

- [ ] **Step 6: Commit the continuity documentation**

```bash
git add README.md CHANGELOG.md docs/MAINTENANCE.md docs/DEPLOYMENT.md docs/HANDOFF.md
git commit -m "docs: add maintenance deployment and handoff guides"
```

### Task 4: Repository hygiene and portable delivery package

**Files:**
- Modify: `.gitignore`
- Verify: all tracked project files
- Create locally only: `Caio-Data-Complete.zip` (must remain ignored and outside repository contents)

**Interfaces:**
- Consumes: complete project tree from Tasks 1–3.
- Produces: a clean archive whose root contents can be uploaded directly to `caio-csar/Caio-Data`.

- [ ] **Step 1: Harden generated-file exclusions**

Ensure `.gitignore` includes `.env`, `.env.*` with `!.env.example`, `node_modules/`, `test-results/`, `playwright-report/`, `artifacts/`, `*.zip`, OS/editor noise and the existing local runtime/upload directories, without excluding source, tests or `docs/superpowers/`.

- [ ] **Step 2: Validate source and test syntax**

Run:

```bash
node --check script.js
npm test
npx playwright test --list
```

Expected: JavaScript syntax succeeds, all static tests pass, and Playwright lists the configured desktop/mobile scenarios without executing them.

- [ ] **Step 3: Scan the deliverable tree for prohibited content**

Run:

```bash
find . -maxdepth 3 -type d \( -name node_modules -o -name test-results -o -name playwright-report \) -prune -print
find . -maxdepth 3 -type f \( -name '.env' -o -name '*.zip' -o -name '*.pem' -o -name '*.key' \) -print
git status --short
```

Expected: generated directories may exist locally but are ignored; no secret files are candidates for commit; only intentional documentation/test changes appear in status.

- [ ] **Step 4: Commit repository hygiene**

```bash
git add .gitignore docs/superpowers/specs/2026-09-23-caio-data-portability-design.md docs/superpowers/plans/2026-09-23-caio-data-portability.md
git commit -m "chore: make repository portable across machines"
```

- [ ] **Step 5: Build an explicit clean archive**

From the repository root, create the archive from tracked files only:

```bash
git archive --format=zip --output=../Caio-Data-Complete.zip HEAD
unzip -l ../Caio-Data-Complete.zip
```

Expected: the listing includes source, assets, tests, package files, `AGENTS.md`, `CHANGELOG.md`, all operational docs, specs and plans; it excludes `.git`, `node_modules`, results, uploads and nested ZIPs.

- [ ] **Step 6: Perform final fresh-directory verification**

Extract the archive into a temporary directory, run `npm ci` and `npm test`, then compare the archive inventory with the mandatory list in `tests/static.test.js`. Expected: clean install and all static tests pass with no dependency on the old workspace.

- [ ] **Step 7: Upload and verify GitHub**

Upload the archive contents to `https://github.com/caio-csar/Caio-Data` (or push when write authorization is available), preserving paths. Verify on GitHub that `AGENTS.md`, `docs/HANDOFF.md`, both spec/plan directories, source, assets and tests are visible, then confirm `https://caio-csar.github.io/Caio-Data/` still renders unchanged.
