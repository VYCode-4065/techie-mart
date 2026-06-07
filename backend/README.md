# 🛒 Techie Mart - Backend API Documentation

> Professional API documentation for the Techie Mart backend, built with Node.js, Express, TypeScript, Prisma, and PostgreSQL.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Database Schema](#database-schema)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

Techie Mart Backend is a production-ready API for an e-commerce platform. It offers secure user authentication, password reset workflows, seller-managed product operations, and read-only public product browsing.

### Key Features
- ✅ User registration and login with JWT session cookies
- ✅ Password reset via email token
- ✅ Role-based product management for sellers
- ✅ Product image upload through Cloudinary
- ✅ Prisma ORM for PostgreSQL data access
- ✅ Centralized error handling and validation
- ✅ CORS and Helmet security headers enabled

---

## Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| Node.js | Runtime environment | Latest |
| Express.js | Web framework | ^5.2.1 |
| TypeScript | Type safety | ^6.0.2 |
| Prisma ORM | Database access | ^7.7.0 |
| PostgreSQL | Database | Latest |
| JWT | Authentication | ^9.0.3 |
| bcryptjs | Password hashing | ^3.0.3 |
| Nodemailer | Email delivery | ^8.0.7 |
| Cloudinary | Image storage | ^2.10.0 |
| CORS | Cross-origin requests | ^2.8.6 |
| Helmet | Security headers | ^8.1.0 |
| pnpm | Package manager | ^10.33.0 |

---

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── controllers/
│   │   ├── product.controller.ts
│   │   └── user.controller.ts
│   ├── routes/
│   │   ├── product.route.ts
│   │   └── user.route.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── isAuthorize.middleware.ts
│   │   └── upload.middleware.ts
│   ├── helper/
│   │   ├── email.helper.ts
│   │   ├── generateToken.helper.ts
│   │   ├── hashPassword.helper.ts
│   │   ├── product.helper.ts
│   │   └── user.helper.ts
│   ├── lib/
│   │   └── prisma.ts
│   ├── types/
│   │   └── interface.ts
│   └── utils/
│       ├── ApiError.ts
│       ├── ApiResponse.ts
│       └── asyncHandler.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── nodemon.json
└── README.md
```

---

## Installation & Setup

### Prerequisites
- **Node.js** v18 or higher
- **pnpm** v10.33.0 or higher
- **PostgreSQL** database

### Setup Steps

```bash
cd techie-mart/backend
pnpm install
```

Create your `.env` file and configure the environment variables.

Then run:

```bash
pnpm exec prisma migrate dev --name init
pnpm exec prisma generate
```

---

## Environment Configuration

Create a `.env` file with the following values:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/techie_mart
PORT=5000
NODE_ENV=development
JWT_KEY=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRY=24h
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
EMAIL_FROM=your-email@gmail.com
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
FRONTEND_URL=http://localhost:3000
RESET_PASSWORD_URL=http://localhost:3000
CORS_ORIGIN=*
```

### Notes
- Do not commit `.env`.
- Use strong, unique secrets for `JWT_KEY`.
- Cloudinary is required for product image uploads.
- Email settings are used for password reset messages.

---

## Running the Server

### Development

```bash
pnpm dev
```

### Production Build

```bash
pnpm build
```

### Run Production

```bash
pnpm start
```

---

## API Endpoints

### Base URL

`http://localhost:5000/api/v1`

---

## 👤 User Authentication Endpoints

### Register User

**POST** `/user/register`

**Body:**

```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "name": "John Doe",
  "password": "SecurePassword123!",
  "gender": "MALE"
}
```

**Success:** `200`

```json
{
  "message": "User registered successfully !",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe",
    "name": "John Doe",
    "gender": "MALE",
    "role": "USER",
    "created_at": "2026-05-01T10:00:00Z"
  },
  "success": true
}
```

**Errors:** missing fields, duplicate email.

---

### Login User

**POST** `/user/login`

**Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

Or:

```json
{
  "username": "johndoe",
  "password": "SecurePassword123!"
}
```

**Success:** `200`
- Sets `authKey` cookie

**Errors:** missing credentials, invalid credentials.

---

### Logout User

**GET** `/user/logout`

**Requires:** `authKey` cookie.

**Success:** `200`

**Errors:** unauthorized when cookie is absent or invalid.

---

## 🔑 Password Management

### Forgot Password

**POST** `/user/forgot-password`

**Body:**

```json
{
  "email": "user@example.com"
}
```

**Success:** `200`
- Sends reset link to the user email.

**Errors:** email missing or not found.

---

### Verify Reset Token

**GET** `/user/reset-password/verify/:token`

**Success:** `200`

```json
{
  "message": "Reset token is valid.",
  "data": { "email": "user@example.com" },
  "success": true
}
```

**Errors:** invalid or expired token.

---

### Reset Password

**POST** `/user/reset-password`

**Body:**

```json
{
  "token": "abc123def456...",
  "newPassword": "NewSecurePassword123!"
}
```

**Success:** `200`

**Errors:** missing token/password, invalid token.

---

### Update User Profile

**PUT** `/user/update`

**Requires:** `authKey` cookie.

**Body:** any of the following:

```json
{
  "email": "newemail@example.com",
  "name": "Jane Doe",
  "gender": "FEMALE"
}
```

**Success:** `200`

**Errors:** invalid data, email already in use.

---

### Get All Users

**GET** `/user`

**Success:** `200`

**Errors:** no users found.

---

### Get User by ID

**GET** `/user/:id`

**Success:** `200`

**Errors:** user not found.

---

## 🛍️ Product Endpoints

### Add Product

**POST** `/product/add`

**Requires:** `authKey` cookie

**Role:** `SELLER`

**Content-Type:** `multipart/form-data`

**Fields:**
- `category` (String)
- `subCategory` (String)
- `name` (String)
- `price` (Number)
- `description` (String)
- `stock` (Number)
- `discount` (Number, optional)
- `sellerId` (Number)
- `keyword` (String or comma-separated values)
- `rating` (Number, optional, 0-5)
- `images` (file array, max 3 files)

**Success:** `201`

**Errors:** missing fields, invalid values, seller not found.

---

### Update Product

**PUT** `/product/update/:id`

**Requires:** `authKey` cookie

**Role:** `SELLER`

**Body:** any updatable product fields.

**Success:** `200`

**Errors:** invalid ID, product not found.

---

### Update Product Stock

**PUT** `/product/stock/:id`

**Requires:** `authKey` cookie

**Role:** `SELLER`

**Body:**

```json
{
  "stock": 10
}
```

**Success:** `200`

**Errors:** missing stock, invalid stock, not enough inventory.

---

### Get Product by ID

**GET** `/product/:id`

**Success:** `200`

**Errors:** product not found.

---

### Get Products by Category

**GET** `/product/category/:category`

**Success:** `200`

**Errors:** no products found for category.

---

### Search Products

**GET** `/product/search?q=searchQuery`

**Success:** `200`

**Errors:** invalid query or no results.

---

### Delete Product

**DELETE** `/product/delete/:productId`

**Requires:** `authKey` cookie

**Role:** `SELLER`

**Success:** `200`

**Errors:** product not found.

---

## Authentication

Protected routes use the `auth` middleware and a JWT stored in the `authKey` cookie.

### Protected Routes
- `GET /user/logout`
- `PUT /user/update`
- `POST /product/add`
- `PUT /product/update/:id`
- `PUT /product/stock/:id`
- `DELETE /product/delete/:productId`

### Cookie Policy
- `HttpOnly: true`
- `Secure: true`
- `SameSite: strict`

---

## Response Format

### Success

```json
{
  "message": "Description",
  "data": {},
  "success": true
}
```

### Error

```json
{
  "message": "Error details",
  "data": null,
  "success": false
}
```

### Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## Error Handling

### Common Responses
- `All required field should be filled !`
- `User with this email already exists !`
- `Fill all required field !`
- `Incorrect credentials !`
- `Unauthorized access .`
- `Session timeout. Login again to access.`
- `Product id is required !`
- `No products found for the specified category !`

---

## Database Schema

### User Model

- `id` Int
- `email` String
- `username` String
- `name` String
- `password` String
- `passwordResetToken` String?
- `passwordResetTokenExpiry` DateTime?
- `gender` GENDER (`MALE`, `FEMALE`, `OTHER`)
- `role` ROLE (`USER`, `ADMIN`, `SELLER`)
- `created_at` DateTime
- `updated_at` DateTime
- `wishlist` Json?
- `otp` Int?

### Product Model

- `id` Int
- `category` String
- `subCategory` String
- `name` String
- `price` Decimal
- `description` String
- `image` String[]
- `stock` Int
- `discount` Decimal
- `sellerId` Int
- `keyword` String[]
- `comments` String[]
- `rating` Int
- `createdAt` DateTime

### Enums
- `GENDER`: `MALE`, `FEMALE`, `OTHER`
- `ROLE`: `USER`, `ADMIN`, `SELLER`
- `PAYMENTMODE`: `ONLINE`, `CASH`

---

## Best Practices

- Use `credentials: 'include'` for authenticated frontend requests.
- Validate responses before consuming them.
- Keep secrets in `.env` only.
- Use strong passwords and secure JWT keys.
- Limit image uploads to the configured Cloudinary settings.

---

## Troubleshooting

### Database connection fails
- Ensure PostgreSQL is running.
- Verify `DATABASE_URL`.
- Run `pnpm exec prisma migrate dev`.

### JWT issues
- Confirm `JWT_KEY` is present in `.env`.

### Email fails
- Verify `EMAIL_HOST`, `EMAIL_USER`, and `EMAIL_PASS`.
- Confirm SMTP port and secure settings.

### Cloudinary fails
- Check `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and `CLOUDINARY_CLOUD_NAME`.

---

## Quick Start

```bash
pnpm install
cp .env.example .env
pnpm exec prisma migrate dev --name init
pnpm dev
```

---

## Next Steps

- Add order and checkout endpoints.
- Add admin product controls.
- Add wishlist and review support.
- Add automated endpoint tests.
- Harden validation and error reporting.
