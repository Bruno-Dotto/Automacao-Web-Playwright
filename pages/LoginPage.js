class LoginPage {
    constructor(page) {
        this.page = page;

        this.campoEmail = page.locator('#user');
        this.campoSenha = page.locator('#password');
        this.botaoLogin = page.getByRole('button', { name: 'login' });

        this.mensagemLoginSucesso = page.getByRole('heading', { name: 'Login realizado' });
        this.mensagemEmailInvalido = page.getByText('E-mail inválido.');
        this.mensagemSenhaInvalida = page.getByText('Senha inválida.');
    }

    async acessarLogin() {
        await this.page.goto('https://www.automationpratice.com.br/');
        await this.page.getByRole('link', { name: ' Login' }).click();
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

    async realizarLogin(email, senha) {
        await this.preencherEmail(email);
        await this.preencherSenha(senha);
        await this.clicarLogin();
    }
}

export default LoginPage;