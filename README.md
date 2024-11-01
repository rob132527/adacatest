# Selenium and Playwright Test Suite

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run tests using:
   - `npx mocha test/testSuite.js` for Selenium
   - `node test/playwrightTest.js` for Playwright

## Test Structure
- **Page Object Model** is used for encapsulating page functionalities.
- Tests are structured using Mocha and Chai for assertions.
a.
Page Object Model design pattern for at least one page
b.
Explicit waits for dynamic elements
c.
Screenshot capture on test failure
d.
Generate a simple console log of the test results.
e.
custom utility function in JavaScript that can be used in both Selenium and Playwright tests.

## Assumptions
- The sample web application is accessible and functional.
- Proper WebDriver and browser versions are installed.


