# Test Suite Structure - Page Object Model (POM)

This test suite follows the **Page Object Model (POM)** design pattern, which is a best practice for organizing Playwright tests. POM separates test logic from page interactions, making tests more maintainable, readable, and reusable.

## Directory Structure

```
tests/
├── api/                          # API helper classes (API POM)
│   ├── BaseAPI.ts               # Base class for API helpers
│   ├── UserAPI.ts               # User API operations
│   └── ProductsAPI.ts           # Products API operations
├── api-tests/                    # API test files
│   ├── user.api.spec.ts         # User API tests
│   └── products.api.spec.ts     # Products API tests
├── pages/                        # Page Object classes (UI POM)
│   ├── BasePage.ts              # Base class for all pages
│   ├── HomePage.ts              # Home page object
│   └── ProductsPage.ts          # Products page object
├── ui/                           # UI test files
│   └── home.spec.ts             # Home page UI tests
├── helpers/                      # Utility helpers
│   └── user.helper.ts           # User creation helpers
├── example.spec.ts              # Original tests (kept for reference)
└── README.md                    # This file
```

## Key Concepts

### 1. Page Objects (UI)
Page Objects represent web pages and encapsulate page-specific elements and actions.

**Benefits:**
- Centralized element locators
- Reusable page actions
- Easy maintenance (change locator in one place)
- Better readability

**Example:**
```typescript
// pages/HomePage.ts
export class HomePage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'AutomationExercise' });
  }

  async navigate() {
    await this.goto('/');
  }
}
```

**Usage in tests:**
```typescript
// ui/home.spec.ts
test('should display correct page title', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await expect(homePage.heading).toBeVisible();
});
```

### 2. API Objects (API POM)
API Objects encapsulate API endpoints and operations, following the same pattern as Page Objects.

**Benefits:**
- Centralized API endpoints
- Reusable API operations
- Type-safe responses
- Easy to maintain

**Example:**
```typescript
// api/UserAPI.ts
export class UserAPI extends BaseAPI {
  async createUser(userData: UserData = {}): Promise<CreateUserResponse> {
    const response = await this.request.post('/api/createAccount', {
      form: userData
    });
    return await this.parseResponse(response);
  }
}
```

**Usage in tests:**
```typescript
// api-tests/user.api.spec.ts
test('should create user', async ({ request }) => {
  const userAPI = new UserAPI(request);
  const response = await userAPI.createUser();
  expect(response.responseCode).toBe(201);
});
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test directory
```bash
# Run only UI tests
npx playwright test tests/ui

# Run only API tests
npx playwright test tests/api-tests
```

### Run specific test file
```bash
npx playwright test tests/ui/home.spec.ts
npx playwright test tests/api-tests/user.api.spec.ts
```

### Run tests with UI mode
```bash
npx playwright test --ui
```

## CI/CD & Test Reports

### GitHub Actions
This project uses GitHub Actions to automatically run tests on every push and pull request to the `main` or `master` branches.

### Viewing Test Reports
After tests run in CI/CD, HTML reports are automatically published to GitHub Pages:

**Report URL Format:**
```
https://ripun008.github.io/playwright-automation/reports/<run-number>/
```

**Finding the run number:**
1. Go to the **Actions** tab in your GitHub repository
2. Click on a workflow run
3. The run number is displayed in the URL and workflow title (e.g., "Playwright Tests #42")

**Example:**
- Run #1: `https://ripun008.github.io/playwright-automation/reports/1/`
- Run #42: `https://ripun008.github.io/playwright-automation/reports/42/`

**Note:** Reports are kept from all previous runs, so you can compare results over time.

### Accessing Reports Locally
After running tests locally, you can view the HTML report:
```bash
npx playwright show-report
```

## Best Practices Implemented

### 1. **Separation of Concerns**
- Page Objects: UI elements and interactions
- API Objects: API endpoints and operations
- Test Files: Test logic and assertions
- Helpers: Reusable utilities

### 2. **DRY (Don't Repeat Yourself)**
- Common page actions in BasePage
- Common API methods in BaseAPI
- Reusable helpers for data generation

### 3. **Type Safety**
- TypeScript interfaces for all responses
- Strongly typed method parameters
- IntelliSense support

### 4. **Maintainability**
- Change locators in one place (Page Objects)
- Change API endpoints in one place (API Objects)
- Easy to add new pages/APIs

### 5. **Readability**
- Descriptive method names
- Clear test structure
- Self-documenting code

## Migration from Old Structure

Your original tests from `example.spec.ts` have been refactored into:

| Original Test | New Location | Pattern Used |
|--------------|--------------|--------------|
| UI Tests (has title, get started link) | `ui/home.spec.ts` | Page Objects |
| Products API Tests | `api-tests/products.api.spec.ts` | API Objects |
| User API Tests | `api-tests/user.api.spec.ts` | API Objects |

## Adding New Tests

### Adding a new Page Object:
1. Create a new file in `tests/pages/`
2. Extend `BasePage`
3. Define locators and methods
4. Use in your test files

### Adding a new API Object:
1. Create a new file in `tests/api/`
2. Extend `BaseAPI`
3. Define endpoints and methods
4. Use in your test files

### Example - Adding a LoginPage:
```typescript
// tests/pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

## Additional Resources

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Test Organization](https://playwright.dev/docs/test-organization)
