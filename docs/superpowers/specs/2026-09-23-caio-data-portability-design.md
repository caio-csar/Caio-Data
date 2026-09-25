# Caio Data — Especificação de portabilidade e continuidade

## Objetivo

Transformar o repositório `caio-csar/Caio-Data` na fonte completa e autossuficiente do projeto. Depois de formatar ou trocar de computador, Caio César deve conseguir clonar o repositório, abrir a pasta no Codex e continuar o trabalho sem depender do histórico desta conversa nem de arquivos existentes somente no computador anterior.

## Escopo

Esta entrega documenta o projeto existente e inclui no repositório os arquivos de desenvolvimento e validação que já existem localmente. Ela não altera o visual nem o comportamento do painel publicado.

Entram no repositório:

- código-fonte e imagens usados pelo GitHub Pages;
- `AGENTS.md` na raiz;
- documentação modular em `docs/`;
- especificação visual e plano de implementação originais;
- testes estáticos e de navegador;
- arquivos Node.js necessários para executar os testes;
- histórico inicial de versões em `CHANGELOG.md`;
- regras de exclusão em `.gitignore`.

Não entram:

- `node_modules/`;
- resultados, traces e capturas temporárias de testes;
- ZIPs de distribuição gerados localmente;
- credenciais, tokens, cookies, senhas ou arquivos `.env` reais;
- imagens recebidas apenas como referência e que não são usadas pelo site;
- arquivos temporários do Codex ou do sistema operacional.

## Princípio de documentação

O `AGENTS.md` será curto e operacional. Ele funcionará como mapa obrigatório para qualquer Codex que abrir o projeto, contendo:

- propósito do projeto;
- arquitetura resumida;
- mapa dos arquivos principais;
- comandos de instalação, execução e teste;
- restrições que não podem ser quebradas;
- política de alterações pequenas e localizadas;
- documentos que devem ser consultados conforme a tarefa.

Detalhes históricos e explicações extensas ficarão em `docs/`, evitando que o Codex consuma contexto desnecessário em toda execução.

## Estrutura final

```text
Caio-Data/
├── AGENTS.md
├── CHANGELOG.md
├── README.md
├── .gitignore
├── index.html
├── styles.css
├── script.js
├── package.json
├── package-lock.json
├── playwright.config.js
├── assets/
│   └── previews/
├── tests/
│   ├── static.test.js
│   └── site.spec.js
└── docs/
    ├── PROJECT_CONTEXT.md
    ├── ARCHITECTURE.md
    ├── MAINTENANCE.md
    ├── DEPLOYMENT.md
    ├── HANDOFF.md
    └── superpowers/
        ├── specs/
        └── plans/
```

## Conteúdo dos documentos

### `README.md`

Porta de entrada para humanos. Deve explicar o que é o Caio Data, mostrar o endereço publicado, listar recursos, apresentar a estrutura básica e encaminhar para instalação, testes, manutenção e implantação.

### `AGENTS.md`

Instruções autoritativas para agentes de código:

- site estático sem backend e sem build de produção;
- tecnologias: HTML5, CSS3 e JavaScript puro;
- publicação: branch `main`, pasta raiz, GitHub Pages;
- preservar a identidade visual aprovada;
- não adicionar dependências de produção sem autorização;
- não incluir novos projetos ou alterar links oficiais por suposição;
- manter mudanças localizadas e atualizar documentação/testes quando necessário;
- executar primeiro testes estáticos e, quando a mudança afetar interface, testes Playwright;
- ignorar diretórios gerados e não investigar `node_modules/`.

### `docs/PROJECT_CONTEXT.md`

Registra o contexto funcional estável:

- objetivo do painel;
- identidade `CAIO` azul e `DATA` cinza;
- subtítulo institucional aprovado;
- seis acessos permitidos;
- links oficiais;
- diferenças entre os dois NotebookLM;
- comando literal do NEXUS;
- decisões aprovadas sobre MaxHub e Guia Manager;
- endereço do repositório e do site publicado.

