import { expect } from '@playwright/test';
import BasePage from './BasePage';

/**
 * ============================================================================
 * HomePage
 * ============================================================================
 * Esta classe representa a tela inicial da aplicação.
 *
 * Utilizamos o padrão Page Object Model (POM), centralizando os elementos,
 * ações e validações da Home em um único arquivo.
 *
 * Vantagens:
 * ✔ Testes mais limpos
 * ✔ Reutilização de ações da Home
 * ✔ Fácil manutenção dos seletores
 * ============================================================================
 */

class HomePage extends BasePage {
    constructor(page) {
        super(page);

        this.linkLogin = page.getByRole('link', { name: ' Login' });
        this.linkCadastro = page.locator('a[href="/register"]');
        this.menuHome = page.getByRole('link', { name: 'Home' });
        this.menuShop = page.getByRole('link', { name: 'Shop' });
    }

    /**
     * Acessa a tela inicial da aplicação.
     */
    async acessarHome() {
        await this.acessar('https://www.automationpratice.com.br/');
    }

    async clicarLogin() {
        await this.linkLogin.click();
    }

    async clicarCadastro() {
        await this.linkCadastro.click();
    }

    async clicarMenuHome() {
        await this.menuHome.click();
    }

    async clicarMenuShop() {
        await this.menuShop.click();
    }

    /**
 * Valida se a Home foi carregada corretamente.
 */
    async validarHomeCarregada() {
        await this.validarUrl('https://www.automationpratice.com.br/');
        await expect(this.linkLogin).toBeVisible();
    }
}

export default HomePage;