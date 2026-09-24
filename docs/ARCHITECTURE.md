# Arquitetura

## Visão geral

O Caio Data é servido diretamente pelo GitHub Pages. O navegador carrega `index.html`, aplica `styles.css`, executa `script.js` e busca as miniaturas por caminhos relativos. Não existe servidor de aplicação, banco de dados, framework ou compilação.

## Responsabilidades

### `index.html`

Define a marca, navegação, busca, quatro cards de projetos, dois cards NotebookLM, links externos, comando NEXUS e textos acessíveis. Cada acesso pesquisável possui `data-project-card` e um índice textual em `data-search`.

### `styles.css`

Contém tokens de cor, tipografia, grids, estados dos cards, foco visível, breakpoints e suporte a `prefers-reduced-motion`. O layout principal usa três colunas no desktop e se reorganiza em telas menores.

### `script.js`

- `normalizeSearch(value)`: remove acentos, converte para minúsculas e elimina espaços externos.
- `matchesSearch(text, query)`: verifica correspondência parcial normalizada.
- A pesquisa oculta cards e seções sem resultado e mostra o estado vazio.
- A tecla `/` foca a busca quando o usuário não está digitando em um campo editável.
- O botão NEXUS usa `navigator.clipboard.writeText`; se indisponível, tenta `document.execCommand('copy')`; se ambos falharem, seleciona o comando para cópia manual.
- Os links da navegação atualizam apenas o destaque visual local.

O valor do comando aparece em `#nexus-command` e na constante `NEXUS_COMMAND`; os dois devem permanecer idênticos.

## Imagens

As miniaturas de produção ficam em `assets/previews/`:

- `maxdeck.png`;
- `guia-manager.webp`;
- `maxhub.webp`.

O NEXUS usa uma prévia construída em HTML/CSS com seu menu real, não uma imagem genérica.

## Acessibilidade e responsividade

O site possui link de salto, rótulos acessíveis, feedback `aria-live`, foco visível, textos alternativos e proteção `noopener noreferrer` em links externos. Os testes Playwright executam perfis desktop e mobile e verificam overflow horizontal.

## Validação

- `npm test`: contrato estrutural, conteúdo crítico, assets e documentação.
- `npm run test:e2e`: links, pesquisa, atalho, cópia e responsividade em navegador.
- `playwright.config.js`: inicia o servidor local na porta `4173` e executa projetos desktop e mobile.
