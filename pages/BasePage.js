import { expect } from '@playwright/test';
/**
 * ============================================================================
 * BasePage
 * ============================================================================
 * Esta classe representa a base para todas as Pages do projeto.
 *
 * Ela centraliza comportamentos comuns que podem ser reutilizados por outras
 * páginas da aplicação, evitando duplicação de código.
 *
 * Neste primeiro momento, ela armazena apenas o objeto "page" do Playwright.
 *
 * Vantagens:
 * ✔ Evita repetição de código
 * ✔ Facilita manutenção
 * ✔ Cria um padrão para todas as Pages
 * ✔ Permite evoluir o projeto de forma organizada
 * ============================================================================
 */

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async acessar(url) {
        await this.page.goto(url);
    }

    /**
     * Valida a URL atual da página.
     *
     * @param {string|RegExp} url URL esperada ou expressão regular.
     */
    async validarUrl(url) {
        await expect(this.page).toHaveURL(url);
    }
}

export default BasePage;