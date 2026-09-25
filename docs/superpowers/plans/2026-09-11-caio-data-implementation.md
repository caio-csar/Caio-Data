# Caio Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir um painel estático e responsivo, fiel ao conceito aprovado, que concentre os seis acessos do Caio Data e possa ser publicado diretamente no GitHub Pages.

**Architecture:** Um site sem backend composto por HTML semântico, CSS próprio e JavaScript puro. Os cards carregam metadados pesquisáveis no próprio HTML; `script.js` cuida somente da busca, navegação interna e cópia segura do comando NEXUS. Testes Playwright verificam conteúdo, links, interações, acessibilidade básica e responsividade em navegador real.

**Tech Stack:** HTML5, CSS3, JavaScript ES2022, Node.js, `@playwright/test`, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-11-caio-data-design.md`

## Global Constraints

- Repositório previsto: `Caio-Data`; URL prevista: `https://caio-csar.github.io/Caio-Data/`.
- Marca: `CAIO` em azul elétrico, corte diagonal azul e `DATA` em cinza-claro.
- Subtítulo literal: `Ferramentas de consulta, automação, otimização e gerenciamento de dados.`
- O site deve funcionar sem backend e sem etapa de build em produção.
- O comando NEXUS deve ser exatamente `irm https://caio-csar.github.io/NEXUS/NEXUS_CORE.ps1 | iex`.
- Links externos abrem em nova aba com `target="_blank" rel="noopener noreferrer"`.
- O link do MaxHub abre a página da release mais recente e não promete download automático.
- NotebookLM novo usa BD Manager 152 e ID `86d68261-51e9-4b08-934c-adb2e6ce59ad`.
- NotebookLM antigo usa BD Manager 151 e ID `5c394b0f-8550-4e8c-aef2-895afd612ac9`.
- Não incluir projetos além de MaxDeck, NEXUS, Guia Manager, MaxHub e as duas bases NotebookLM.

---

## File Map

- `index.html`: conteúdo, semântica, metadados pesquisáveis e destinos dos seis cards.
- `styles.css`: tokens visuais, layout desktop, estados interativos e responsividade.
- `script.js`: funções puras de normalização/filtro, integração com o DOM e cópia do NEXUS.
- `assets/previews/maxdeck.webp`: miniatura otimizada do MaxDeck.
- `assets/previews/nexus.webp`: miniatura otimizada do terminal NEXUS.
- `assets/previews/guia-manager.webp`: miniatura otimizada do Guia Manager.
- `assets/previews/maxhub.webp`: miniatura otimizada do MaxHub.
- `tests/site.spec.js`: testes Playwright em navegador real.
- `playwright.config.js`: servidor estático e matrizes desktop/mobile.
- `package.json`: comandos de teste e dependência de desenvolvimento.
- `README.md`: publicação no GitHub Pages e manutenção dos links.

### Task 1: Fundação, conteúdo e destinos

**Files:**
- Create: `index.html`
- Create: `package.json`
- Create: `playwright.config.js`
- Create: `tests/site.spec.js`

**Interfaces:**
- Produces: elementos `[data-project-card]`, atributo `data-search`, campo `#project-search`, região `#empty-state`, botão `#copy-nexus`, saída viva `#copy-status`.
- Produces: scripts npm `serve` e `test`.

- [ ] **Step 1: Criar o teste estrutural que deve falhar**

```js
// tests/site.spec.js
const { test, expect } = require('@playwright/test');

test('exibe somente os seis acessos aprovados e os destinos corretos', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Caio Data/);
  await expect(page.locator('[data-project-card]')).toHaveCount(6);
  await expect(page.getByRole('link', { name: 'Abrir MaxDeck' })).toHaveAttribute('href', 'https://caio-csar.github.io/MaxDeck/');
  await expect(page.getByRole('link', { name: 'Consultar Guia' })).toHaveAttribute('href', 'https://caio-csar.github.io/guia-manager-telas/');
  await expect(page.getByRole('link', { name: 'Ver última versão' })).toHaveAttribute(
    'href',
    'https://github.com/caio-csar/MaxHub-Releases/releases/latest'
  );
});
```

- [ ] **Step 2: Criar configuração mínima e executar o teste para confirmar falha**

```json
{
  "name": "caio-data",
  "private": true,
  "scripts": {
    "serve": "python3 -m http.server 4173",
    "test": "playwright test"
  },
  "devDependencies": {
    "@playwright/test": "^1.55.0"
  }
}
```

```js
// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  webServer: { command: 'npm run serve', port: 4173, reuseExistingServer: true },
  use: { baseURL: 'http://127.0.0.1:4173' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ]
});
```

