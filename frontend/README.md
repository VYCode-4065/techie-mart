# 🛍️ TechieMart Frontend

> A modern e-commerce frontend built with Next.js, React, TypeScript, and Tailwind CSS. This project provides a polished shopping experience with authentication, product browsing, category-based exploration, and a responsive UI.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [How the App Works](#how-the-app-works)
- [Main Pages & Modules](#main-pages--modules)
- [API Integration](#api-integration)
- [Styling & UI Notes](#styling--ui-notes)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

---

## Overview

TechieMart Frontend is the customer-facing part of the TechieMart platform. It connects to the backend API and offers a smooth experience for users to:

- browse products and categories,
- sign up or log in,
- view a modern landing page,
- interact with product cards and search UI,
- experience a responsive design on desktop and mobile.

This frontend is built using the App Router architecture in Next.js and follows a clean component-based structure.

---

## Key Features

- ✅ Modern landing page and hero section
- ✅ User authentication pages for login and registration
- ✅ Category-based product browsing UI
- ✅ Product cards and reusable UI components
- ✅ Responsive layout with Tailwind CSS
- ✅ Toast notifications for user feedback
- ✅ API hooks for backend communication
- ✅ Clean folder structure for scalable development

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js | Frontend framework and routing |
| React | UI library |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| shadcn/ui style components | Reusable UI building blocks |
| Sonner | Toast notifications |
| Lucide React | Icons |
| Axios | HTTP requests |
| ESLint | Code quality and linting |

---

## Project Structure

```text
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   └── (main)/
│       ├── page.tsx
│       └── category/
├── components/
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── Product.tsx
│   ├── Search.tsx
│   ├── ShoppingCart.tsx
│   └── ui/
├── hooks/
│   ├── useLogin.hooks.ts
│   └── useRegister.hooks.ts
├── lib/
├── public/
├── store/
├── types/
├── package.json
├── tsconfig.json
└── README.md
```

---

## Installation & Setup

### Prerequisites

- Node.js 18 or higher
- pnpm 10 or higher
- A running backend server

### Install dependencies

```bash
cd frontend
pnpm install
```

---

## Environment Configuration

Create a file named `.env.local` in the frontend root folder.

Example:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api/v1
```

### Notes

- `NEXT_PUBLIC_BASE_URL` is used by the frontend hooks to connect to the backend.
- Make sure your backend is already running on the same base URL.

---

## Running the Application

### Development mode

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

### Production build

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

---

## How the App Works

The frontend follows a simple flow:

1. The user opens the app in the browser.
2. The landing page loads the main hero and product experience.
3. Users can navigate to authentication pages to register or log in.
4. Authentication requests are sent to the backend API using fetch-based hooks.
5. The UI responds with success or error messages through toast notifications.

This makes the project easy to extend as the e-commerce experience grows.

---

## Main Pages & Modules

### Home Page

The main landing experience is handled in the app home route and shows the hero and key UI sections.

### Authentication Pages

- Login page: handled in app/(auth)/login
- Register page: handled in app/(auth)/register

These pages include:

- form validation,
- password visibility toggle,
- animated and styled UI,
- API-based authentication flow.

### Product & Category UI

The project includes reusable product and category-related components for displaying products and related sections.

### Shared Components

Common reusable interface pieces such as headers, footers, dropdowns, cards, and search components are stored under the components folder.

---

## API Integration

The frontend communicates with the backend through hooks such as:

- useLogin.hooks.ts for login requests
- useRegister.hooks.ts for registration requests

These hooks send requests to the backend endpoint base URL defined in the environment file.

Example flow:

- user submits login form,
- frontend sends credentials to the backend,
- backend responds with success or failure,
- UI displays the appropriate feedback.

> Make sure the backend is running and accessible before testing the frontend pages.

---

## Styling & UI Notes

The UI uses Tailwind CSS for styling and follows a dark, modern ecommerce theme.

Key design highlights:

- dark background theme,
- teal accent colors,
- rounded cards and modern spacing,
- responsive components for mobile and desktop.

The code structure is also ready for further expansion with more pages such as:

- product detail page,
- cart page,
- checkout page,
- profile page,
- wishlist page.

---

## Deployment

This frontend can be deployed on platforms such as:

- Vercel
- Netlify
- any Node.js-compatible hosting service

For Vercel deployment, the project is already compatible with the standard Next.js deployment flow.

Recommended steps:

1. Set the environment variable for the backend URL.
2. Build the application.
3. Deploy the production build.

---

## Troubleshooting

### Port issues

If the app does not open, check whether port 3000 is already in use.

### Backend connection issues

If login or register fails, verify that:

- the backend server is running,
- the `NEXT_PUBLIC_BASE_URL` value is correct,
- the backend API routes are available.

### Build errors

If a build error appears, run:

```bash
pnpm build
```

and review the reported issue carefully.

---

## Next Steps

The frontend is already structured well for growth. Recommended next improvements include:

- add a full product detail page,
- add a shopping cart flow,
- add checkout and order management,
- add protected routes for authenticated users,
- improve state management for global user and cart data,
- connect more backend endpoints fully.

---

## Quick Start Summary

```bash
cd frontend
pnpm install
cp .env.local.example .env.local
pnpm dev
```

If you want, the next step can be to add a more detailed frontend README with screenshots, architecture diagrams, and a complete feature roadmap.
