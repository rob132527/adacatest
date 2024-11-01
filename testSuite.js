const { Builder, By, until } = require('selenium-webdriver');
const chai = require('chai');
const LoginPage = require('./pageObjects/LoginPage.js');
const manipulateUsername = require('./utils.js');

const { expect } = chai;
let driver;

before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
});

after(async () => {
    await driver.quit();
});

// Load test data from JSON file
const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'testData.json'), 'utf-8'));

describe('To-Do App Tests', () => {
    let testResults = []; // Array to store test results

    const logResult = (testName, result, errorMessage = '') => {
        if (result) {
            console.log(`✅ ${testName}: Passed`);
        } else {
            console.log(`❌ ${testName}: Failed - ${errorMessage}`);
        }
        testResults.push({ testName, result, errorMessage });
    };

    testData.forEach(({ username, password }) => {
        it(`should login successfully with username and password: ${username} ${password}`, async () => {
            const loginPage = new LoginPage(driver);
            await driver.get('http://your-todo-app-url.com');

        try {
            const username = manipulateUsername(username);
            const password = password;
            await loginPage.login(username, password);
            // Wait for the dashboard to load
            await driver.wait(until.urlIs('http://your-todo-app-url.com/dashboard'), 5000);
            // Validate successful login
            expect(await driver.getCurrentUrl()).to.equal('http://your-todo-app-url.com/dashboard');
            logResult('Login Test', true);
        } catch (error) {
            console.error('Login Test Failed:', error);
            const screenshot = await driver.takeScreenshot();
            require('fs').writeFileSync('screenshot-login-failure.png', screenshot, 'base64');
            logResult('Login Test', false, error.message);
            throw error;  // Rethrow the error after logging
        }
    });
});

    it('should add a to-do item', async () => {
        try {
            // Wait for the add item button to be clickable
            const addItemButton = await driver.wait(until.elementLocated(By.id('add-item-button')), 5000);
            await addItemButton.click();

            // Fill in the to-do item
            const todoInput = await driver.wait(until.elementLocated(By.id('todo-input')), 5000);
            await todoInput.sendKeys('New To-Do Item');

            // Submit the new item
            const submitButton = await driver.wait(until.elementLocated(By.id('submit-button')), 5000);
            await submitButton.click();

            // Validate that the item was added
            const addedItem = await driver.wait(until.elementLocated(By.xpath("//li[contains(text(), 'New To-Do Item')]")), 5000);
            expect(await addedItem.getText()).to.equal('New To-Do Item');
            logResult('Add To-Do Item Test', true);
        } catch (error) {
            console.error('Add To-Do Item Test Failed:', error);
            const screenshot = await driver.takeScreenshot();
            require('fs').writeFileSync('screenshot-add-item-failure.png', screenshot, 'base64');
            logResult('Add To-Do Item Test', false, error.message);
            throw error;
        }
    });

    it('should delete a to-do item', async () => {
        try {
            // Wait for the delete button of the first to-do item
            const deleteButton = await driver.wait(until.elementLocated(By.xpath("//li[contains(text(), 'New To-Do Item')]//button[@class='delete']")), 5000);
            await deleteButton.click();

            // Wait for confirmation
            const confirmButton = await driver.wait(until.elementLocated(By.id('confirm-delete')), 5000);
            await confirmButton.click();

            // Validate that the item was deleted
            const isItemPresent = await driver.findElements(By.xpath("//li[contains(text(), 'New To-Do Item')]"));
            expect(isItemPresent.length).to.equal(0);
            logResult('Delete To-Do Item Test', true);
        } catch (error) {
            console.error('Delete To-Do Item Test Failed:', error);
            const screenshot = await driver.takeScreenshot();
            require('fs').writeFileSync('screenshot-delete-item-failure.png', screenshot, 'base64');
            logResult('Delete To-Do Item Test', false, error.message);
            throw error;
        }
    });

    after(async () => {
        console.log('\nTest Results:');
        testResults.forEach(({ testName, result, errorMessage }) => {
            if (!result) {
                console.log(`❌ ${testName}: Failed - ${errorMessage}`);
            } else {
                console.log(`✅ ${testName}: Passed`);
            }
        });
        await driver.quit();
    });
});
