import { test, expect } from '@playwright/test'
import { loadHomepage, assertTitle } from '../helpers'
import { getRandomNumber, getRandomString } from '../utils/data-helpers'

test.describe.parallel('My first test suite', () => {
    test("Simple basic test", async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/")
        const pageTitle = await page.locator("a.brand")
        await expect(pageTitle).toContainText("Zero Bank")

        let number = await getRandomNumber()
        let newString = await getRandomString(20)
        console.log(number)
        console.log(newString)
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
        await page.goto("http://zero.webappsecurity.com/")
        await expect(page).toHaveURL("http://zero.webappsecurity.com/")
        await expect(page).toHaveTitle("Zero - Personal Banking - Loans - Credit Cards")
        const element = await page.locator("a.brand")
        await expect(element).toBeVisible()
        await expect(element).toHaveText("Zero Bank")
        await expect(element).toHaveCount(1)
        const nonExistingElement = await page.locator("h5")
        await expect(nonExistingElement).not.toBeVisible()
    })

    /* test('Hooks', () => {
        test.beforeEach( async ({ page }) => {
            await page.goto("http://zero.webappsecurity.com/")
        })

        test("Screenshots", async ({ page }) => {
            await page.screenshot({ path: "screenshot.png", fullPage: true})
        })
    
        test("Single element screenshot", async ({ page }) => {
            const element = await page.$("a.brand")
            await element.screenshot({ path: "single_element_screenshot.png"})
        })
    }) */

    test("Custom Helpers", async ({ page }) => {
        await loadHomepage(page)
        //await page.pause() // for debugging
        await assertTitle(page)
    })
})