import { expect, type Locator, type Page } from '@playwright/test'

export class NavBar {
    //Selectors
    private readonly page: Page
    private readonly accountActivityTab: Locator
    private readonly transferFundsTab: Locator

    //Constructors
    constructor (page: Page) {
        this.page = page
        this.accountActivityTab = page.locator("#account_activity_tab")
        this.transferFundsTab = page.locator("#transfer_funds_tab")
    }

    //Methods
    async clickOnTab(tab: string) {
        switch(tab){
            case "Account Activity":
                await this.accountActivityTab.click()
                break
            case "Transfer Funds":
                await this.transferFundsTab.click()
                break
            default:
                throw new Error("This tab does not exist..")
        }
    }
}