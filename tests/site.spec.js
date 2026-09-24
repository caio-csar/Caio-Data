const { test, expect } = require('@playwright/test');

test('exibe somente os seis acessos aprovados e os destinos corretos', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Caio Data/);
  await expect(page.locator('[data-project-card]')).toHaveCount(6);
  await expect(page.getByRole('link', { name: 'Abrir MaxDeck' })).toHaveAttribute(
    'href',
    'https://caio-csar.github.io/MaxDeck/'
  );
  await expect(page.getByRole('link', { name: 'Consultar Guia' })).toHaveAttribute(
    'href',
    'https://caio-csar.github.io/guia-manager-telas/'
  );
  await expect(page.getByRole('link', { name: 'Ver última versão' })).toHaveAttribute(
    'href',
    'https://github.com/caio-csar/MaxHub-Releases/releases/latest'
  );
  await expect(page.getByRole('link', { name: 'Abrir base nova' })).toHaveAttribute(
    'href',
    'https://notebook.google.com/notebook/86d68261-51e9-4b08-934c-adb2e6ce59ad'
  );
  await expect(page.getByRole('link', { name: 'Abrir base histórica' })).toHaveAttribute(
    'href',
    'https://notebook.google.com/notebook/5c394b0f-8550-4e8c-aef2-895afd612ac9'
  );
  await expect(page.locator('#nexus-command')).toHaveText(
    'irm https://caio-csar.github.io/NEXUS/NEXUS_CORE.ps1 | iex'
  );
});

test('filtra projetos sem diferenciar acentos e informa busca vazia', async ({ page }) => {
  await page.goto('/');

  const search = page.getByRole('searchbox', { name: 'Buscar projeto' });
  await search.fill('automacao');
  await expect(page.locator('[data-project-card]:visible')).toHaveCount(2);
  await expect(page.getByRole('heading', { name: 'MaxDeck' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'NEXUS' })).toBeVisible();

  await search.fill('projeto inexistente');
  await expect(page.locator('[data-project-card]:visible')).toHaveCount(0);
  await expect(page.getByText('Nenhum projeto encontrado para essa busca.')).toBeVisible();
});

test('atalho de busca e cópia do comando funcionam com feedback acessível', async ({ page }) => {
  await page.addInitScript(() => {
    window.__copiedText = '';
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (value) => {
          window.__copiedText = value;
        }
      }
    });
  });
  await page.goto('/');

  await page.keyboard.press('/');
  await expect(page.getByRole('searchbox', { name: 'Buscar projeto' })).toBeFocused();

  await page.getByRole('button', { name: 'Copiar comando' }).click();
  await expect(page.getByRole('button', { name: /Comando copiado/ })).toBeVisible();
  await expect(page.locator('#copy-status')).toHaveText('Comando copiado.');
  await expect.poll(() => page.evaluate(() => window.__copiedText)).toBe(
    'irm https://caio-csar.github.io/NEXUS/NEXUS_CORE.ps1 | iex'
  );
});

test('mantém o conteúdo dentro da largura da viewport', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
