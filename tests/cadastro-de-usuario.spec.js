
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