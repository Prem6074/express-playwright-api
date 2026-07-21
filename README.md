# Playwright API Automation Framework

A backend API automation framework built using Node.js, Express.js, MongoDB, Playwright, and GitHub Actions.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Playwright
- GitHub Actions
- JWT Authentication

## Features

- User Registration API
- User Login API
- JWT Authentication
- Protected APIs
- Playwright API Automation
- HTML Reports
- CI/CD with GitHub Actions
- Environment Variables

## Project Structure

```
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/

tests/
├── api/
├── fixtures/
├── helpers/

.github/
└── workflows/
```

## Installation

```bash
git clone https://github.com/Prem6074/playwright-api-framework.git
cd playwright-api-framework
npm install
```

## Configure Environment

Create a `.env` file.

```env
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=playwrightsecret
BASE_URL=http://127.0.0.1:3000
EMAIL=admin@test.com
PASSWORD=password123
```

## Run Server

```bash
npm start
```

## Run Playwright Tests

```bash
npx playwright test
```

## View HTML Report

```bash
npx playwright show-report
```

## Author

**Prem Vardhan**

GitHub: https://github.com/Prem6074