Run: `npm install && npx playwright install chromium && npm test`

Expected: FAIL porque `index.html` e os cards ainda não existem.

- [ ] **Step 3: Implementar o HTML semântico completo**

Criar `index.html` com:

```html
<header class="topbar">
  <a class="brand" href="#top" aria-label="Caio Data — início">
    <span class="brand-caio">CAIO</span><span class="brand-slash">/</span><span class="brand-data">DATA</span>
  </a>
  <nav aria-label="Navegação principal">
    <a href="#projetos">Projetos</a>
    <a href="#conhecimento">Conhecimento</a>
    <a href="#ferramentas">Ferramentas</a>
  </nav>
  <label class="search"><span class="sr-only">Buscar projeto</span><input id="project-search" type="search" placeholder="Buscar projeto"></label>
</header>
```

Incluir os seis cards com `[data-project-card]` e `data-search` contendo nome, categoria, descrição e termos auxiliares. Usar exatamente estes destinos:

```text
MaxDeck: https://caio-csar.github.io/MaxDeck/
Guia Manager: https://caio-csar.github.io/guia-manager-telas/
MaxHub: https://github.com/caio-csar/MaxHub-Releases/releases/latest
NotebookLM — Nova: https://notebook.google.com/notebook/86d68261-51e9-4b08-934c-adb2e6ce59ad
NotebookLM — Antiga: https://notebook.google.com/notebook/5c394b0f-8550-4e8c-aef2-895afd612ac9
```

O NEXUS usa botão, não link. Incluir a faixa de comando e o botão:

```html
<code id="nexus-command">irm https://caio-csar.github.io/NEXUS/NEXUS_CORE.ps1 | iex</code>
<button id="copy-nexus" type="button">Copiar comando</button>
<span id="copy-status" class="sr-only" aria-live="polite"></span>
```

Nos dois cards NotebookLM, repetir as seis capacidades da especificação e diferenciar os complementos `Baseado no BD Manager 152` e `Baseado no BD Manager 151`.

- [ ] **Step 4: Executar o teste estrutural**

Run: `npm test -- --project=desktop --grep "seis acessos"`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add index.html package.json package-lock.json playwright.config.js tests/site.spec.js
git commit -m "feat: add Caio Data content foundation"
```

### Task 2: Sistema visual fiel ao conceito aprovado

**Files:**
- Create: `styles.css`
- Modify: `index.html`
- Modify: `tests/site.spec.js`

**Interfaces:**
- Consumes: estrutura e seletores da Task 1.
- Produces: tokens CSS em `:root`, grids `.project-grid` e `.knowledge-grid`, estados `.card:hover` e `.card:focus-within`, breakpoint mobile em `760px`.

- [ ] **Step 1: Escrever os testes de layout que devem falhar**

```js
test('mantém grid desktop e empilha no celular sem rolagem horizontal', async ({ page }, testInfo) => {
  await page.goto('/');
  const viewport = page.viewportSize();
  const columns = await page.locator('.project-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
  if (testInfo.project.name === 'desktop') expect(columns).toBeGreaterThanOrEqual(2);
  if (testInfo.project.name === 'mobile') expect(columns).toBe(1);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
  expect(viewport.width).toBeGreaterThan(0);
});

test('marca Caio Data usa azul em CAIO e contraste legível', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.brand-caio')).toHaveCSS('color', 'rgb(37, 134, 255)');
  await expect(page.locator('.brand-data')).toHaveCSS('color', 'rgb(214, 219, 226)');
});
```

- [ ] **Step 2: Executar para confirmar falha**

Run: `npm test -- --grep "grid desktop|marca Caio"`

Expected: FAIL porque `styles.css` e os estilos esperados ainda não existem.

- [ ] **Step 3: Implementar tokens e composição visual**

Criar `styles.css` começando por:

```css
:root {
  color-scheme: dark;
  --bg: #080a0d;
  --panel: #0e1116;
  --panel-soft: #12161e;
  --line: #29303a;
  --line-hot: #a5222e;
  --text: #f4f6f8;
  --muted: #9aa6b5;
  --blue: #2586ff;
  --red: #e41324;
  --red-dark: #8b1420;
  --data: #d6dbe2;
  --radius: 14px;
  --content: 1540px;
}
```

Implementar:

- Topbar horizontal aderente ao topo, marca à esquerda, navegação central e pesquisa à direita.
- Hero curto com rótulo técnico espaçado, marca grande e subtítulo institucional.
- `.project-grid` em três colunas no desktop; MaxHub ocupa a posição restante de forma equilibrada.
- `.knowledge-grid` em duas colunas largas.
- Cards com fundo preto/grafite, borda fina, detalhes vermelhos e botões vermelhos de largura total.
- Marca com corte diagonal azul entre `CAIO` e `DATA` usando `.brand-slash` inclinado.
- Foco visível azul nos controles e vermelho nos cards/ações.
- `@media (max-width: 1060px)` com duas colunas e `@media (max-width: 760px)` com uma coluna, topbar reorganizada e botões confortáveis ao toque.
- `@media (prefers-reduced-motion: reduce)` removendo transições.

- [ ] **Step 4: Executar testes de layout**

Run: `npm test -- --grep "grid desktop|marca Caio"`

Expected: PASS nos projetos desktop e mobile.

- [ ] **Step 5: Gerar captura de comparação**

Run: `npx playwright screenshot --viewport-size="1600,1000" http://127.0.0.1:4173 artifacts/caio-data-desktop.png`

