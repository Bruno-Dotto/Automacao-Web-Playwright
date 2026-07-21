// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração do Playwright
 * https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Pasta onde estão os testes
  testDir: './tests',

  // Executa os arquivos de teste em paralelo
  fullyParallel: true,

  // Impede que testes marcados com test.only sejam enviados para a CI
  forbidOnly: !!process.env.CI,

  // Reexecuta testes apenas na pipeline
  retries: process.env.CI ? 2 : 0,

  // Utiliza apenas 1 worker na CI para maior estabilidade
  workers: process.env.CI ? 1 : undefined,

  // Relatório HTML
  reporter: 'html',

  // Diretório onde serão armazenadas as evidências dos testes
  outputDir: 'test-results',

  // Configurações compartilhadas entre todos os projetos
  use: {
    // Captura screenshot apenas quando houver falha
    screenshot: 'only-on-failure',

    // Mantém vídeo apenas quando houver falha
    video: 'retain-on-failure',

    // Mantém o trace apenas quando houver falha
    trace: 'retain-on-failure',

    // Tempo máximo para cada ação
    actionTimeout: 10000,

    // Tempo máximo para navegação entre páginas
    navigationTimeout: 30000,
  },

  // Configuração dos navegadores
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],

  // Exemplo para iniciar uma aplicação local antes dos testes
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
