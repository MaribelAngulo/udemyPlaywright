import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel.only('Search Result', () => {
    let homePage: HomePage

    //Before Hook
    test.beforeEach( async ({ page }) => {
        homePage = new HomePage(page)
        await homePage.visit()
    })

    test("should find search results", async ({ page, browserName }, testInfo) => {
        test.skip(browserName=='chromium', 'Skip Browser example: Feature not ready from chrome browser')
        await homePage.searchFor("bank")

        const numberOfLinks= await page.locator("li > a")
        await expect(numberOfLinks).toHaveCount(2)

        //console.log(testInfo.expectedStatus)
    })

    const people = ['Maribel', 'Cris', 'Romi', 'Nico']
    for (const name of people){
        test(`Running test for ${name}`, async ({ page }) => {
            await homePage.searchFor(name)
        })
    }
    
})