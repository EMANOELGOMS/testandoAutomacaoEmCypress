import 'cypress-localstorage-commands'

Cypress.Commands.add('loading', () => {
  cy.contains('Loading ...').should('be.visible')
  cy.contains('Loading ...').should('not.exist')
})