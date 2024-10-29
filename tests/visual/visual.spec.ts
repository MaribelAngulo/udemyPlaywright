import { test, expect } from '@playwright/test'

test.describe.parallel('Visual Regression Testing Example', () => {
    test('Full Page Snapshot', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
        expect(await page.screenshot()).toMatchSnapshot('homepage.png')
    })

    test('Single Element Snapshot', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
        const pageElement = await page.$('#account_activity_link')
        expect(await pageElement.screenshot()).toMatchSnapshot('accountActivity.png')
    })
})