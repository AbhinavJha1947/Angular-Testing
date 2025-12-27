/**
 * Page Object Model for Login Page
 * Encapsulates all selectors and actions for the login page
 */
export class LoginPage {
    // Selectors
    private selectors = {
        usernameInput: '[data-cy=username]',
        passwordInput: '[data-cy=password]',
        submitButton: '[data-cy=submit-btn]',
        message: '[data-cy=message]'
    };

    // Navigation
    visit(): void {
        cy.visit('/login');
    }

    // Actions
    fillUsername(username: string): this {
        cy.get(this.selectors.usernameInput).clear().type(username);
        return this;
    }

    fillPassword(password: string): this {
        cy.get(this.selectors.passwordInput).clear().type(password);
        return this;
    }

    clickSubmit(): this {
        cy.get(this.selectors.submitButton).click();
        return this;
    }

    login(username: string, password: string): this {
        this.fillUsername(username)
            .fillPassword(password)
            .clickSubmit();
        return this;
    }

    // Assertions
    shouldShowMessage(expectedMessage: string): this {
        cy.get(this.selectors.message).should('contain', expectedMessage);
        return this;
    }

    shouldHaveDisabledSubmitButton(): this {
        cy.get(this.selectors.submitButton).should('be.disabled');
        return this;
    }

    shouldHaveEnabledSubmitButton(): this {
        cy.get(this.selectors.submitButton).should('not.be.disabled');
        return this;
    }

    usernameInputShouldBeVisible(): this {
        cy.get(this.selectors.usernameInput).should('be.visible');
        return this;
    }

    passwordInputShouldBeVisible(): this {
        cy.get(this.selectors.passwordInput).should('be.visible');
        return this;
    }
}
