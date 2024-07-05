describe('Hacker Stories', () => {

  beforeEach(() => {
    cy.intercept('GET', 'https://hn.algolia.com/api/v1/search?query=React&page=0').as('getStories');
    cy.visit('/');
    cy.wait('@getStories');


  });


  it('Shows the footer', () => {
    cy.get('footer')
      .should('be.visible')
      .and('contain', 'Icons made by Freepik from www.flaticon.com');
  });

  // context('Verificando o campo de pesquisar', () => {

  //   it('search word', () => {
  //     cy.get('input#search')
  //       .should('be.visible')
  //       .clear()
  //       .type('golang');//pesquisa por golang

  //   });

  //   it('click the search button', () => {

  //     cy.get('button[type="submit"]')
  //       .should('be.visible')
  //       .should('not.be.disabled')
  //       .click();
  //     cy.wait('@getStories');
  //   });
  // });

  context('List of stories', () => {

    it('lists 20 items after initial load', () => {
      cy.intercept('GET', 'https://hn.algolia.com/api/v1/search?query=React&page=1').as('getNextStories');
      cy.get('.item').should('have.length', 20);

      cy.contains('More').click();
      cy.wait('@getNextStories');
      cy.get('.item').should('have.length', 40);
    });

    it('shows only nineteen stories after dismissing the first story', () => {
      cy.get('.button-small')
        .first()
        .click();

      cy.get('.item').should('have.length', 19);
    });

  });

  context('Search', () => {

    const initialTerm = 'React'
    const newTerm = 'Cypress'

    beforeEach(() => {
      cy.intercept(
        'GET', `https://hn.algolia.com/api/v1/search?query=${newTerm}&page=0`
      ).as('getNewTermStories')
      cy.get('#search')
        .clear()
    })
    it('types and hits ENTER', () => {
      cy.get('#search')
        .type(`${newTerm}{enter}`)//'{enter}'simula a pressão da tecla ENTER após digitar o texto.
      cy.wait('@getNewTermStories')

    });



  })
});
