# Caio Data

Central estática de projetos, ferramentas e bases de conhecimento, pronta para GitHub Pages.

## Publicar

1. Crie o repositório `caio-csar/Caio-Data` no GitHub.
2. Envie os arquivos deste projeto mantendo `index.html` na raiz.
3. No repositório, abra **Settings > Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch **main**, a pasta **/(root)** e salve.
6. Após a publicação, acesse `https://caio-csar.github.io/Caio-Data/`.

## Atualizar acessos

Os links ficam no arquivo `index.html`. O comando copiado pelo card NEXUS também aparece no elemento `#nexus-command` desse arquivo e na constante `NEXUS_COMMAND` de `script.js`; mantenha os dois valores iguais.

## Testar localmente

Com Node.js instalado:

```bash
npm install
npm test
npm run serve
```

Depois, abra `http://127.0.0.1:4173`.

Para executar também os testes de navegador em desktop e celular:

```bash
npx playwright install chromium
npm run test:e2e
```