### `docs/ARCHITECTURE.md`

Descreve:

- fluxo de carregamento do site;
- responsabilidades de `index.html`, `styles.css` e `script.js`;
- funcionamento da pesquisa, estado vazio, atalho `/` e cópia do NEXUS;
- estrutura das miniaturas;
- acessibilidade e responsividade;
- ausência intencional de backend, framework e etapa de build.

### `docs/MAINTENANCE.md`

Procedimentos seguros para:

- adicionar, remover ou alterar um card;
- atualizar links e textos;
- substituir miniaturas mantendo proporção e caminho;
- alterar o comando NEXUS mantendo HTML e JavaScript sincronizados;
- conferir números do Guia Manager;
- atualizar testes e documentação junto com mudanças funcionais.

### `docs/DEPLOYMENT.md`

Documenta:

- pré-requisitos locais;
- instalação com `npm install` ou `npm ci`;
- servidor local;
- testes estáticos e Playwright;
- publicação pelo GitHub Pages;
- comportamento de atualização após push na `main`;
- verificação do endereço público;
- solução dos problemas mais comuns de caminhos, cache e arquivos ausentes.

### `docs/HANDOFF.md`

Checklist de continuidade em outro computador:

1. instalar Git e Node.js;
2. clonar `https://github.com/caio-csar/Caio-Data.git`;
3. abrir a pasta raiz no Codex;
4. pedir ao Codex que leia `AGENTS.md` e o documento relacionado à tarefa;
5. executar `npm ci`;
6. rodar testes estáticos;
7. instalar Chromium apenas se testes de navegador forem necessários;
8. criar uma branch ou trabalhar na `main` conforme decisão do usuário;
9. confirmar `git status`, commit e push;
10. validar o GitHub Pages.

Inclui também um prompt curto de retomada para ser colado em um novo Codex.

### `CHANGELOG.md`

Começa com a versão publicada e uma seção `Unreleased`. Alterações futuras relevantes deverão ser registradas de forma resumida.

## Fonte da verdade

- O repositório GitHub é a fonte da versão compartilhada do projeto.
- `docs/PROJECT_CONTEXT.md` é a fonte dos requisitos e links estáveis.
- `AGENTS.md` é a fonte das regras de trabalho do Codex.
- `README.md` é a entrada para humanos.
- Código e testes prevalecem para o comportamento efetivamente implementado.
- Quando a implementação mudar, documentação e testes relacionados devem mudar no mesmo conjunto de alterações.

## Fluxo de retomada

```text
git clone → abrir pasta no Codex → ler AGENTS.md → ler documento específico
→ npm ci → npm test → alterar → validar → commit → push → conferir Pages
```

## Segurança e privacidade

- Não versionar segredos ou credenciais.
- O projeto atual não requer `.env`.
- Se uma integração futura exigir configuração sensível, criar somente `.env.example` com nomes de variáveis e manter `.env` no `.gitignore`.
- Não guardar na documentação dados pessoais, conversas ou credenciais de clientes.

## Validação

A entrega estará correta quando:

- todos os arquivos previstos existirem e estiverem ligados entre si;
- um novo Codex conseguir identificar arquitetura, comandos e restrições lendo primeiro `AGENTS.md`;
- o checklist de `HANDOFF.md` permitir retomar o projeto em outro computador;
- `npm test` passar;
- a configuração dos testes Playwright continuar válida;
- nenhum diretório gerado ou segredo entrar no pacote;
- o site publicado permanecer funcional e visualmente inalterado.

## Entrega e publicação

Como a conexão atual do GitHub permite leitura, mas recusou escrita com erro 403, a entrega deverá ser gerada como pacote completo para upload manual no repositório, salvo se o acesso de escrita estiver disponível no momento da publicação. O pacote deve preservar toda a estrutura de pastas e substituir/complementar os arquivos do repositório sem incluir `node_modules` ou temporários.
