# Angular Testing Masterclass 🚀

> **Target Audience:** Senior Developers, Tech Leads, and Architects.

This repository demonstrates enterprise-grade testing patterns in Angular. It is split into two main sections:
1.  **[📘 Interview Questions & Deep Dive](Interview-Questions.md)**: A comprehensive Q&A guide for interview prep.
2.  **Codebase**: A reference Angular project with 100% test coverage examples.

---

## 🏗️ Types of Testing in Angular

Angular applications typically follow a standard testing pyramid. Here is how they compare to the .NET ecosystem:

| Testing Level | Purpose | Scope | .NET Analogy |
| :--- | :--- | :--- | :--- |
| **Unit Testing** | Test logic in isolation | Class / Function | xUnit / NUnit |
| **Component Testing** | Test UI + Logic integration | Component + Template | MVC Controller + View Integration |
| **E2E Testing** | Test full user flows | Real Browser | Selenium / Playwright |

---

## 🛠️ Tools & Ecosystem

### 🔹 Default Stack (Legacy)
*   **Jasmine**: Testing Framework (`describe`, `it`, `expect`).
*   **Karma**: Test Runner (launches a real browser).
*   **TestBed**: Angular's official Dependency Injection & Testing Environment.

### 🔹 Modern Enterprise Stack (Recommended)
*   **Jest**: ⚡ Zero-config, parallel execution, snapshot testing. (Replaces Karma + Jasmine).
*   **Cypress / Playwright**: 🦅 Fast, reliable E2E testing. (Replaces Protractor).

---

## 📚 Key Topics Covered

This repository and the **[Interview Guide](Interview-Questions.md)** cover the following core concepts:

1.  **Unit Testing**: Services, Pipes, Directives.
2.  **Component Testing**: Shallow vs Deep rendering.
3.  **E2E Testing**: Page Object Model (POM) patterns.
4.  **Integration Testing**: HTTP calls, State Management.
5.  **Mocking**: Strategies for mocking Dependencies (`HttpClient`, Services).
6.  **Service Testing**: Testing Business Logic and RxJS Observables.

---

### 🔗 Ready to dive deep?
👉 **[Go to Angular Testing Interview Questions](Interview-Questions.md)**
