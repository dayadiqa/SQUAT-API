# SQUAT-API

**SQUAT-API** is an API testing repository built with **Playwright** for automated backend validation. This project provides structured and scalable test suites to ensure the quality and correctness of API endpoints.

---

## 🚀 Features

* 🧪 API testing with Playwright
* 🤖 Automated backend validation
* 📁 Organized test structure
* 📦 Supports TypeScript & JavaScript
* ⚙️ Configurable test runner and environment

---

## 📦 Requirements

Before installing, make sure you have:

* **Node.js** (>=14.x)
* **npm** (>=6.x) or **yarn / pnpm**

---

## 📥 Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/dayadiqa/SQUAT-API.git
cd SQUAT-API
npm install
```

Or using **yarn**:

```bash
yarn install
```

---

## 🧪 Running Tests

Run all API tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test path/to/testfile.spec.ts
```

---

## ⚙️ Configuration

Playwright configuration is managed via:

```
playwright.config.ts
```

You can configure:

* Base URL
* Test timeout
* Reporters
* Environment variables

---

## 🏗️ Project Structure

```
.
├── .github/                  # GitHub workflows
├── src/                      # Source files
├── tests/                    # Test suites
│   └── api/
│       └── dummyJson/        # Sample API tests
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project metadata & scripts
├── tsconfig.json             # TypeScript configuration
├── .gitignore
└── README.md
```

---

## 📌 Scripts

Available npm scripts:

| Script                | Description                      |
| --------------------- | -------------------------------- |
| `npm test`            | Run all Playwright tests         |
| `npm run test:report` | Run tests with report generation |
| `npm run clean`       | Clean test artifacts             |

---

## 📈 Test Report

To view HTML report after test execution:

```bash
npx playwright show-report
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

Please ensure all tests pass before submitting.

---

## 📜 License

This project is open-source. See the license file for more details.

---

## 🧠 Notes

This repository focuses on API automation testing. It can be extended for performance testing, contract testing, or integration testing as needed.
