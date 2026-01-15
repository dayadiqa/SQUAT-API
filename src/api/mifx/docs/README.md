# API Testing Guide (Playwright)

This document explains how to set up the project and run the API tests using Playwright.

---

## Prerequisites

- Node.js (LTS recommended)
- npm
- Git

---

## 1. Clone Repository and Install Dependencies

Clone the repository and install all required npm packages:

```bash
git clone <repository-url>
cd <repository-folder>
npm install
```

## 2. Add `.env` File
Create a `.env` file in the root directory of the project.

Example:

```env
ENV=https://reqres.in
REQRES_API_KEY=your_reqres_api_key_here
```
## 3. Environment Configuration
Make sure the following environment variables are properly set in the `.env` file:

### Base URL

- The Reqres base URL must be set to:

```arduino
https://reqres.in
```
- Stored in the environment variable:

```nginx
ENV
```
### Reqres API Key

- Ensure the interviewer/tester already has a valid Reqres API key.
- Input the API key into the `.env` file using:

```nginx
REQRES_API_KEY
```
## 4. Run the Tests

Execute the API tests using Playwright with the following command:

```bash
npx playwright test --project=api --grep "@mifx"
```

This command will:
- Run only the `api` project
- Execute tests tagged with `@mifx`

### Notes
- Ensure the `.env` file is not committed to version control.
- Verify that the API key is valid before running the tests.
- If tests fail due to authentication issues, recheck the `.env` configuration.

## Done
You are now ready to run the API tests 🚀