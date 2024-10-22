import { test, expect } from '@playwright/test'

test.describe.parallel('Feedback Form', () => {
    //Before Hook
    test.beforeEach( async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/")
        await page.click("#feedback")
    })

    //Reset feedback form
    test("Reset feedback form", async ({ page }) => {
        await page.fill("#name", "Maribel")
        await page.fill("#email", "maribel@mari.com")
        await page.fill("#subject", "Test")
        await page.fill("#comment", "This is an automation e2e test")
        await page.click("input[name='clear']")

        const nameInput = await page.locator("#name")
        const commentInput = await page.locator("#comment")
        await expect(nameInput).toBeEmpty()
        await expect(commentInput).toBeEmpty()
    })
    
    //Submit feedback form
    test("Submit feedback form", async ({ page }) => {
        await page.fill("#name", "Maribel")
        await page.fill("#email", "maribel@mari.com")
        await page.fill("#subject", "Test")
        await page.fill("#comment", "This is an automation e2e test")
        await page.click("input[type='submit']")

        //const feedbackTitle = await page.locator("#feedback-title")
        //await expect(feedbackTitle).toBeVisible()
        await page.waitForSelector("#feedback-title")
    })
    
    
    
})