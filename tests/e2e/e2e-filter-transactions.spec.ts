import { test, expect } from '@playwright/test'

test.describe.only('Filter Transactions', () => {
    //Before Hook
    test.beforeEach( async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/")
        await page.click("#signin_button")
        await page.fill("#user_login", "username")
        await page.fill("#user_password", "password")
        await page.click("text=Sign in")
        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
        //await page.keyboard.press("Esc")
        const accountActivityTab = await page.locator("#account_activity_tab")
        await expect(accountActivityTab).toBeVisible()
        await page.click("#account_activity_tab")
    })
    
    test("Transfer funds", async ({ page }) => {
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