import { test, expect } from '@playwright/test'
import { loadHomepage, assertTitle } from '../helpers'

test.describe('My first test suite', () => {
    test("Simple basic test", async ({ page }) => {
        await page.goto("https://www.example.com")
        const pageTitle = await page.locator("h1")
        await expect(pageTitle).toContainText("Domain")
    })
    
    test("Clicking on elements", async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/")
        await page.click("#signin_button")
        await page.click("text=Sign in")
        const errorMessage = await page.locator(".alert.alert-error")
        await expect(errorMessage).toContainText("Login and/or password are wrong.")
    })
    
    test("Working with inputs", async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/")
        await page.click("#signin_button")
        await page.fill("#user_login", "some username")
        await page.fill("#user_password", "some password")
        await page.click("text=Sign in")
        const errorMessage = await page.locator(".alert.alert-error")
        await expect(errorMessage).toContainText("Login and/or password are wrong.")
    })
    
    test("Assertions test", {
        tag: '@report',
      }, async ({ page }) => {
        await page.goto("https://www.example.com")
        await expect(page).toHaveURL("https://www.example.com")
        await expect(page).toHaveTitle("Example Domain")
        const element = await page.locator("h1")
        await expect(element).toBeVisible()
        await expect(element).toHaveText("Example Domain")
        await expect(element).toHaveCount(1)
        const nonExistingElement = await page.locator("h5")
        await expect(nonExistingElement).not.toBeVisible()
    })

    test.describe('Hooks', () => {
        test.beforeEach( async ({ page }) => {
            await page.goto("https://www.example.com")
        })
        test("Screenshots", async ({ page }) => {
            await page.screenshot({ path: "screenshot.png", fullPage: true})
        })
    
        test("Single element screenshot", async ({ page }) => {
            const element = await page.$("h1")
            await element.screenshot({ path: "single_element_screenshot.png"})
        })
    })

    test.only("Custom Helpers", async ({ page }) => {
        await loadHomepage(page)
        await page.pause() // for debugging
        await assertTitle(page)
    })
})