Expected: captura com hierarquia equivalente ao conceito aprovado, sem conteúdo cortado.

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css tests/site.spec.js
git commit -m "feat: implement approved Caio Data visual system"
```

### Task 3: Busca e cópia do NEXUS

**Files:**
- Create: `script.js`
- Modify: `index.html`
- Modify: `tests/site.spec.js`

**Interfaces:**
- Produces: `normalizeSearch(value: string): string`.
- Produces: `matchesSearch(searchableText: string, query: string): boolean`.
- Produces: `filterCards(query: string): number`, retornando a quantidade visível.
- Produces: `copyNexusCommand(): Promise<boolean>`.

- [ ] **Step 1: Escrever testes de interação que devem falhar**

```js
test('busca ignora acentos e mostra estado vazio', async ({ page }) => {
  await page.goto('/');
  const search = page.locator('#project-search');
  await search.fill('automacao');
  await expect(page.locator('[data-project-card]:visible')).toHaveCount(1);
  await expect(page.getByText('MaxDeck', { exact: true })).toBeVisible();
  await search.fill('projeto inexistente');
  await expect(page.locator('#empty-state')).toBeVisible();
});

test('copia literalmente o comando NEXUS e fornece feedback', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.locator('#copy-nexus').click();
  await expect(page.locator('#copy-nexus')).toHaveText('Comando copiado');
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toBe('irm https://caio-csar.github.io/NEXUS/NEXUS_CORE.ps1 | iex');
});
```

- [ ] **Step 2: Executar para confirmar falha**

Run: `npm test -- --grep "busca ignora|copia literalmente"`

Expected: FAIL porque `script.js` ainda não existe.

- [ ] **Step 3: Implementar busca e cópia**

```js
const normalizeSearch = value => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('pt-BR')
  .trim();

const matchesSearch = (searchableText, query) =>
  normalizeSearch(searchableText).includes(normalizeSearch(query));

function filterCards(query) {
  let visible = 0;
  document.querySelectorAll('[data-project-card]').forEach(card => {
    const match = matchesSearch(card.dataset.search || card.textContent, query);
    card.hidden = !match;
    if (match) visible += 1;
  });
  document.querySelector('#empty-state').hidden = visible !== 0;
  return visible;
}
```

Implementar `copyNexusCommand()` usando primeiro `navigator.clipboard.writeText(command)`. Como alternativa, criar `textarea` temporário, selecionar e executar `document.execCommand('copy')`. Atualizar botão e região viva para `Comando copiado`; após 1800 ms, restaurar `Copiar comando`. Em falha dupla, exibir `Selecione e copie o comando` e selecionar o conteúdo do `<code>`.

Conectar `input` de `#project-search` a `filterCards`, adicionar atalho `/` quando o foco não estiver em campo editável e impedir o comportamento padrão.

- [ ] **Step 4: Executar testes de interação**

