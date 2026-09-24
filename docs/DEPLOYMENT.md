# Implantação e publicação

## Pré-requisitos

- Git;
- Node.js compatível com o `package-lock.json`;
- Python 3 para o servidor local definido em `package.json`;
- acesso de escrita ao repositório `caio-csar/Caio-Data`.

## Preparar e testar

```bash
git clone https://github.com/caio-csar/Caio-Data.git
cd Caio-Data
npm ci
npm test
npm run serve
```

Abra <http://127.0.0.1:4173/>. Para testar em navegador:

```bash
npx playwright install chromium
npm run test:e2e
```

Se a CDN do Chromium estiver indisponível, registre a limitação; não confunda `npx playwright test --list` com execução efetiva dos testes.

## Configuração do GitHub Pages

No GitHub, abra **Settings > Pages** e selecione:

- Source: **Deploy from a branch**;
- Branch: **main**;
- Folder: **/(root)**.

Depois de um push na `main`, aguarde a implantação e valide <https://caio-csar.github.io/Caio-Data/>.

## Verificação após publicar

- A página abre sem erro 404.
- CSS, JavaScript e três miniaturas carregam.
- Os seis acessos estão presentes.
- Busca e botão de cópia funcionam.
- O site não cria rolagem horizontal no celular.

## Problemas comuns

- **CSS ou imagem ausente:** mantenha caminhos relativos e preserve letras maiúsculas/minúsculas dos nomes.
- **Página antiga:** aguarde o Pages e faça recarregamento sem cache.
- **404:** confira se `index.html` está na raiz da branch configurada.
- **Asset 404:** confirme que o arquivo foi enviado ao GitHub, não apenas criado localmente.
- **Testes E2E não iniciam:** instale Chromium ou verifique bloqueio da CDN/rede.
