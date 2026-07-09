import { test } from '@playwright/test';
import HomePage from '../pages/HomePage';

test.describe('Testes da Home', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.acessarHome();
    });

    test('Home deve carregar com sucesso', async () => {
        await homePage.validarHomeCarregada();
    });

    test('Deve navegar para a tela de Login', async () => {
        await homePage.clicarLogin();

        await homePage.validarUrl(/login/);
    });

    test('Deve navegar para a tela de Cadastro', async () => {
        await homePage.clicarCadastro();

        await homePage.validarUrl(/register/);
    });
});