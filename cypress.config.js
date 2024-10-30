const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/integration/**.cy.js',
    baseUrl: 'http://localhost:3000',
  },
})