Run: `npm test -- --grep "busca ignora|copia literalmente"`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add index.html script.js tests/site.spec.js
git commit -m "feat: add search and NEXUS command copy"
```

### Task 4: Miniaturas reais dos projetos

**Files:**
- Create: `assets/previews/maxdeck.webp`
- Create: `assets/previews/nexus.webp`
- Create: `assets/previews/guia-manager.webp`
- Create: `assets/previews/maxhub.webp`
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `tests/site.spec.js`

**Interfaces:**
- Consumes: cards das Tasks 1–2.
- Produces: quatro imagens WebP locais com `width`, `height`, `alt` e carregamento previsível.

- [ ] **Step 1: Escrever teste de integridade das miniaturas**

```js
test('carrega quatro miniaturas locais sem distorção', async ({ page }) => {
  await page.goto('/');
  const previews = page.locator('img.project-preview');
  await expect(previews).toHaveCount(4);
  for (const preview of await previews.all()) {
    expect(await preview.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    expect(await preview.getAttribute('src')).toMatch(/^assets\/previews\/.+\.webp$/);
  }
});
```

- [ ] **Step 2: Executar para confirmar falha**

Run: `npm test -- --grep "quatro miniaturas"`

Expected: FAIL porque as miniaturas ainda não foram adicionadas.

- [ ] **Step 3: Preparar os quatro arquivos WebP**

Usar os prints fornecidos como fonte, preservando proporção e sem esticar. Recortar apenas áreas úteis ao reconhecimento de cada projeto. Padronizar a caixa visual em proporção aproximada `16 / 8.5`, com `object-fit: cover` ou `object-fit: contain` definido por projeto. Otimizar cada arquivo para menos de 250 KB sem tornar textos estruturais borrados.

- [ ] **Step 4: Integrar as miniaturas aos cards**

Adicionar `<img class="project-preview" ...>` com dimensões explícitas e textos alternativos:

```text
MaxDeck: “Prévia do catálogo de scripts do MaxDeck”
NEXUS: “Prévia do menu PowerShell do NEXUS”
Guia Manager: “Prévia da busca de telas do Guia Manager”
MaxHub: “Prévia dos bancos mapeados no MaxHub”
```

- [ ] **Step 5: Executar teste e inspecionar desktop/mobile**

Run: `npm test -- --grep "quatro miniaturas" && npm test -- --grep "grid desktop"`

Expected: PASS; nenhuma imagem esticada e nenhum card ultrapassa a largura da tela.

- [ ] **Step 6: Commit**

```bash
git add assets/previews index.html styles.css tests/site.spec.js
git commit -m "feat: add authentic project previews"
```

### Task 5: Auditoria final e publicação documentada

**Files:**
- Create: `README.md`
- Modify: `tests/site.spec.js`
- Modify: any implementation file only if verification finds a defect

**Interfaces:**
- Consumes: site completo.
- Produces: documentação de publicação e conjunto final de verificações.

- [ ] **Step 1: Adicionar teste dos links externos e conteúdo institucional**

```js
test('links externos são seguros e textos institucionais estão corretos', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Ferramentas de consulta, automação, otimização e gerenciamento de dados.')).toBeVisible();
  await expect(page.getByText('Baseado no BD Manager 152')).toBeVisible();
  await expect(page.getByText('Baseado no BD Manager 151')).toBeVisible();
  const links = page.locator('a[target="_blank"]');
  expect(await links.count()).toBe(5);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('rel', /noopener/);
    await expect(link).toHaveAttribute('rel', /noreferrer/);
  }
});
```

- [ ] **Step 2: Criar README com publicação exata**

Documentar:

```text
1. Criar ou abrir o repositório caio-csar/Caio-Data.
2. Enviar os arquivos mantendo index.html na raiz.
3. Abrir Settings > Pages.
4. Em Build and deployment, escolher Deploy from a branch.
5. Selecionar main e /(root), então salvar.
6. Acessar https://caio-csar.github.io/Caio-Data/ após a publicação.
```

Também documentar onde editar links (`index.html`) e o comando NEXUS (`index.html`, elemento `#nexus-command`).

- [ ] **Step 3: Executar toda a suíte**

Run: `npm test`

Expected: todos os testes PASS nos projetos `desktop` e `mobile`.

- [ ] **Step 4: Executar verificações estáticas**

Run: `rg -n "NEXUS_CORE|notebook.google|MaxHub-Releases|guia-manager-telas|MaxDeck" index.html README.md`

Expected: todos os destinos aparecem corretamente; não existe ID de notebook trocado.

Run: `rg -n "TODO|TBD|javascript:void|href=\"#\"" index.html styles.css script.js README.md`

Expected: nenhum resultado.

- [ ] **Step 5: Capturar e revisar a versão final**

Run: `mkdir -p artifacts && npx playwright screenshot --viewport-size="1600,1000" --full-page http://127.0.0.1:4173 artifacts/caio-data-final-desktop.png`

Run: `npx playwright screenshot --device="Pixel 7" --full-page http://127.0.0.1:4173 artifacts/caio-data-final-mobile.png`

Expected: desktop fiel ao conceito aprovado; mobile legível, sem sobreposição ou rolagem horizontal.

- [ ] **Step 6: Commit**

```bash
git add README.md tests/site.spec.js index.html styles.css script.js assets/previews
git commit -m "docs: finalize GitHub Pages delivery"
```
