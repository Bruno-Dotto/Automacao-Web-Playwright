import { expect } from '@playwright/test';
import BasePage from './BasePage';

/**
 * ============================================================================
 * CheckoutPage
 * ============================================================================
 * Esta classe representa a tela de Checkout da aplicação.
 *
 * Utilizamos o padrão Page Object Model (POM), centralizando os elementos,
 * ações, fluxos e validações da tela de Checkout em um único arquivo.
 *
 * Vantagens:
 * ✔ Testes mais limpos
 * ✔ Reutilização das ações do Checkout
 * ✔ Fácil manutenção dos seletores
 * ✔ Separação entre teste e implementação da página
 * ============================================================================
 */

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);

        this.campoFirstName = page.locator('#fname');
        this.campoLastName = page.locator('#lname');
        this.campoCompany = page.locator('#cname');
        this.campoEmail = page.locator('#email');
        this.selectCountry = page.locator('#country');
        this.selectCity = page.locator('#city');
        this.campoZipCode = page.locator('#zip');
        this.campoFullAddress = page.locator('#faddress');
        this.campoAdditionalNotes = page.locator('#messages');
        this.checkboxSalvarDados = page.locator('#materialUnchecked');

        this.botaoSalvar = page.locator(
            '.checkout-area-bg > .theme-btn-one'
        );

        this.botaoPlaceOrder = page.locator(
            ':nth-child(2) > :nth-child(2) > .theme-btn-one'
        );

        this.metodosPagamento = {
            paypal: page.locator('#headingThree'),
            mobileBanking: page.locator('#headingTwo'),
            directBankTransfer: page.locator('#headingOne')
        };

        this.mensagensMetodoPagamento = {
            paypal: {
                locator: page.locator('#collapseThree > .payment_body > p'),
                texto: 'Some placeholder content for the second accordion panel. This panel is hidden by default'
            },

            mobileBanking: {
                locator: page.locator('#collapseTwo > .payment_body > p'),
                texto: 'Direct Mobile Transfer'
            },

            directBankTransfer: {
                locator: page.locator('#collapseOne > .payment_body > p'),
                texto: 'Direct Bank Transfer'
            }
        };

        this.tituloPaginaCheckout = page.locator(
            '.checkout-area-bg > .check-heading > h3'
        );

        this.mensagemPedidoSucesso = page.locator(
            '.offer_modal_left > h3'
        );
    }

    /**
     * Acessa a tela de Checkout.
     */
    async acessarCheckout() {
        await this.acessar(
            'https://www.automationpratice.com.br/checkout-one'
        );
    }

    async preencherFirstName(nome) {
        await this.campoFirstName.fill(nome);
    }

    async preencherLastName(nome) {
        await this.campoLastName.fill(nome);
    }

    async preencherCompany(nome) {
        await this.campoCompany.fill(nome);
    }

    async preencherEmail(email) {
        await this.campoEmail.fill(email);
    }

    async selecionarCountry(indice) {
        await this.selectCountry.selectOption({ index: indice });
    }

    async selecionarCity(indice) {
        await this.selectCity.selectOption({ index: indice });
    }

    async preencherZipCode(zip) {
        await this.campoZipCode.fill(zip);
    }

    async preencherFullAddress(endereco) {
        await this.campoFullAddress.fill(endereco);
    }

    async preencherAdditionalNotes(observacao) {
        await this.campoAdditionalNotes.fill(observacao);
    }

    async marcarSalvarDados() {
        await this.checkboxSalvarDados.check();
    }

    async clicarSalvar() {
        await this.botaoSalvar.click();
    }

    /**
     * Seleciona o método de pagamento informado.
     *
     * @param {'paypal'|'mobileBanking'|'directBankTransfer'} metodo
     * Método de pagamento que será selecionado.
     */
    async selecionarMetodoPagamento(metodo) {
        const metodoPagamento = this.metodosPagamento[metodo];

        if (!metodoPagamento) {
            throw new Error(`Método de pagamento inválido: ${metodo}`);
        }

        await metodoPagamento.click();
    }

    /**
     * Valida o conteúdo exibido para o método de pagamento selecionado.
     *
     * @param {'paypal'|'mobileBanking'|'directBankTransfer'} metodo
     * Método de pagamento que será validado.
     */
    async validarSelecaoMetodoPagamento(metodo) {
        const mensagem = this.mensagensMetodoPagamento[metodo];

        if (!mensagem) {
            throw new Error(
                `Método de pagamento inválido: ${metodo}`
            );
        }

        await expect(mensagem.locator).toBeVisible();
        await expect(mensagem.locator).toContainText(mensagem.texto);
    }

    async placeOrder() {
        await this.botaoPlaceOrder.click();
    }

    /**
     * Valida se a página de Checkout foi carregada.
     */
    async validarAcessoPaginaCheckout() {
        await expect(this.tituloPaginaCheckout).toBeVisible();
        await expect(this.tituloPaginaCheckout).toContainText(
            'Billings Information'
        );
    }

    /**
     * Valida se o pedido foi criado com sucesso.
     */
    async validarPedidoSucesso() {
        await expect(this.mensagemPedidoSucesso).toBeVisible();
        await expect(this.mensagemPedidoSucesso).toContainText(
            'Congrats! Your order was created with sucess!'
        );
    }
}

export default CheckoutPage;