# 🛒 Techie Mart - Backend API Documentation

> **A complete backend API for e-commerce platform built with Node.js, Express, TypeScript, and Prisma ORM**

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

Techie Mart Backend is a robust, scalable API that powers the e-commerce platform. It provides user management, authentication, product management, and order handling functionalities with **PostgreSQL** database powered by **Prisma ORM**.

### Key Features
- ✅ User authentication with JWT tokens
- ✅ Secure password management with bcryptjs
- ✅ Password reset functionality with email verification
- ✅ User profile management (email, name, gender updates)
- ✅ Cookie-based session management
- ✅ CORS enabled for frontend integration
- ✅ Helmet for security headers
- ✅ Comprehensive error handling

---

## Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | Runtime environment | Latest |
| **Express.js** | Web framework | ^5.2.1 |
| **TypeScript** | Type safety | ^6.0.2 |
| **Prisma ORM** | Database ORM | ^7.7.0 |
| **PostgreSQL** | Database | Latest |
| **JWT** | Authentication | ^9.0.3 |
| **bcryptjs** | Password hashing | ^3.0.3 |
| **Nodemailer** | Email sending | ^8.0.7 |
| **CORS** | Cross-origin requests | ^2.8.6 |
| **Helmet** | Security headers | ^8.1.0 |
| **pnpm** | Package manager | ^10.33.0 |

---

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Migration files
├── generated/prisma/          # Auto-generated Prisma files
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts              # Server entry point
│   ├── controllers/           # Request handlers
│   │   └── user.controller.ts
│   ├── routes/                # API routes
│   │   └── user.route.ts
│   ├── middleware/            # Custom middleware
│   │   └── auth.middleware.ts
│   ├── helper/                # Business logic
│   │   ├── user.helper.ts
│   │   ├── email.helper.ts
│   │   ├── hashPassword.helper.ts
│   │   └── generateToken.helper.ts
│   ├── lib/                   # Library files
│   │   └── prisma.ts
│   ├── utils/                 # Utility functions
│   │   ├── ApiResponse.ts
│   │   ├── ApiError.ts
│   │   └── asyncHandler.ts
│   ├── types/                 # TypeScript types
│   │   └── interface.ts
│   └── @types/                # Type definitions
│       └── express/
├── .env                       # Environment variables (DO NOT COMMIT)
├── .gitignore                 # Git ignore rules
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
├── nodemon.json               # Nodemon configuration
└── README.md                  # This file

```

---

## Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **pnpm** (v10.33.0 or higher)
- **PostgreSQL** database

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd techie-mart/backend
```

### Step 2: Install Dependencies

```bash
pnpm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the backend root directory:

```bash
cp .env.example .env
```

### Step 4: Configure Database

```bash
pnpm exec prisma migrate dev --name init
```

### Step 5: Generate Prisma Client

```bash
pnpm exec prisma generate
```

---

## Environment Configuration

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/techie_mart

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_KEY=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRY=24h

# Email Service (Nodemailer)
SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password

# Frontend URLs
FRONTEND_URL=http://localhost:3000
RESET_PASSWORD_URL=http://localhost:3000

# Security
CORS_ORIGIN=*
```

