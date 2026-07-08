import { expect } from '@playwright/test';

/**
 * ============================================================================
 * LoginPage
 * ============================================================================
 * Esta classe representa a tela de Login da aplicação.
 *
 * Utilizamos o padrão Page Object Model (POM), onde toda a lógica da tela fica
 * centralizada em um único arquivo.
 *
 * Vantagens:
 * ✔ Código organizado
 * ✔ Reutilização
 * ✔ Fácil manutenção
 * ✔ Testes mais limpos
 * ============================================================================
 */

class LoginPage {
    constructor(page) {
        this.page = page;

        this.campoEmail = page.locator('#user');
        this.campoSenha = page.locator('#password');
        this.botaoLogin = page.getByRole('button', { name: 'login' });

        this.mensagemLoginSucesso = page.getByRole('heading', {
            name: 'Login realizado'
        });

        this.mensagemEmailInvalido = page.getByText('E-mail inválido.');
        this.mensagemSenhaInvalida = page.getByText('Senha inválida.');
    }

    /**
     * Acessa a tela de Login da aplicação.
     */
    async acessarLogin() {
        await this.page.goto('https://www.automationpratice.com.br/');

        await this.page
            .getByRole('link', { name: ' Login' })
            .click();
    }

    async preencherEmail(email) {
        await this.campoEmail.fill(email);
    }

    async preencherSenha(senha) {
        await this.campoSenha.fill(senha);
    }

    async clicarLogin() {
        await this.botaoLogin.click();
    }

    /**
     * Realiza o login do usuário.
     *
     * @param {string} email E-mail do usuário.
     * @param {string} senha Senha do usuário.
     */
    async realizarLogin(email, senha) {
        await this.preencherEmail(email);
        await this.preencherSenha(senha);
        await this.clicarLogin();
    }

    /**
     * Valida a mensagem de login realizado com sucesso.
     */
    async validarLoginSucesso() {
        await expect(this.mensagemLoginSucesso).toBeVisible();
    }

    /**
     * Valida a mensagem de e-mail inválido.
     */
    async validarEmailInvalido() {
        await expect(this.mensagemEmailInvalido).toBeVisible();
    }

    /**
     * Valida a mensagem de senha inválida.
     */
    async validarSenhaInvalida() {
        await expect(this.mensagemSenhaInvalida).toBeVisible();
    }
}

export default LoginPage;