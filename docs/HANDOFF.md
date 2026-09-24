# Continuidade em outro computador

Este roteiro permite retomar o projeto sem o histórico do chat nem arquivos da máquina anterior.

## Checklist

1. Instale Git, Node.js e Python 3.
2. Clone e entre no projeto:

   ```bash
   git clone https://github.com/caio-csar/Caio-Data.git
   cd Caio-Data
   ```

3. Abra a pasta raiz no Codex.
4. Peça ao Codex para ler primeiro `AGENTS.md` e depois o documento relacionado à tarefa.
5. Peça ao Codex para ler `docs/SESSION_STATE.md` e continuar a partir do próximo passo registrado, sem repetir etapas concluídas.
6. Instale exatamente as dependências registradas:

   ```bash
   npm ci
   ```

7. Execute os testes estáticos antes de alterar:

   ```bash
   npm test
   ```

8. Se a tarefa afetar interface, interação ou responsividade:

   ```bash
   npx playwright install chromium
   npm run test:e2e
   ```

9. Confirme com o usuário se o trabalho será feito em branch própria ou diretamente na `main`.
10. Ao terminar cada etapa, atualize `docs/SESSION_STATE.md`, confira `git status`, execute novamente os testes, faça commit e push.
11. Valide <https://caio-csar.github.io/Caio-Data/> após a implantação.

## Prompt para um novo Codex

```text
Continue o projeto Caio Data deste repositório. Leia primeiro AGENTS.md e siga suas regras. Depois leia docs/PROJECT_CONTEXT.md e o documento específico da tarefa. Antes de alterar qualquer arquivo, confira git status e execute npm test. Preserve os seis acessos, os links oficiais e a identidade visual documentada. Não aumente o escopo sem me consultar. Ao terminar, atualize testes e documentação relacionados, valide tudo e informe exatamente o que ainda não foi publicado no GitHub.
```

## Antes de apagar a máquina antiga

No GitHub, confirme visualmente a presença de `AGENTS.md`, `CHANGELOG.md`, `docs/`, `tests/`, `package-lock.json`, código e assets. Faça um clone em pasta vazia, rode `npm ci` e `npm test`. Somente depois dessa conferência considere o computador antigo dispensável.
