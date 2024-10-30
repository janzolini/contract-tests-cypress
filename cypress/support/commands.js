Cypress.Commands.add('validateSchema', (responseBody, schema) => {
    const Ajv = require('ajv');
    const ajv = new Ajv({ allErrors: true, useDefaults: true, coerceTypes: true });

    // Valida se o esquema fornecido é válido
    if (!ajv.validateSchema(schema)) {
        const schemaErrors = ajv.errors.map(error => `Path: ${error.instancePath} - Error: ${error.message}`).join('\n');
        throw new Error(`O esquema é inválido:\n${schemaErrors}`);
    }

    // Compila o esquema e valida o corpo da resposta
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);

    // Se houver erros na validação, lança uma exceção com os detalhes
    if (!valid) {
        const dataErrors = validate.errors.map(error => `Path: ${error.instancePath} - Error: ${error.message}`).join('\n');
        throw new Error(`Validação dos dados falhou:\n${dataErrors}`);
    }

    // Espera que a validação tenha sido bem-sucedida
    expect(valid).to.be.true;
});