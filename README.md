# Caio Data

Central estática de projetos, ferramentas e bases de conhecimento de Caio César.

**Site publicado:** <https://caio-csar.github.io/Caio-Data/>

## Recursos

- Acesso ao MaxDeck, NEXUS, Guia Manager e à release mais recente do MaxHub.
- Bases NotebookLM do BD Manager 152 e 151.
- Pesquisa rápida com normalização de acentos.
- Cópia do comando NEXUS com um clique.
- Interface responsiva e acessível.

## Tecnologias

HTML5, CSS3 e JavaScript puro. O site não possui backend, framework ou build de produção. Node.js e Playwright são usados apenas para testes.

## Estrutura

```text
Caio-Data/
├── AGENTS.md
├── CHANGELOG.md
├── index.html
├── styles.css
├── script.js
├── assets/previews/
├── tests/
└── docs/
```

## Começar em outro computador

```bash
git clone https://github.com/caio-csar/Caio-Data.git
cd Caio-Data
npm ci
npm test
npm run serve
```

Abra <http://127.0.0.1:4173/>.

Para os testes de navegador:

```bash
npx playwright install chromium
npm run test:e2e
```

## Publicar

O GitHub Pages deve usar **Settings > Pages > Deploy from a branch > main > /(root)**. Cada push validado na `main` atualiza <https://caio-csar.github.io/Caio-Data/>.

## Documentação

- [Instruções para agentes](AGENTS.md)
- [Contexto e requisitos](docs/PROJECT_CONTEXT.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Manutenção](docs/MAINTENANCE.md)
- [Implantação](docs/DEPLOYMENT.md)
- [Continuidade em outro computador](docs/HANDOFF.md)
- [Especificações](docs/superpowers/specs/)
- [Planos de implementação](docs/superpowers/plans/)
- [Histórico de alterações](CHANGELOG.md)

## Alterações importantes

Os links ficam em `index.html`. O comando NEXUS também aparece na constante `NEXUS_COMMAND` de `script.js`; mantenha os dois valores iguais. Antes de modificar conteúdo ou comportamento, leia `AGENTS.md`.
