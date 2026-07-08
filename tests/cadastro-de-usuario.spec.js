// // @ts-check
// import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//     await page.goto('https://www.automationpratice.com.br/register');
// });

// test('Cadastro com sucesso', async ({ page }) => {

//     await page.locator('#user').fill('Bruno QA');
//     await page.locator('#email').fill('bruno.qa@example.com');
//     await page.locator('#password').fill('senha123');
//     await page.getByRole('button', { name: 'Cadastrar' }).click();

//     await expect(page.getByRole('heading', { name: 'Cadastro realizado!' })).toBeVisible();
//     await expect(page).toHaveURL(/\/my-account/);
// });

// test('Cadastro sem preencher o nome', async ({ page }) => {

//     await page.locator('#user').fill('');
//     await page.locator('#email').fill('bruno.qa@example.com');
//     await page.locator('#password').fill('senha123');
//     await page.getByRole('button', { name: 'Cadastrar' }).click();

//     await expect(page.getByText('O campo nome deve ser prenchido')).toBeVisible();
// });

// test('Cadastro com e-mail em formato inválido', async ({ page }) => {

//     await page.locator('#user').fill('Bruno QA');
//     await page.locator('#email').fill('email-invalido');
//     await page.locator('#password').fill('senha123');
//     await page.getByRole('button', { name: 'Cadastrar' }).click();

//     await expect(page.getByText('O campo e-mail deve ser prenchido corretamente')).toBeVisible();
// });

// test('Cadastro com senha menor que 6 dígitos', async ({ page }) => {

//     await page.locator('#user').fill('Bruno QA');
//     await page.locator('#email').fill('bruno.qa@example.com');
//     await page.locator('#password').fill('');
//     await page.getByRole('button', { name: 'Cadastrar' }).click();

//     await expect(page.getByText('O campo senha deve ter pelo menos 6 dígitos')).toBeVisible();
// });

import { test } from '@playwright/test';
import CadastroPage from '../pages/CadastroPage';

test.describe('Testes de Cadastro de Usuário', () => {
    let cadastroPage;

    test.beforeEach(async ({ page }) => {
        cadastroPage = new CadastroPage(page);
        await cadastroPage.acessarCadastro();
    });

    test('Cadastro com sucesso', async () => {
        await cadastroPage.cadastrarUsuario(
            'Bruno QA',
            'bruno.qa@example.com',
            'senha123'
        );

        await cadastroPage.validarCadastroSucesso();
    });

    test('Cadastro sem preencher o nome', async () => {
        await cadastroPage.cadastrarUsuario(
            '',
            'bruno.qa@example.com',
            'senha123'
        );

        await cadastroPage.validarNomeObrigatorio();
    });

    test('Cadastro com e-mail em formato inválido', async () => {
        await cadastroPage.cadastrarUsuario(
            'Bruno QA',
            'email-invalido',
            'senha123'
        );

        await cadastroPage.validarEmailInvalido();
    });

    test('Cadastro com senha menor que 6 dígitos', async () => {
        await cadastroPage.cadastrarUsuario(
            'Bruno QA',
            'bruno.qa@example.com',
            ''
        );

        await cadastroPage.validarSenhaInvalida();
    });
});