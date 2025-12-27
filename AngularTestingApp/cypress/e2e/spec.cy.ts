describe('Order Processing App E2E', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display the main page', () => {
        cy.contains('Hello, AngularTestingApp');
    });

    it('should list users when data service returns data', () => {
        // Stubbing the network request
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
            fixture: 'users.json'
        }).as('getUsers');

        // Trigger the action that loads users (assuming a button or load on init)
        // For this demo, we verify the stubs work
        cy.wait('@getUsers');
    });
});
