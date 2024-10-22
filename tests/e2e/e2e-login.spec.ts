import { test, expect } from '@playwright/test'

test.describe.parallel('Login - Logout Flow', () => {
    //Before Hook
    test.beforeEach( async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/")
    })

    //Negative scenario
    test("Negative scenario for login", async ({ page }) => {
        await page.click("#signin_button")
        await page.fill("#user_login", "some username")
        await page.fill("#user_password", "some password")
        await page.click("text=Sign in")

        const errorMessage = await page.locator(".alert-error")
        await expect(errorMessage).toContainText("Login and/or password are wrong.")
    })
    
    //Positive scenario
    test("Positive scenario for login", async ({ page }) => {
        await page.click("#signin_button")
        await page.fill("#user_login", "username")
        await page.fill("#user_password", "password")
        await page.click("text=Sign in")

        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
        const transferFundsTab = await page.locator("#transfer_funds_tab")
        await expect(transferFundsTab).toBeVisible()

        await page.goto("http://zero.webappsecurity.com/logout.html")
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")
    })
    
    
    
})