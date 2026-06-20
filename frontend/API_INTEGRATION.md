# TechieMart Frontend - API Integration Guide

## Authentication Pages Setup

This guide explains how to integrate the login and register pages with your backend API.

---

## 1. Environment Configuration

Create a `.env.local` file in the frontend root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

## 2. Create API Service

Create a new file `src/services/auth.ts`:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface LoginPayload {
  email?: string;
  username?: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  name: string;
  password: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
}

// Login API Call
export async function loginUser(payload: LoginPayload) {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      credentials: 'include', // Important: Include cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Register API Call
export async function registerUser(payload: RegisterPayload) {
  try {
    const response = await fetch(`${API_URL}/user/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Logout API Call
export async function logoutUser() {
  try {
    const response = await fetch(`${API_URL}/user/logout`, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Forgot Password API Call
export async function forgotPassword(email: string) {
  try {
    const response = await fetch(`${API_URL}/user/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Verify Reset Token
export async function verifyResetToken(token: string) {
  try {
    const response = await fetch(`${API_URL}/user/reset-password/verify/${token}`, {
      method: 'GET',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Reset Password
export async function resetPassword(token: string, newPassword: string) {
  try {
    const response = await fetch(`${API_URL}/user/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
```

---

## 3. Update Login Page

Update the `app/(auth)/login/page.tsx` file to use the API service:

```typescript
// In the handleSubmit function:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (!formData.email && !formData.username || !formData.password) {
    setError('Please fill in all fields')
    return
  }

  setLoading(true)
  try {
    const loginPayload = formData.email 
      ? { email: formData.email, password: formData.password }
      : { username: formData.username, password: formData.password }
    
    const response = await loginUser(loginPayload)
    
    // Store user data in context/state management if needed
    // Then redirect to dashboard
    window.location.href = '/dashboard'
    
  } catch (err: any) {
    setError(err.message || 'Login failed. Please try again.')
  } finally {
    setLoading(false)
  }
}
```

---

## 4. Update Register Page

Update the `app/(auth)/register/page.tsx` file to use the API service:

```typescript
// In the handleSubmit function:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (!validateForm()) return

  setLoading(true)
  try {
    const response = await registerUser({
      email: formData.email,
      username: formData.username,
      name: formData.name,
      password: formData.password,
      gender: formData.gender as 'MALE' | 'FEMALE' | 'OTHER'
    })
    
    setSuccess('Account created successfully! Redirecting to login...')
    setTimeout(() => {
      window.location.href = '/login'
    }, 2000)
    
  } catch (err: any) {
    setError(err.message || 'Registration failed. Please try again.')
  } finally {
    setLoading(false)
  }
}
```

---

## 5. Key Implementation Points

### Credentials Include

Always use `credentials: 'include'` in fetch requests to handle cookies:

```typescript
fetch(url, {
  credentials: 'include', // This is crucial for cookie-based auth
  ...
})
```

### Error Handling

Check the `success` field in responses:

```typescript
if (!data.success) {
  throw new Error(data.message);
}
```

### State Management

For a production app, consider using:
- **Context API** for simple state management
- **Redux** or **Zustand** for complex state
- **SWR** or **React Query** for data fetching

---

## 6. Example Context API Setup

Create `src/context/AuthContext.tsx`:

```typescript
'use client'

import React, { createContext, useState, ReactNode } from 'react'

interface User {
  id: number;
  email: string;
  username: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

---

## 7. Running the Application

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Access at http://localhost:3000
```

---

## 8. Page Routing

- Login Page: `http://localhost:3000/login`
- Register Page: `http://localhost:3000/register`

---

## 9. Design Features

### Login Page
✅ Split layout (left marketing, right form)
✅ Email/Username login
✅ Password toggle visibility
✅ Remember me checkbox
✅ Forgot password link
✅ Google sign-in
✅ Dark theme with teal accents
✅ Responsive design

### Register Page
✅ Comprehensive form with all fields
✅ Email, username, name, gender, password
✅ Password confirmation
✅ Terms and conditions checkbox
✅ Form validation
✅ Success/Error messages
✅ Responsive scrolling for mobile
✅ Google sign-up option

---

## 10. Customization

### Change Colors
Update Tailwind classes:
- `from-teal-600` → Any Tailwind color
- `bg-slate-950` → Any Tailwind background color

### Add Fields
Simply add new `useState` fields and form inputs

### Modify Validation
Update the `validateForm()` function in register page

---

## Support

For issues or questions about integration, refer to the backend documentation at `backend/README.md`.