### Important Notes:
- 🔐 **Never** commit `.env` file to Git
- ⚠️ Use strong JWT_KEY (minimum 32 characters)
- 📧 For Gmail, use [App Passwords](https://support.google.com/accounts/answer/185833)
- 🔒 Keep JWT_KEY secret and secure

---

## Running the Server

### Development Mode (with Hot Reload)

```bash
pnpm dev
```

The server will start at `http://localhost:5000` and automatically reload on file changes.

### Production Build

```bash
pnpm build
```

### Production Run

```bash
pnpm start
```

---

## API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

---

### 👤 USER AUTHENTICATION ENDPOINTS

#### 1️⃣ **Register User**

Register a new user account.

**Endpoint:** `POST /user/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "name": "John Doe",
  "password": "SecurePassword123!",
  "gender": "MALE"
}
```

**Required Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `email` | String | User's email (must be unique) |
| `username` | String | Username (must be unique) |
| `name` | String | User's full name |
| `password` | String | Password (min 6 characters) |
| `gender` | Enum | MALE, FEMALE, or OTHER |

**Success Response (200):**
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

**Error Response (401):**
```json
{
  "message": "User with this email already exists !",
  "data": null,
  "success": false
}
```

**Possible Errors:**
- ❌ All fields are required
- ❌ Email already exists
- ❌ Username already exists

---

#### 2️⃣ **Login User**

Authenticate user and get authentication token.

**Endpoint:** `POST /user/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Or use username:**
```json
{
  "username": "johndoe",
  "password": "SecurePassword123!"
}
```

**Success Response (200):**
```json
{
  "message": "User logged in successfully !",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe",
    "name": "John Doe",
    "gender": "MALE",
    "role": "USER"
  },
  "success": true
}
```

**Set-Cookie Header:**
```
authKey=eyJhbGciOiJIUzI1NiIs...; HttpOnly; Secure; SameSite=Strict; Max-Age=86400000
```

**Error Response (400):**
```json
{
  "message": "Fill all required field !",
  "success": false
}
```

**Possible Errors:**
- ❌ Email/username not found
- ❌ Incorrect password
- ❌ Missing email/username or password

---

#### 3️⃣ **Logout User**

Logout and clear session.

**Endpoint:** `GET /user/logout`

**Authorization:** ✅ **Required** (Cookie: authKey)

**Success Response (200):**
```json
{
  "message": "User logout successfully !",
  "success": true
}
```

**Error Response (401):**
```json
{
  "message": "Unauthorized access.",
  "success": false
}
```

---

### 🔑 PASSWORD MANAGEMENT ENDPOINTS

#### 4️⃣ **Forgot Password**

Request password reset link via email.

**Endpoint:** `POST /user/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Password reset link sent to your email address !",
  "data": null,
  "success": true
}
```

**Error Response (400):**
```json
{
  "message": "User with this email does not exist !",
  "data": null,
  "success": false
}
```

**Email Content:**
- Contains a reset link with token
- Link format: `{FRONTEND_URL}/reset-password?token={RESET_TOKEN}`
- Token expires in 1 hour

---

#### 5️⃣ **Verify Reset Token**

Verify if reset token is valid.

**Endpoint:** `GET /user/reset-password/verify/:token`

**URL Parameter:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `token` | String | Password reset token from email |

**Success Response (200):**
```json
{
  "message": "Reset token is valid.",
  "data": {
    "email": "user@example.com"
  },
  "success": true
}
```

**Error Response (400):**
```json
{
  "message": "Reset token is invalid or has expired !",
  "data": null,
  "success": false
}
```

---

#### 6️⃣ **Reset Password**

Reset user password with valid token.

**Endpoint:** `POST /user/reset-password`

**Request Body:**
```json
{
  "token": "abc123def456...",
  "newPassword": "NewSecurePassword123!"
}
```

**Required Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `token` | String | Reset token from email |
| `newPassword` | String | New password (min 6 characters) |

**Success Response (200):**
```json
{
  "message": "Password updated successfully !",
  "data": null,
  "success": true
}
```

**Error Response (400):**
```json
{
  "message": "Reset token is invalid or has expired !",
  "data": null,
  "success": false
}
```

**Post-Reset:**
- Confirmation email sent to user
- Token cleared from database
- User needs to login with new password

---

### 👥 USER MANAGEMENT ENDPOINTS

#### 7️⃣ **Update User Profile**

Update user information (email, name, gender).

**Endpoint:** `PUT /user/update`

**Authorization:** ✅ **Required** (Cookie: authKey)

**Request Body (all fields optional):**
```json
{
  "email": "newemail@example.com",
  "name": "Jane Doe",
  "gender": "FEMALE"
}
```

**Update Options:**
- Update one field at a time
- Update multiple fields together
- Fields not provided remain unchanged

**Success Response (200):**
```json
{
  "message": "User updated successfully!",
  "data": {
    "id": 1,
    "email": "newemail@example.com",
    "username": "johndoe",
    "name": "Jane Doe",
    "gender": "FEMALE"
  },
  "success": true
}
```

**Error Response (400):**
```json
{
  "message": "Email is already taken by another user!",
  "data": null,
  "success": false
}
```

**Possible Errors:**
- ❌ At least one field must be provided
- ❌ Email already taken by another user
- ❌ User not found
- ❌ No changes detected

---

#### 8️⃣ **Get All Users**

Retrieve list of all users (public data).

**Endpoint:** `GET /user`

**Query Parameters:** None

**Success Response (200):**
```json
{
  "message": "Users fetched successfully !",
  "data": [
    {
      "id": 1,
      "email": "user1@example.com",
      "username": "johndoe",
      "name": "John Doe",
      "gender": "MALE",
      "role": "USER",
      "created_at": "2026-05-01T10:00:00Z"
    },
    {
      "id": 2,
      "email": "user2@example.com",
      "username": "janedoe",
      "name": "Jane Doe",
      "gender": "FEMALE",
      "role": "USER",
      "created_at": "2026-05-01T11:00:00Z"
    }
  ],
  "success": true
}
```

**Error Response (400):**
```json
{
  "message": "No user found !",
  "data": null,
  "success": false
}
```

---

#### 9️⃣ **Get User by ID**

Retrieve specific user information by ID.

**Endpoint:** `GET /user/:id`

**URL Parameter:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | Number | User ID |

**Success Response (200):**
```json
{
  "message": "Users fetched successfully !",
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

**Error Response (400):**
```json
{
  "message": "No user found !",
  "data": null,
  "success": false
}
```

---

## Authentication

### JWT Authentication

All protected endpoints require a valid JWT token passed via **HTTP-only Cookie**.

### How It Works:

1. **Login** → Receive `authKey` cookie with JWT token
2. **Include Cookie** → Browser automatically includes cookie in requests
3. **Backend Verifies** → Middleware validates token on protected routes
4. **Logout** → Cookie is cleared

### Protected Endpoints:
- `GET /user/logout` - Requires authentication
- `PUT /user/update` - Requires authentication

### Token Details:
- **Type:** JWT (JSON Web Token)
- **Storage:** HTTP-only Cookie (secure)
- **Expiry:** 24 hours (configurable in .env)
- **Name:** `authKey`

### Cookie Security:
```
HttpOnly: true     // Prevents JavaScript access
Secure: true       // Only sent over HTTPS
SameSite: strict   // Prevents CSRF attacks
```

### Example with Fetch API:

```javascript
// Login to get token
const loginResponse = await fetch('http://localhost:5000/api/v1/user/login', {
  method: 'POST',
  credentials: 'include', // Include cookies
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

// Cookie is automatically stored by browser

// Use protected endpoint (cookie sent automatically)
const logoutResponse = await fetch('http://localhost:5000/api/v1/user/logout', {
  method: 'GET',
  credentials: 'include' // Include cookies
});
```

---

## Response Format

### Success Response Structure:

```json
{
  "message": "Description of what happened",
  "data": {},
  "success": true
}
```

### Error Response Structure:

```json
{
  "message": "Description of the error",
  "data": null,
  "success": false
}
```

### HTTP Status Codes:

| Code | Meaning |
|------|---------|
| **200** | ✅ Success |
| **201** | ✅ Created |
| **400** | ❌ Bad Request / Validation Error |
| **401** | ❌ Unauthorized / Authentication Failed |
| **404** | ❌ Not Found |
| **500** | ❌ Server Error |

---

## Error Handling

### Common Error Scenarios:

#### 1. **Missing Required Fields**
```json
{
  "message": "All required field should be filled !",
  "data": null,
  "success": false
}
```

#### 2. **Duplicate Email/Username**
```json
{
  "message": "User with this email already exists !",
  "data": null,
  "success": false
}
```

#### 3. **Invalid Credentials**
```json
{
  "message": "Incorrect credentials !",
  "data": null,
  "success": false
}
```

#### 4. **Unauthorized Access**
```json
{
  "message": "Unauthorized access.",
  "data": null,
  "success": false
}
```

#### 5. **Session Timeout**
```json
{
  "message": "Session timeout. Login again to access.",
  "data": null,
  "success": false
}
```

---

## Database Schema

### User Model

```sql
CREATE TABLE "User" (
  id                        INT PRIMARY KEY DEFAULT autoincrement(),
  email                     VARCHAR UNIQUE NOT NULL,
  username                  VARCHAR NOT NULL,
  name                      VARCHAR NOT NULL,
  password                  VARCHAR NOT NULL,
  passwordResetToken        VARCHAR UNIQUE,
  passwordResetTokenExpiry  TIMESTAMP,
  gender                    ENUM('MALE', 'FEMALE', 'OTHER'),
  role                      ENUM('USER', 'ADMIN', 'SELLER') DEFAULT 'USER',
  created_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  wishlist                  JSON,
  otp                       INT
);
```

### Available Enums:

**GENDER:** `MALE`, `FEMALE`, `OTHER`

**ROLE:** `USER`, `ADMIN`, `SELLER`

### Related Models:
- **Address** - User addresses
- **Orders** - User orders
- **Product** - Products added by user

---

## Best Practices

### For Frontend Developers:

#### ✅ DO:
- ✔️ Always use `credentials: 'include'` in fetch requests
- ✔️ Check `success` field in responses before accessing data
- ✔️ Display user-friendly error messages from `message` field
- ✔️ Store user data from response, don't repeat API calls
- ✔️ Implement loading states during API calls
- ✔️ Handle 401 errors by redirecting to login
- ✔️ Use environment variables for API base URL

#### ❌ DON'T:
- ❌ Don't manually manage JWT tokens
- ❌ Don't store sensitive data in localStorage
- ❌ Don't ignore error responses
- ❌ Don't make unnecessary API calls
- ❌ Don't hardcode API URLs
- ❌ Don't expose API keys in frontend code

### Example Frontend Integration:

```javascript
// .env.local
REACT_APP_API_URL=http://localhost:5000/api/v1

// api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL;

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    return data.data;
  } catch (error) {
    console.error('Login failed:', error.message);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await fetch(`${API_BASE_URL}/user/logout`, {
      method: 'GET',
      credentials: 'include'
    });
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Logout failed:', error.message);
    throw error;
  }
}
```

---

## Troubleshooting

### Issue: "JWT_KEY is not defined"
**Solution:** Add `JWT_KEY` to `.env` file

### Issue: "Cannot connect to database"
**Solution:** 
- Check PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Run `pnpm exec prisma migrate dev`

### Issue: "Email sending fails"
**Solution:**
- Verify SMTP credentials in `.env`
- For Gmail, use [App Passwords](https://support.google.com/accounts/answer/185833)
- Check SMTP port (usually 587 or 465)

### Issue: "CORS errors in frontend"
**Solution:**
- Ensure frontend URL in `.env` `CORS_ORIGIN`
- Use `credentials: 'include'` in frontend requests
- Check that cookies are enabled

### Issue: "Token expired immediately"
**Solution:**
- Increase `JWT_EXPIRY` in `.env`
- Default is 24 hours
- Format: `"24h"`, `"7d"`, etc.

### Issue: "Cannot reset password - link expired"
**Solution:**
- Password reset tokens expire in 1 hour
- Request new reset token if expired
- Check email for timestamp

---

## Quick Start Guide

```bash
# 1. Install dependencies
pnpm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your values

# 3. Setup database
pnpm exec prisma migrate dev --name init

# 4. Start development server
pnpm dev

# 5. Backend ready at http://localhost:5000
```

---

## Next Steps

### Frontend Development:
1. Read this documentation completely
2. Understand request/response formats
3. Set up authentication flow
4. Implement all endpoints
5. Add error handling
6. Test thoroughly

### Backend Enhancement:
- [ ] Add product management endpoints
- [ ] Add order management
- [ ] Add admin controls
- [ ] Add payment integration
- [ ] Add wishlist functionality
- [ ] Add rating/review system

---

## Support & Contributions

For issues, questions, or suggestions, please contact the development team or create an issue in the repository.

---

## License

ISC License - See LICENSE file for details

---

**Last Updated:** May 1, 2026

**Version:** 1.0.0

---

*This documentation is accurate as of the latest commit. For updates, please refer to the main repository.*
