import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel('Login - Logout Flow', () => {
    //Page Objects
    let loginPage, homePage

    //Before Hook
    test.beforeEach( async ({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        await homePage.visit()
    })

    //Negative scenario
    test("Negative scenario for login", async ({ page }) => {
        await homePage.clickOnSignInButton()
        await loginPage.login("some user", "some password")
        await loginPage.wait(3000)
        await loginPage.assertErrorMessage("Login and/or password are wrong.")
    })
    
    //Positive scenario
    test("Positive scenario for login", async ({ page, browserName }) => {
        test.fixme(browserName=='chromium', 'Fixme example: Feature is not stable, needs revision')
        await homePage.clickOnSignInButton()
        await loginPage.login("username", "password")

        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
        const transferFundsTab = await page.locator("#transfer_funds_tab")
        await expect(transferFundsTab).toBeVisible()

        await page.goto("http://zero.webappsecurity.com/logout.html")
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")
    })
    
    
    
})