# 🛒 WebDriverIO E-commerce Test Automation

A **scalable and modular** automation framework built for **Amazon.in** workflows using **WebDriverIO v8**, **TypeScript**, and **Cucumber BDD**.  
Designed to test key user journeys like product search, filtering, and add-to-cart with clean, maintainable code and reusable components.

---

## 🚀 Features

- ✅ Modern browser automation with **WebDriverIO v8**
- ✅ **Cucumber BDD** with **Gherkin** syntax
- ✅ **TypeScript** for type safety and better maintainability
- ✅ Modular **Page Object Model (POM)** structure
- ✅ Integrated **Allure Reporting**
- ✅ Multi-browser support (Chrome, Firefox, etc.)
- ✅ Compatible with **CI/CD pipelines**

---

## 🛠️ Quickstart

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project folder
cd wdio-ecom-assignment

# Install dependencies
npm install

# Run the test suite
npm run wdio
```

## ✅ Scenarios Covered

- Product search (e.g., “smartwatches”)
- Brand and price filtering
- Sorting by price (High to Low)
- Selecting the highest-priced product
- Adding product to cart and verifying cart contents



## 📊 Reporting

This project uses Allure Reports for test result visualization.

```bash
# Generate and open Allure report
npm run allure-report
```

## 📦 Tech Stack

- WebDriverIO v8 – Automation framework
- TypeScript – Strongly typed JavaScript
- Cucumber – BDD framework using Gherkin syntax
- Allure Reporter – Test result reporting
- Node.js – Runtime environment