# AGENTS.md — Caio Data

Este arquivo é a primeira leitura obrigatória para qualquer agente que trabalhe neste repositório.

## Propósito

O Caio Data é uma central estática que reúne seis acessos de trabalho de Caio César. O site publicado está em <https://caio-csar.github.io/Caio-Data/>.

## Arquitetura

- Produção: HTML5, CSS3 e JavaScript puro.
- Não há backend, framework ou build de produção.
- `index.html`: conteúdo, cards e links oficiais.
- `styles.css`: identidade visual, layout e responsividade.
- `script.js`: pesquisa, atalho `/` e cópia do comando NEXUS.
- `assets/previews/`: miniaturas usadas pelo site.
- `tests/`: testes estáticos Node.js e testes Playwright.

Leia [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) antes de alterar comportamento e [docs/PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md) antes de alterar conteúdo, links ou identidade visual.

Em toda retomada ou redefinição de contexto, leia também [docs/SESSION_STATE.md](docs/SESSION_STATE.md). Atualize esse arquivo ao concluir uma etapa, encontrar um bloqueio ou definir o próximo passo.

## Comandos

```bash
npm ci
npm test
npm run serve
npx playwright install chromium
npm run test:e2e
```

Execute `npm test` primeiro. Execute Playwright quando a alteração afetar interface, interação ou responsividade.

## Regras obrigatórias

- Preserve `CAIO` azul, `DATA` cinza e o subtítulo aprovado.
- Mantenha exatamente os seis acessos documentados em `docs/PROJECT_CONTEXT.md`.
- Não suponha links, versões, contagens ou novos projetos; confirme com o usuário.
- Não adicione dependências de produção sem autorização.
- Mantenha mudanças pequenas e localizadas.
- Ao alterar comportamento ou requisito, atualize os testes e a documentação relacionada no mesmo conjunto de mudanças.
- Não versione credenciais, tokens, cookies, senhas ou arquivos `.env` reais.
- Não investigue nem versione `node_modules/`, resultados de testes, uploads ou arquivos gerados.

## Publicação

O GitHub Pages publica a branch `main`, pasta `/(root)`. Consulte [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) antes de publicar.

## Mapa de continuidade

- [Contexto e requisitos](docs/PROJECT_CONTEXT.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Manutenção](docs/MAINTENANCE.md)
- [Implantação](docs/DEPLOYMENT.md)
- [Retomada em outro computador](docs/HANDOFF.md)
- [Especificações](docs/superpowers/specs/)
- [Planos de implementação](docs/superpowers/plans/)
- [Histórico de versões](CHANGELOG.md)
