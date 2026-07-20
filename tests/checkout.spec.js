
import { test } from '@playwright/test';
import CheckoutPage from '../pages/CheckoutPage';
import { gerarDadosCheckout } from '../utils/gerarDados';

test.describe('Testes de Checkout', () => {
    let checkoutPage;

    test.beforeEach(async ({ page }) => {
        checkoutPage = new CheckoutPage(page);
        await checkoutPage.acessarCheckout();
    });

    test('Checkout deve carregar com sucesso', async () => {
        await checkoutPage.validarAcessoPaginaCheckout();
    });

    test('Deve realizar pedido com sucesso', async () => {
        const dadosCheckout = gerarDadosCheckout();

        await checkoutPage.preencherFirstName(dadosCheckout.firstName);
        await checkoutPage.preencherLastName(dadosCheckout.lastName);
        await checkoutPage.preencherCompany(dadosCheckout.company);
        await checkoutPage.preencherEmail(dadosCheckout.email);

        await checkoutPage.selecionarCountry(dadosCheckout.country);
        await checkoutPage.selecionarCity(dadosCheckout.city);

        await checkoutPage.preencherZipCode(dadosCheckout.zipCode);
        await checkoutPage.preencherFullAddress(
            dadosCheckout.fullAddress
        );

        await checkoutPage.preencherAdditionalNotes(
            dadosCheckout.additionalNotes
        );

        await checkoutPage.marcarSalvarDados();
        await checkoutPage.clicarSalvar();

        await checkoutPage.selecionarMetodoPagamento(
            'directBankTransfer'
        );

        await checkoutPage.validarSelecaoMetodoPagamento(
            'directBankTransfer'
        );

        await checkoutPage.placeOrder();
        await checkoutPage.validarPedidoSucesso();
    });
});