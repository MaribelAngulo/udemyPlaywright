import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Search Result', () => {
    let homePage: HomePage

    //Before Hook
    test.beforeEach( async ({ page }) => {
        homePage = new HomePage(page)
        await homePage.visit()
    })

    test("should find search results", async ({ page }) => {
        await homePage.searchFor("bank")

        const numberOfLinks= await page.locator("li > a")
        await expect(numberOfLinks).toHaveCount(2)
    })
})