import { type Page } from '@playwright/test'

export class AbstractPage {
    //Selectors
    readonly page: Page

    //Constructors
    constructor (page: Page) {
        this.page = page
    }

    //Methods
    async wait(time) {
        await this.page.waitForTimeout(time)
    }
}