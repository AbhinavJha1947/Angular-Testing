import { LoginPage } from '../support/page-objects/login.page';

describe('Login Flow (Page Object Model)', () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
        loginPage.visit();
    });

    it('should display login form', () => {
        loginPage
            .usernameInputShouldBeVisible()
            .passwordInputShouldBeVisible()
            .shouldHaveDisabledSubmitButton();
    });

    it('should show error on invalid credentials', () => {
        loginPage
            .login('wrong', 'wrong')
            .shouldShowMessage('Invalid Credentials');
    });

    it('should login successfully with correct credentials', () => {
        loginPage
            .login('admin', '1234')
            .shouldShowMessage('Login Successful!');
    });

    it('should enable submit button when both fields are filled', () => {
        loginPage
            .fillUsername('test')
            .fillPassword('test')
            .shouldHaveEnabledSubmitButton();
    });
});
