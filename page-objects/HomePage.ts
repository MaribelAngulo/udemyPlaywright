import { type Locator, type Page } from '@playwright/test'

export class HomePage {
    //Selectors
    private readonly page: Page
    private readonly submitButton: Locator
    private readonly searchInput: Locator
    private readonly feedbackButton: Locator

    //Constructors
    constructor (page: Page) {
        this.page = page
        this.submitButton = page.locator("#signin_button")
        this.searchInput = page.locator("#searchTerm")
        this.feedbackButton = page.locator("#feedback")
    }

    //Methods
    async visit() {
        await this.page.goto("http://zero.webappsecurity.com/")
    }

    async clickOnSignInButton() {
        await this.submitButton.click()
    }

    async searchFor(phrase: string) {
        await this.searchInput.fill(phrase)
        await this.page.waitForTimeout(3000)
        await this.page.keyboard.press("Enter")
    }

    async clickOnFeedbackButton() {
        await this.feedbackButton.click()
    }
}