import { test, expect, request } from '@playwright/test'

test.describe.parallel('API Testing', () => {
    const baseUrl = "https://reqres.in/api/"

    test('Simple API Test - Assert Response Status', async ({ request }) => {
        const response = await request.get(`${baseUrl}users/2`)
        expect(response.status()).toBe(200)
        
        const responseBody = JSON.parse(await response.text())
        //console.log(responseBody)
    })

    test('Simple API Test - Assert Invalid Endpoint', async ({ request }) => {
        const baseUrl = "https://academybugs.com/"
        const response = await request.get(`${baseUrl}store/dnk-yellow-shoe/`)
        expect(response.status()).toBe(404)
    })

    test('GET Request - Get User Detail', async ({ request }) => {
        const response = await request.get(`${baseUrl}users/2`)
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(2)  
        expect(responseBody.data.email).toBeTruthy()
        expect(responseBody.data.first_name).toBe('Janet')
        expect(responseBody.data.last_name).toBe('Weaver')
        //console.log('responseBody.data')
        //console.log(responseBody)
    })

    test('POST Request - Create New User', async ({ playwright }) => {
        const apiContext = await playwright.request.newContext({
            extraHTTPHeaders: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json',
            },
        });
        const response = await apiContext.post(`${baseUrl}users`, {
            data: {
                id: 1000
            },
        })
        const responseBody = JSON.parse(await response.text())        
        expect(responseBody.id).toBe(1000) 
        expect(responseBody.createdAt).toBeTruthy() 
        //console.log('responseBody')
        //console.log(responseBody)
    })

    test('POST Request - Login', async ({ playwright }) => {
        const apiContext = await playwright.request.newContext({
            extraHTTPHeaders: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json',
            },
        });
        const response = await apiContext.post(`${baseUrl}login`, {
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',
            },
        });
        expect(response.ok()).toBeTruthy(); // Verifica código 200
        const responseBody = await response.json();
        expect(responseBody.token).toBeDefined(); // Verifica que viene un token
        //console.log('Token recibido:', responseBody.token);
    });

    test('POST Request - Login Fail', async ({ playwright }) => {
        const apiContext = await playwright.request.newContext({
            extraHTTPHeaders: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json',
            },
        });
        const response = await apiContext.post(`${baseUrl}login`, {
            data: {
                email: "peter@klaven",
            },
        })
        const responseBody = JSON.parse(await response.text())        
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBeTruthy() 
        expect(responseBody.error).toBe('Missing password') 
        //console.log('responseBody')
        //console.log(responseBody)
    })

    test('PUT Request - Update User', async ({ playwright }) => {
        const apiContext = await playwright.request.newContext({
            extraHTTPHeaders: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json',
            },
        });
        const response = await apiContext.put(`${baseUrl}users/2`, {
            data: {
                name: "Ariel",
                job: "Princess"
            },
        })
        const responseBody = JSON.parse(await response.text())        
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe('Ariel') 
        expect(responseBody.job).toBe('Princess') 
        expect(responseBody.updatedAt).toBeTruthy() 
        //console.log('responseBody')
        //console.log(responseBody)
    })

    test('PUT Request - Delete User', async ({ playwright }) => {
        const apiContext = await playwright.request.newContext({
            extraHTTPHeaders: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json',
            },
        });
        const idDelete = "2"
        const response = await apiContext.delete(`${baseUrl}users/${idDelete}`)
        expect(response.status()).toBe(204)
    })
})