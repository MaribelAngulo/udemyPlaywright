import { test } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel('Login Page Visual Tests', () => {
    let loginPage : LoginPage
    let homePage : HomePage

    //Before Hook
    test.beforeEach( async ({ page }) => {
        homePage = new HomePage(page)        
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignInButton()
    })
    
    test("Login Form", async ({ page }) => {
        await loginPage.snapshotLoginForm()
    })    

    test("Login Error Message", async ({ page }) => {
        await loginPage.login('useri', 'passi')
        await loginPage.snapshotErrorMessage()
    }) 
})