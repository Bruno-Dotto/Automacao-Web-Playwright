// // @ts-check
// import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//     await page.goto('https://www.automationpratice.com.br/');
//     await page.getByRole('link', { name: ' Login' }).click();
// });

// test('Login com sucesso', async ({ page }) => {

//     await page.locator('#user').fill('user@example.com');
//     await page.locator('#password').fill('password123');
//     await page.getByRole('button', { name: 'login' }).click();
//     await expect(page.getByRole('heading', { name: 'Login realizado' })).toBeVisible();

// });

// test('Login com senha inválida', async ({ page }) => {

//     await page.locator('#user').fill('user@example.com');
//     await page.locator('#password').fill('12345');
//     await page.getByRole('button', { name: 'login' }).click();
//     await expect(page.getByText('Senha inválida.')).toBeVisible();

// });

// test('Login com email inválido', async ({ page }) => {

//     await page.locator('#user').fill('12345');
//     await page.locator('#password').fill('password123');
//     await page.getByRole('button', { name: 'login' }).click();
//     await expect(page.getByText('E-mail inválido.')).toBeVisible();

// });

// test('Login com senha e email vazios', async ({ page }) => {

//     await page.locator('#user').fill('');
//     await page.locator('#password').fill('');
//     await page.getByRole('button', { name: 'login' }).click();
//     await expect(page.getByText('E-mail inválido.')).toBeVisible();
// });


import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test.describe('Testes de Login', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.acessarLogin();
    });

    test('Login com sucesso', async () => {
        await loginPage.realizarLogin('user@example.com', 'password123');
        await expect(loginPage.mensagemLoginSucesso).toBeVisible();
    });

    test('Login com senha inválida', async () => {
        await loginPage.realizarLogin('user@example.com', '12345');
        await expect(loginPage.mensagemSenhaInvalida).toBeVisible();
    });

    test('Login com email inválido', async () => {
        await loginPage.realizarLogin('12345', 'password123');
        await expect(loginPage.mensagemEmailInvalido).toBeVisible();
    });

    test('Login com senha e email vazios', async () => {
        await loginPage.realizarLogin('', '');
        await expect(loginPage.mensagemEmailInvalido).toBeVisible();
    });
});