import faker from 'faker-br';
import 'cypress-plugin-api'

describe('API Contract Testing', () => {

    it('POST/login - Login validate response schema', () => {
        const userSchema = require('../schemas/login/login-schema.json');

        const requestBody = {
            "email": "fulano@qa.com",
            "password": "teste"
        }

        cy.api({
            method: 'POST',
            url: '/login',
            body: requestBody,
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.validateSchema(response.body, userSchema);
        });
    });

    it('GET/usuarios - Get user validate response schema', () => {
        const userSchema = require('../schemas/usuarios/list-user-schema.json');

        cy.api({
            method: 'GET',
            url: '/usuarios',
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.validateSchema(response.body, userSchema);
        });
    });

    it('POST/usuarios - Create user validate response schema', () => {
        const userSchema = require('../schemas/usuarios/create-user-schema.json');

        const requestBody = {
            "nome": `${faker.name.findName()}`,
            "email": `${faker.internet.email()}`,
            "password": "teste",
            "administrador": "false"
        }

        cy.api({
            method: 'POST',
            url: '/usuarios',
            body: requestBody,
        }).then((response) => {
            expect(response.status).to.eq(201);
            cy.validateSchema(response.body, userSchema);
        });
    });

    it('POST/usuarios - Create error validate response schema', () => {
        const userSchema = require('../schemas/usuarios/create-user-error-schema.json');

        const requestBody = {
            "nome": "Fulano da Silva",
            "email": "beltrano@qa.com.br",
            "password": "teste",
            "administrador": "true"
        };

        cy.api({
            method: 'POST',
            url: '/usuarios',
            body: requestBody,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            cy.validateSchema(response.body, userSchema);  // Mantém a validação do schema
        });
    });

});
