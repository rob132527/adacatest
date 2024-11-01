const { chromium } = require('playwright');
const manipulateUsername = require('./utils.js');


(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const username = manipulateUsername('testuser');
    const password = 'password123';

    await page.goto('http://your-todo-app-url.com');
    
    // Example: Interacting with a form element
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('#login');
    
    await browser.close();
})();
