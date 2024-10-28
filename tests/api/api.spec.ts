import { test, expect, request } from '@playwright/test'

test.describe.parallel('API Testing', () => {
    const baseUrl = "https://reqres.in/api/"

    test('Simple API Test - Assert Response Status', async ({ request }) => {
        const response = await request.get(`${baseUrl}users/1`)
        expect(response.status()).toBe(200)
        
        const responseBody = JSON.parse(await response.text())
        //console.log(responseBody)
    })

    test('Simple API Test - Assert Invalid Endpoint', async ({ request }) => {
        const response = await request.get(`${baseUrl}users/1wrf`)
        expect(response.status()).toBe(404)
    })

    test('GET Request - Get User Detail', async ({ request }) => {
        const response = await request.get(`${baseUrl}users/1`)
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)  
        expect(responseBody.data.email).toBeTruthy()
        expect(responseBody.data.first_name).toBe('George')
        expect(responseBody.data.last_name).toBe('Bluth')
        //console.log('responseBody.data')
        //console.log(responseBody)
    })

    test('POST Request - Create New User', async ({ request }) => {
        const response = await request.post(`${baseUrl}users`, {
            data: {
                id:1000,
            },
        })
        const responseBody = JSON.parse(await response.text())        
        expect(responseBody.id).toBe(1000) 
        expect(responseBody.createdAt).toBeTruthy() 
        //console.log('responseBody')
        //console.log(responseBody)
    })

    test('POST Request - Login', async ({ request }) => {
        const response = await request.post(`${baseUrl}login`, {
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka",
            },
        })
        const responseBody = JSON.parse(await response.text())        
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()  
        //console.log('responseBody')
        //console.log(responseBody)
    })

    test('POST Request - Login Fail', async ({ request }) => {
        const response = await request.post(`${baseUrl}login`, {
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

    test('PUT Request - Update User', async ({ request }) => {
        const response = await request.put(`${baseUrl}users/2`, {
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

    test('PUT Request - Delete User', async ({ request }) => {
        const idDelete = "2"
        const response = await request.delete(`${baseUrl}users/${idDelete}`)
        expect(response.status()).toBe(204)
    })
})