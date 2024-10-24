import { expect, type Locator, type Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
    //Selectors
    //private readonly page: Page
    private readonly usernameInput: Locator
    private readonly passwordInput: Locator
    private readonly submitButton: Locator
    private readonly errorMessageLabel: Locator
    private readonly loginForm: Locator

    //Constructors
    constructor (page: Page) {
        //this.page = page
        super(page)
        this.usernameInput = page.locator("#user_login")
        this.passwordInput = page.locator("#user_password")
        this.submitButton = page.locator("text=Sign in")
        this.errorMessageLabel = page.locator(".alert-error")
        this.loginForm = page.locator("#login_form")
    }

    //Methods
    async login(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
    }

    async assertErrorMessage(error: string) {
        await expect(this.errorMessageLabel).toContainText(error)
    }

    async snapshotLoginForm() {
        await expect(await this.loginForm.screenshot()).toMatchSnapshot('login-form.png')
    }

    async snapshotErrorMessage() {
        await expect(await this.errorMessageLabel.screenshot()).toMatchSnapshot('login-error.png')
    }
}