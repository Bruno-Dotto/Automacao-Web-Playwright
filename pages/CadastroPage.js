import { expect } from '@playwright/test';
import BasePage from './BasePage';
/**
 * ============================================================================
 * CadastroPage
 * ============================================================================
 * Esta classe representa a tela de Cadastro de usuário da aplicação.
 *
 * Utilizamos o padrão Page Object Model (POM), centralizando os elementos,
 * ações e validações da tela em um único arquivo.
 *
 * Vantagens:
 * ✔ Testes mais limpos
 * ✔ Menos duplicação de código
 * ✔ Fácil manutenção dos seletores
 * ============================================================================
 */

class CadastroPage extends BasePage {
    constructor(page) {
        super(page);

        this.campoNome = page.locator('#user');
        this.campoEmail = page.locator('#email');
        this.campoSenha = page.locator('#password');
        this.botaoCadastrar = page.getByRole('button', { name: 'Cadastrar' });

        this.mensagemCadastroSucesso = page.getByRole('heading', {
            name: 'Cadastro realizado!'
        });

        this.mensagemNomeObrigatorio = page.getByText('O campo nome deve ser prenchido');
        this.mensagemEmailInvalido = page.getByText('O campo e-mail deve ser prenchido corretamente');
        this.mensagemSenhaInvalida = page.getByText('O campo senha deve ter pelo menos 6 dígitos');
    }

    /**
     * Acessa a tela de Cadastro.
     */
    async acessarCadastro() {
        await this.acessar('https://www.automationpratice.com.br/register');
    }

    async preencherNome(nome) {
        await this.campoNome.fill(nome);
    }

    async preencherEmail(email) {
        await this.campoEmail.fill(email);
    }

    async preencherSenha(senha) {
        await this.campoSenha.fill(senha);
    }

    async clicarCadastrar() {
        await this.botaoCadastrar.click();
    }

    /**
     * Realiza o cadastro do usuário.
     *
     * @param {string} nome Nome do usuário.
     * @param {string} email E-mail do usuário.
     * @param {string} senha Senha do usuário.
     */
    async cadastrarUsuario(nome, email, senha) {
        await this.preencherNome(nome);
        await this.preencherEmail(email);
        await this.preencherSenha(senha);
        await this.clicarCadastrar();
    }

    /**
     * Valida cadastro realizado com sucesso.
     */
    async validarCadastroSucesso() {
        await expect(this.mensagemCadastroSucesso).toBeVisible();
        await this.validarUrl(/\/my-account/);
    }

    /**
     * Valida mensagem de nome obrigatório.
     */
    async validarNomeObrigatorio() {
        await expect(this.mensagemNomeObrigatorio).toBeVisible();
    }

    /**
     * Valida mensagem de e-mail inválido.
     */
    async validarEmailInvalido() {
        await expect(this.mensagemEmailInvalido).toBeVisible();
    }

    /**
     * Valida mensagem de senha inválida.
     */
    async validarSenhaInvalida() {
        await expect(this.mensagemSenhaInvalida).toBeVisible();
    }
}

export default CadastroPage;