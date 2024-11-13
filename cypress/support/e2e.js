// cypress/support/e2e.js

// Example of setting up custom commands or configurations
Cypress.Commands.add('login', (username, password) => {
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

// Setup global configuration
beforeEach(() => {
    cy.visit('http://localhost:3000'); // Відкриває стартову сторінку перед кожним тестом
});
