import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe.parallel('Feedback Form', () => {
    let homePage : HomePage
    let feedbackPage: FeedbackPage

    //Before Hook
    test.beforeEach( async ({ page }) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)
        await homePage.visit()
        await homePage.clickOnFeedbackButton()
    })

    //Reset feedback form
    test("Reset feedback form", async ({ page }) => {
        await feedbackPage.fillFormat("Maribel", "maribel@mari.com", "Test", "This is an automation e2e test")
        await feedbackPage.clickOnClearButton()
        await feedbackPage.assertEmptyForm()
    })
    
    //Submit feedback form
    test("Submit feedback form", async ({ page }) => {
        await feedbackPage.fillFormat("Maribel", "maribel@mari.com", "Test", "This is an automation e2e test")
        await feedbackPage.clickOnSubmitButton()
        await feedbackPage.assertFeedbackTitle()
    })    
})