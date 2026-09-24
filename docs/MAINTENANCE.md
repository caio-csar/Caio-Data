# Manutenção

## Antes de alterar

Leia `AGENTS.md` e `docs/PROJECT_CONTEXT.md`, execute `npm ci` e confirme a situação inicial com `npm test`.

## Alterar um card

1. Localize o `<article data-project-card>` em `index.html`.
2. Mantenha título, descrição, `data-search`, destino e texto acessível coerentes.
3. Use `target="_blank" rel="noopener noreferrer"` em links externos.
4. Não adicione ou remova um dos seis acessos sem aprovação.
5. Atualize `tests/static.test.js`, `tests/site.spec.js`, `docs/PROJECT_CONTEXT.md` e `CHANGELOG.md` quando aplicável.

## Atualizar links e textos

Links oficiais ficam em `index.html` e são registrados em `docs/PROJECT_CONTEXT.md`. Altere ambos juntos. Atualize os asserts literais dos testes para impedir divergências futuras.

## Substituir miniaturas

1. Salve o arquivo em `assets/previews/` com nome estável e extensão apropriada.
2. Mantenha a proporção original do sistema representado e atualize `width`, `height` e `alt` em `index.html`.
3. Prefira WebP para capturas; mantenha cada WebP abaixo de 250 KB e o PNG do MaxDeck abaixo de 300 KB, conforme os testes atuais.
4. Remova assets de produção que deixarem de ser usados; não versione prints enviados apenas como referência.

## Alterar o NEXUS

O comando precisa ser idêntico em dois lugares:

- elemento `#nexus-command` de `index.html`;
- constante `NEXUS_COMMAND` de `script.js`.

Depois da alteração, atualize os testes estáticos, o teste Playwright de cópia e `docs/PROJECT_CONTEXT.md`.

## Atualizar números do Guia Manager

Confirme os números na fonte oficial antes de alterar `840 telas`, `1.911 flags` ou `1.266 funções`. Atualize texto visível, `aria-label`, documentação e testes relacionados no mesmo commit.

## Checklist técnico

```bash
npm test
node --check script.js
npx playwright test --list
npm run test:e2e
```

Playwright é obrigatório quando houver mudança visual, responsiva ou interativa.
