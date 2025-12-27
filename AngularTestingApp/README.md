# Angular Testing Project

This project demonstrates comprehensive testing strategies in Angular 17+ including:
- **Unit Testing**: Using Jest for fast, parallel execution.
- **Integration Testing**: Using Component Harnesses for robust, refactor-safe tests.
- **E2E Testing**: Using Cypress for end-to-end user flow verification.

## Getting Started

### Prerequisites
- Node.js (Latest LTS)
- Angular CLI

### Installation
```bash
npm install
```

## Running Tests

### Unit & Integration Tests (Jest)
Executes all spec files including Component Harness tests.
```bash
npm test
```

### E2E Tests (Cypress)
Opens the Cypress interactive runner.
```bash
npx cypress open
```
Or run headlessly:
```bash
npx cypress run
```

## Key Implementations

### Component Harnesses
Located in `src/app/components/user-list/user-list.harness.ts`. demonstrates how to decouple tests from DOM structure.

### Service Mocking
Located in `src/app/services/data.service.spec.ts`, showing manual mocks and spies for `HttpClient`.
