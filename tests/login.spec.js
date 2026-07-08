// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.automationpratice.com.br/');
    await page.getByRole('link', { name: ' Login' }).click();
});

test('Login com sucesso', async ({ page }) => {

    await page.locator('#user').fill('user@example.com');
    await page.locator('#password').fill('password123');
    await page.getByRole('button', { name: 'login' }).click();
    await expect(page.getByRole('heading', { name: 'Login realizado' })).toBeVisible();

});

test('Login com senha inválida', async ({ page }) => {

    await page.locator('#user').fill('user@example.com');
    await page.locator('#password').fill('12345');
    await page.getByRole('button', { name: 'login' }).click();
    await expect(page.getByText('Senha inválida.')).toBeVisible();

});

test('Login com email inválido', async ({ page }) => {

    await page.locator('#user').fill('12345');
    await page.locator('#password').fill('password123');
    await page.getByRole('button', { name: 'login' }).click();
    await expect(page.getByText('E-mail inválido.')).toBeVisible();

});

test('Login com senha e email vazios', async ({ page }) => {

    await page.locator('#user').fill('');
    await page.locator('#password').fill('');
    await page.getByRole('button', { name: 'login' }).click();
    await expect(page.getByText('E-mail inválido.')).toBeVisible();
});