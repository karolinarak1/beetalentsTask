# UI Automation - Playwright (SauceDemo)

## Requirements covered

The automated tests cover the following scenarios:

* Successful login using `standard_user`
* Failed login using `locked_out_user`
* Add a product to the cart
* Start the checkout process

Target application: https://www.saucedemo.com

---

# Tech decisions

**Playwright Test + Page Object Model (POM)**
Page Object Model is used to separate UI interactions from test logic. Each page contains its locators and actions, improving maintainability and readability.

**Reusable setup logic with fixtures**
A custom Playwright fixture (`tests/fixtures.ts`) provides reusable login functionality (`loginAs`).
This avoids repeating login logic across tests while keeping test files simple.

**Stable selectors**
Selectors use `data-test` attributes with `getByTestId`, which are designed specifically for testing and are less likely to break due to UI changes.

**No hardcoded waits**
The tests rely on Playwright's auto-waiting and explicit `expect` assertions instead of `sleep` or `waitForTimeout`.

---

# Project structure

```
.
├─ src
│  ├─ pages
│  │  ├─ LoginPage.ts
│  │  ├─ InventoryPage.ts
│  │  ├─ CartPage.ts
│  │  └─ CheckoutPage.ts
│  └─ data
│     └─ users.ts
│
├─ tests
│  ├─ fixtures.ts
│  ├─ login.spec.ts
│  └─ checkout.spec.ts
│
├─ playwright.config.ts
├─ package.json
├─ package-lock.json
├─ tsconfig.json
└─ README.md
```

### Folder description

**src/pages**
Page Object Model classes encapsulating UI interactions and locators.

**src/data**
Test data such as user credentials.

**tests**
Test scenarios and reusable fixtures used by the tests.

---

# Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# Running tests

Run all tests:

```bash
npx playwright test
```

Run tests with browser visible:

```bash
npx playwright test --headed
```

Run tests in Playwright UI mode:

```bash
npx playwright test --ui
```

---

# Running specific tests

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

or

```bash
npx playwright test tests/checkout.spec.ts
```

Run a single test by name:

```bash
npx playwright test -g "Successful login"
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

---

# Viewing the HTML report

After test execution:

```bash
npx playwright show-report
```
