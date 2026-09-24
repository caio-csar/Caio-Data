const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

test('a página contém somente os seis acessos e seus valores literais', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const cards = html.match(/data-project-card/g) || [];

  assert.equal(cards.length, 6);
  assert.match(html, /https:\/\/caio-csar\.github\.io\/MaxDeck\//);
  assert.match(html, /https:\/\/caio-csar\.github\.io\/guia-manager-telas\//);
  assert.match(html, /https:\/\/github\.com\/caio-csar\/MaxHub-Releases\/releases\/latest/);
  assert.match(html, /https:\/\/notebook\.google\.com\/notebook\/86d68261-51e9-4b08-934c-adb2e6ce59ad/);
  assert.match(html, /https:\/\/notebook\.google\.com\/notebook\/5c394b0f-8550-4e8c-aef2-895afd612ac9/);
  assert.match(html, /irm https:\/\/caio-csar\.github\.io\/NEXUS\/NEXUS_CORE\.ps1 \| iex/);
  assert.match(html, /Ferramentas de consulta, automação, otimização e gerenciamento de dados\./);
  assert.match(html, /Baseado no BD Manager 152/);
  assert.match(html, /Baseado no BD Manager 151/);
  assert.match(html, /id="top"/);
  assert.match(html, /id="projetos"/);
  assert.match(html, /id="conhecimento"/);
  assert.match(html, /id="ferramentas"/);
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /src="script\.js"/);

  const externalLinks = html.match(/target="_blank"/g) || [];
  const protectedLinks = html.match(/rel="noopener noreferrer"/g) || [];
  assert.equal(externalLinks.length, 5);
  assert.equal(protectedLinks.length, 5);
});

test('o sistema visual aprovado está declarado e responsivo', () => {
  const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');

  assert.match(css, /--brand-blue:\s*#2988ff/i);
  assert.match(css, /--action-red:\s*#d90923/i);
  assert.match(css, /\.project-grid\s*\{/);
  assert.match(css, /grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(css, /\.knowledge-grid\s*\{/);
  assert.match(css, /@media\s*\(max-width:\s*720px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
});

test('a busca normaliza acentos e encontra termos parciais', () => {
  const { normalizeSearch, matchesSearch } = require('../script.js');

  assert.equal(normalizeSearch('  AUTOMAÇÃO  '), 'automacao');
  assert.equal(normalizeSearch('Funções e Relatórios'), 'funcoes e relatorios');
  assert.equal(matchesSearch('Scripts de automação', 'automacao'), true);
  assert.equal(matchesSearch('Base de consulta', 'maxhub'), false);
  assert.equal(matchesSearch('NotebookLM — Antiga', ''), true);
});

test('as três miniaturas reais estão integradas e otimizadas', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const previews = ['guia-manager', 'maxhub'];

  for (const name of previews) {
    const relativePath = `assets/previews/${name}.webp`;
    const absolutePath = path.join(root, relativePath);
    assert.match(html, new RegExp(`src="${relativePath.replaceAll('/', '\\/')}"`));
    assert.equal(fs.existsSync(absolutePath), true);
    assert.ok(fs.statSync(absolutePath).size < 250_000);
  }

  const maxDeckPath = path.join(root, 'assets/previews/maxdeck.png');
  assert.match(html, /src="assets\/previews\/maxdeck\.png"/);
  assert.equal(fs.existsSync(maxDeckPath), true);
  assert.ok(fs.statSync(maxDeckPath).size < 300_000);
});

test('a prévia do NEXUS usa o menu real em vez de uma imagem genérica', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

  assert.doesNotMatch(html, /src="assets\/previews\/nexus\.webp"/);
  assert.match(html, /Administrador: Windows PowerShell/);
  assert.match(html, /\[1\] Instalar Sistema/);
  assert.match(html, /\[2\] Atualizar Sistema/);
  assert.match(html, /\[3\] Baixar Última Versão/);
});

test('a entrega documenta a publicação no GitHub Pages', () => {
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');

  assert.match(readme, /caio-csar\/Caio-Data/);
  assert.match(readme, /Settings\s*>\s*Pages/i);
  assert.match(readme, /main/);
  assert.match(readme, /https:\/\/caio-csar\.github\.io\/Caio-Data\//);
});

test('a documentação de continuidade está completa e interligada', () => {
  const requiredFiles = [
    'AGENTS.md',
    'CHANGELOG.md',
    'docs/SESSION_STATE.md',
    'docs/PROJECT_CONTEXT.md',
    'docs/ARCHITECTURE.md',
    'docs/MAINTENANCE.md',
    'docs/DEPLOYMENT.md',
    'docs/HANDOFF.md',
    'docs/superpowers/specs/2026-09-11-caio-data-design.md',
    'docs/superpowers/specs/2026-09-23-caio-data-portability-design.md',
    'docs/superpowers/plans/2026-09-11-caio-data-implementation.md',
    'docs/superpowers/plans/2026-09-23-caio-data-portability.md',
  ];

  for (const relativePath of requiredFiles) {
    assert.equal(fs.existsSync(path.join(root, relativePath)), true, `${relativePath} deve existir`);
  }

  const agents = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8');
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  const handoff = fs.readFileSync(path.join(root, 'docs/HANDOFF.md'), 'utf8');

  assert.match(agents, /docs\/PROJECT_CONTEXT\.md/);
  assert.match(agents, /docs\/ARCHITECTURE\.md/);
  assert.match(agents, /npm test/);
  assert.match(agents, /docs\/SESSION_STATE\.md/);
  assert.match(readme, /docs\/HANDOFF\.md/);
  assert.match(handoff, /git clone https:\/\/github\.com\/caio-csar\/Caio-Data\.git/);
  assert.match(handoff, /npm ci/);
});

test('a documentação preserva as decisões críticas do produto', () => {
  const context = fs.readFileSync(path.join(root, 'docs/PROJECT_CONTEXT.md'), 'utf8');

  assert.match(context, /Ferramentas de consulta, automação, otimização e gerenciamento de dados\./);
  assert.match(context, /BD Manager 152/);
  assert.match(context, /BD Manager 151/);
  assert.match(context, /irm https:\/\/caio-csar\.github\.io\/NEXUS\/NEXUS_CORE\.ps1 \| iex/);
  assert.match(context, /MaxHub-Releases\/releases\/latest/);
});
