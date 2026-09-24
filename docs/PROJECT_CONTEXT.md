# Contexto do projeto Caio Data

## Objetivo

O Caio Data é o painel pessoal de acesso rápido aos projetos, ferramentas e bases de conhecimento de Caio César. Repositório: <https://github.com/caio-csar/Caio-Data>. Site: <https://caio-csar.github.io/Caio-Data/>.

## Identidade aprovada

- Nome: **CAIO DATA**.
- `CAIO`: azul elétrico `#2988ff`.
- `DATA`: cinza-claro.
- Vermelho continua sendo a cor de ações e destaques.
- Subtítulo literal: **Ferramentas de consulta, automação, otimização e gerenciamento de dados.**
- Linguagem visual: fundo quase preto, bordas cinza discretas, títulos brancos fortes e rótulos técnicos em caixa alta.

## Acessos oficiais

O painel possui exatamente seis acessos:

| Acesso | Função | Destino |
|---|---|---|
| MaxDeck | Scripts de automação | <https://caio-csar.github.io/MaxDeck/> |
| NEXUS | Instalador e utilitários PowerShell | Copia o comando abaixo |
| Guia Manager | Telas, flags e funções | <https://caio-csar.github.io/guia-manager-telas/> |
| MaxHub | Mapeamento e atualização de bancos | <https://github.com/caio-csar/MaxHub-Releases/releases/latest> |
| NotebookLM — Nova | Base atualizada | <https://notebook.google.com/notebook/86d68261-51e9-4b08-934c-adb2e6ce59ad> |
| NotebookLM — Antiga | Base histórica | <https://notebook.google.com/notebook/5c394b0f-8550-4e8c-aef2-895afd612ac9> |

Comando NEXUS literal:

```powershell
irm https://caio-csar.github.io/NEXUS/NEXUS_CORE.ps1 | iex
```

O endereço do MaxHub abre a página da release mais recente. Ele não promete download direto, pois o nome do instalador pode mudar.

## Bases NotebookLM

- Nova: **Baseado no BD Manager 152**.
- Antiga: **Baseado no BD Manager 151**.

As duas bases cobrem:

- Consultas SQL e Relatórios;
- Correções e Scripts DML;
- Engenharia de Dados e Mapeamento de BD;
- Regras de Negócio Modular;
- Navegação de Telas e Menus;
- Diagnóstico de Erros de Sistema.

## Decisões relacionadas

- O card do Guia Manager destaca telas como informação principal; flags e funções são secundárias.
- Qualquer mudança na prioridade dos resultados da pesquisa do Guia deve ser feita no repositório do próprio Guia Manager, para funcionar também fora do Caio Data.
- Não incluir outros projetos sem aprovação explícita do usuário.
