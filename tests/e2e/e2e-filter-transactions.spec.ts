import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { NavBar } from '../../page-objects/components/NavBar'

test.describe('Filter Transactions', () => {
    let homePage : HomePage
    let loginPage : LoginPage
    let navBar : NavBar

    //Before Hook
    test.beforeEach( async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navBar = new NavBar(page)
        await homePage.visit()
        await homePage.clickOnSignInButton()
        await loginPage.login("username", "password")
        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
        await navBar.clickOnTab("Account Activity")
    })
    
    test("Filter Transactions", async ({ page }) => {
        await page.selectOption("#aa_accountId", "2")
        const checkingAccountRows = await page.locator("#all_transactions_for_account tbody tr")
        await expect(checkingAccountRows).toHaveCount(3)

        await page.selectOption("#aa_accountId", "4")
        const loanAccountRows = await page.locator("#all_transactions_for_account tbody tr")
        await expect(loanAccountRows).toHaveCount(2)

        await page.selectOption("#aa_accountId", "6")
        const noResultsMessage = await page.locator(".well")
        await expect(noResultsMessage).toContainText("No results.")
    })    
})