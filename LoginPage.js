const { By, until } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameField = By.id('username');
        this.passwordField = By.id('password');
        this.loginButton = By.id('login');
    }

    async login(username, password) {
        await this.driver.wait(until.elementLocated(this.usernameField), 5000);
        await this.driver.findElement(this.usernameField).sendKeys(username);
        await this.driver.findElement(this.passwordField).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }
}

module.exports = LoginPage;
