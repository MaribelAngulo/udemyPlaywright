import { test, expect, request } from '@playwright/test'

test.describe.parallel('API Testing', () => {
    const baseUrl = "https://jsonplaceholder.typicode.com/"

    test('Simple API Test - Assert Response Status', async ({ request }) => {
        const response = await request.get(`${baseUrl}posts/1`)
        expect(response.status()).toBe(200)
        
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
    })

    test('Simple API Test - Assert Invalid Endpoint', async ({ request }) => {
        const response = await request.get(`${baseUrl}posts/1wrf`)
        expect(response.status()).toBe(404)
    })

    test.only('GET Request - Get User Detail', async ({ request }) => {
        const response = await request.get(`${baseUrl}posts/1`)
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        // expect(responseBody.data.id).toBe(1)
        // expect(responseBody.data.userId).toBe(1)
        expect(responseBody.data.body).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
        
        console.log(responseBody)
    })
})