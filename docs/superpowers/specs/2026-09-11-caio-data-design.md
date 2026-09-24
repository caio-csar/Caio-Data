# Caio Data — Especificação de design

## Objetivo

Criar um painel estático para GitHub Pages que concentre os seis acessos usados por Caio César. O resultado deve reproduzir com alta fidelidade o segundo conceito visual aprovado: interface técnica escura, estrutura compacta em cards e identidade próxima dos projetos MaxDeck e Guia Manager.

## Publicação

- Repositório previsto: `Caio-Data`
- Endereço previsto: `https://caio-csar.github.io/Caio-Data/`
- Arquitetura: site estático sem servidor, compatível com GitHub Pages.
- Tecnologias: HTML semântico, CSS responsivo e JavaScript puro.

## Identidade visual

- Marca principal: `CAIO DATA`.
- `CAIO`: azul elétrico, com corte diagonal entre as palavras.
- `DATA`: cinza-claro.
- O azul identifica a marca Caio Data; vermelho permanece como cor de ação e destaque dos projetos.
- Fundo quase preto, painéis em grafite, bordas cinza discretas, textos brancos e secundários em cinza.
- Tipografia forte e técnica, com pequenos rótulos em caixa alta.
- Cantos moderadamente arredondados, sem aparência excessivamente suave.
- O layout desktop seguirá a composição do conceito aprovado: cabeçalho horizontal, apresentação curta, seção de projetos em cards e seção de bases de conhecimento.
- Em telas menores, os cards serão empilhados sem perda de conteúdo ou funcionalidade.

## Cabeçalho e apresentação

- Logotipo textual `CAIO DATA` à esquerda.
- Navegação por âncoras: `Projetos`, `Conhecimento` e `Ferramentas`.
- Campo de busca com o texto `Buscar projeto`.
- Rótulo: `CENTRAL DE PROJETOS`.
- Título principal: `CAIO DATA`.
- Subtítulo institucional: `Ferramentas de consulta, automação, otimização e gerenciamento de dados.`

## Projetos e ferramentas

### MaxDeck

- Tipo: `FERRAMENTA WEB`.
- Descrição: `Scripts de automação`.
- Miniatura inspirada visualmente no catálogo real do MaxDeck.
- Ação: `ABRIR MAXDECK`.
- Destino: `https://caio-csar.github.io/MaxDeck/`.

### NEXUS

- Tipo: `UTILITÁRIO`.
- Descrição: `Instalador e utilitários`.
- Miniatura inspirada no menu PowerShell fornecido.
- Exibir o comando completo em uma faixa legível:

  `irm https://caio-csar.github.io/NEXUS/NEXUS_CORE.ps1 | iex`

- Ação: `COPIAR COMANDO`.
- Ao copiar, alterar temporariamente o retorno visual para `COMANDO COPIADO`.
- Se a API moderna da área de transferência falhar, usar uma alternativa compatível e informar erro somente se ambas falharem.

### Guia Manager

- Tipo: `BASE DE CONSULTA`.
- Descrição: `Telas, flags e funções`.
- Miniatura inspirada na busca real do Guia Manager.
- A prévia deve priorizar visualmente `840 telas`; `1.911 flags` e `1.266 funções` serão informações secundárias.
- Ação: `CONSULTAR GUIA`.
- Destino: `https://caio-csar.github.io/guia-manager-telas/`.
- O Caio Data não altera o algoritmo de busca do Guia Manager; apenas acessa o projeto.

### MaxHub

- Tipo: `APLICATIVO`.
- Descrição: `Mapeamento e atualização de bancos`.
- Miniatura inspirada no print real, com cartões de bancos e símbolos X coloridos.
- Ação: `VER ÚLTIMA VERSÃO`.
- Destino: `https://github.com/caio-csar/MaxHub-Releases/releases/latest`.
- O botão abre a página da release mais recente em uma nova aba; não promete download automático.

## Bases de conhecimento

As duas bases terão cards largos e compartilharão o mesmo escopo funcional:

- Consultas SQL e Relatórios
- Correções e Scripts DML
- Engenharia de Dados e Mapeamento de BD
- Regras de Negócio Modular
- Navegação de Telas e Menus
- Diagnóstico de Erros de Sistema

### NotebookLM — Nova

- Selo: `BASE ATUALIZADA`.
- Complemento: `Baseado no BD Manager 152`.
- Destino: `https://notebook.google.com/notebook/86d68261-51e9-4b08-934c-adb2e6ce59ad`.

### NotebookLM — Antiga

- Selo: `BASE HISTÓRICA`.
- Complemento: `Baseado no BD Manager 151`.
- Destino: `https://notebook.google.com/notebook/5c394b0f-8550-4e8c-aef2-895afd612ac9`.

## Busca e interação

- A busca filtra os seis cards por nome, categoria, descrição e termos auxiliares.
- A filtragem acontece enquanto o usuário digita.
- Se nada corresponder, exibir uma mensagem curta de resultado vazio.
- Links externos abrem em nova aba com proteção `noopener noreferrer`.
- Cards terão estados de foco e hover claros; toda ação será acessível por teclado.

## Organização de arquivos

- `index.html`: estrutura e conteúdo do painel.
- `styles.css`: identidade visual e responsividade.
- `script.js`: busca, cópia do NEXUS e pequenos estados de interface.
- `assets/`: imagens otimizadas usadas nas miniaturas e identidade.
- `README.md`: instruções curtas para publicar pelo GitHub Pages.

## Validação

- Conferir os seis destinos e o comando NEXUS literalmente.
- Verificar busca, estado vazio e feedback da cópia.
- Testar teclado, foco visível e contraste.
- Testar larguras de desktop, tablet e celular.
- Verificar que não há rolagem horizontal nem conteúdo cortado.
- Comparar visualmente a versão final com o segundo conceito aprovado e com os prints reais fornecidos.
