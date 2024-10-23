import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { NavBar } from '../../page-objects/components/NavBar'

test.describe('Transfer funds and Make Payments', () => {
    let loginPage : LoginPage
    let homePage : HomePage
    let navBar : NavBar

    //Before Hook
    test.beforeEach( async ({ page }) => {
        homePage = new HomePage(page)
        await homePage.visit()
        await homePage.clickOnSignInButton()
        loginPage = new LoginPage(page)
        await loginPage.login("username", "password")
        
        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
        navBar = new NavBar(page)
        await navBar.clickOnTab("Transfer Funds")

    })
    
    test("Transfer funds", async ({ page }) => {
        await page.selectOption("#tf_fromAccountId", "2")
        await page.selectOption("#tf_toAccountId", "3")
        await page.fill("#tf_amount", "500")
        await page.fill("#tf_description", "Invest")
        await page.click("#btn_submit")

        const boardHeader = await page.locator("h2.board-header")
        await expect(boardHeader).toContainText("Verify")
        await page.click("#btn_submit")

        const message = await page.locator(".alert-success")
        await expect(message).toContainText("You successfully submitted your transaction")
    })    
})