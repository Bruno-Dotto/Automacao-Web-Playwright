import { faker } from '@faker-js/faker';

/**
 * Gera dados válidos para o cadastro de um usuário.
 *
 * @returns {{
 *   nome: string,
 *   email: string,
 *   senha: string
 * }}
 */
export function gerarDadosUsuario() {
    return {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        senha: faker.internet.password({
            length: 8
        })
    };
}

/**
 * Gera dados válidos para o preenchimento do checkout.
 *
 * @returns {{
 *   firstName: string,
 *   lastName: string,
 *   company: string,
 *   email: string,
 *   country: number,
 *   city: number,
 *   zipCode: string,
 *   fullAddress: string,
 *   additionalNotes: string
 * }}
 */
export function gerarDadosCheckout() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        company: faker.company.name(),
        email: faker.internet.email(),

        // Valores controlados porque representam posições dos selects.
        country: 1,
        city: 2,

        zipCode: faker.string.numeric(8),

        fullAddress: `${faker.location.street()}, ${faker.location.buildingNumber()}`,

        additionalNotes: faker.lorem.sentence()
    };
}