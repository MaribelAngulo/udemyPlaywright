import { expect, type Locator, type Page } from '@playwright/test'

export class FeedbackPage {
    //Selectors
    private readonly page: Page
    private readonly nameInput: Locator
    private readonly emailInput: Locator
    private readonly subjectInput: Locator
    private readonly commentTextarea: Locator
    private readonly clearInput: Locator
    private readonly feedbackTitle: Locator
    private readonly submitButton: Locator

    //Constructors
    constructor (page: Page) {
        this.page = page
        this.nameInput = page.locator("#name")
        this.emailInput = page.locator("#email")
        this.subjectInput = page.locator("#subject")
        this.commentTextarea = page.locator("#comment")
        this.clearInput = page.locator("input[name='clear']")
        this.feedbackTitle = page.locator("#feedback-title")
        this.submitButton = page.locator("input[name='submit']")
    }

    //Methods
    async fillFormat(name: string, email: string, subject: string, comment: string) {
        await this.nameInput.fill(name)
        await this.emailInput.fill(email)
        await this.subjectInput.fill(subject)
        await this.commentTextarea.fill(comment)
    }

    async clickOnClearButton() {
        await this.clearInput.click()
    }

    async assertEmptyForm() {
        await expect(this.nameInput).toBeEmpty()
        await expect(this.emailInput).toBeEmpty()
        await expect(this.subjectInput).toBeEmpty()
        await expect(this.commentTextarea).toBeEmpty()
    }

    async clickOnSubmitButton() {
        await this.submitButton.click()
    }

    async assertFeedbackTitle() {
        await expect(this.feedbackTitle).toBeVisible()
        await expect(this.feedbackTitle).toContainText("Feedback")
    }
}