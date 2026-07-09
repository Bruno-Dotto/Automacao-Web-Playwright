import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test.describe('Testes de Login', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.acessarLogin();
    });

    test('Login com sucesso', async () => {
        await loginPage.realizarLogin('user@example.com', 'password123');
        await loginPage.validarLoginSucesso();
    });

    test('Login com senha inválida', async () => {
        await loginPage.realizarLogin('user@example.com', '12345');
        await loginPage.validarSenhaInvalida();
    });

    test('Login com email inválido', async () => {
        await loginPage.realizarLogin('12345', 'password123');
        await loginPage.validarEmailInvalido();
    });

    test('Login com senha e email vazios', async () => {
        await loginPage.realizarLogin('', '');
        await loginPage.validarEmailInvalido();
    });
});