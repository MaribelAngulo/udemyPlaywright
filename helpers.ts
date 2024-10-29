export async function loadHomepage(page) {
    await page.goto("http://zero.webappsecurity.com/")    
}

export async function assertTitle(page) {
    await page.waitForSelector("a.brand")
}