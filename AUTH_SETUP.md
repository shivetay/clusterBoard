# Authentication Implementation Guide

This document provides a comprehensive guide to the authentication system implemented in this application.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Security Features](#security-features)
4. [Setup Instructions](#setup-instructions)
5. [OAuth Configuration](#oauth-configuration)
6. [Usage Examples](#usage-examples)
7. [API Endpoints](#api-endpoints)
8. [Database Integration](#database-integration)

## 🔍 Overview

This application implements a secure, production-ready authentication system with the following features:

- **Email/Password Authentication** with secure password hashing
- **OAuth Integration** (Google & Facebook)
- **JWT-based Session Management** with access and refresh tokens
- **HTTP-only Cookies** for secure token storage
- **Automatic Token Refresh** on expiration
- **Route Protection** at both middleware and component levels
- **NextAuth.js Integration** for standardized authentication flow

## 🏗️ Architecture

### Tech Stack

- **NextAuth.js v5** - Authentication framework
- **JWT (Jose)** - Token generation and verification
- **bcryptjs** - Password hashing
- **Axios** - HTTP client with interceptors
- **React Query** - Data fetching and caching
- **Zustand** - State management

### File Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # Login page
│   │   ├── register/page.tsx       # Registration page
│   │   └── layout.tsx              # Auth layout
│   └── api/auth/
│       ├── [...nextauth]/route.ts  # NextAuth handler
│       ├── login/route.ts          # Login endpoint
│       ├── register/route.ts       # Registration endpoint
│       ├── logout/route.ts         # Logout endpoint
│       ├── session/route.ts        # Session endpoint
│       └── refresh/route.ts        # Token refresh endpoint
├── lib/
│   ├── auth/
│   │   ├── auth.ts                 # NextAuth instance
│   │   ├── auth.config.ts          # NextAuth configuration
│   │   ├── jwt.ts                  # JWT utilities
│   │   ├── password.ts             # Password utilities
│   │   └── session.ts              # Session utilities
│   ├── api/
│   │   ├── apiClient.ts            # Axios instance with interceptors
│   │   ├── auth/auth.api.ts        # Auth API functions
│   │   └── hooks/useAuth.ts        # Auth React hooks
│   └── validations/
│       └── auth.validation.ts      # Zod schemas
├── components/
│   └── auth/
│       └── protected-route.tsx     # Route protection component
├── providers/
│   ├── auth-provider.tsx           # NextAuth provider
│   └── user-provider.tsx           # User data provider
├── types/
│   └── auth.type.ts                # Auth TypeScript types
└── middleware.ts                   # Route protection middleware
```

## 🔒 Security Features

### 1. Password Security
- **Bcrypt hashing** with 12 salt rounds
- **Strong password requirements**: 8+ characters, uppercase, lowercase, number, special character
- Passwords never stored in plain text

### 2. Token Management
- **Access tokens**: Short-lived (15 minutes)
- **Refresh tokens**: Long-lived (7 days)
- **HTTP-only cookies**: Prevent XSS attacks
- **Secure flag**: HTTPS-only in production
- **SameSite**: CSRF protection

### 3. Request Security
- **Automatic token refresh** on 401 responses
- **CORS protection** with credential handling
- **CSRF protection** via SameSite cookies
- **Rate limiting** (to be implemented on production backend)

### 4. Route Protection
- **Middleware-level** protection for all routes
- **Component-level** protection for sensitive UI
- **Role-based** access control support

## 🚀 Setup Instructions

### 1. Install Dependencies

Already installed via:
```bash
pnpm add next-auth@beta bcryptjs jsonwebtoken jose
pnpm add -D @types/bcryptjs @types/jsonwebtoken
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Generate secure secrets:
```bash
# Generate AUTH_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32

# Generate JWT_REFRESH_SECRET
openssl rand -base64 32
```

### 3. Configure OAuth Providers (Optional)

See [OAuth Configuration](#oauth-configuration) section below.

### 4. Database Setup

The current implementation includes MOCK data. To connect to a real database:

1. Choose your database (PostgreSQL, MongoDB, MySQL, etc.)
2. Install appropriate ORM/client (Prisma, Mongoose, etc.)
3. Replace MOCK implementations in API routes:
   - `/src/app/api/auth/register/route.ts`
   - `/src/app/api/auth/login/route.ts`
   - `/src/app/api/auth/session/route.ts`

See [Database Integration](#database-integration) section for details.

## 🔗 OAuth Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - **Application type**: Web application
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`
5. Copy Client ID and Client Secret to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

### Facebook OAuth Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select existing
3. Add Facebook Login product
4. Configure OAuth settings:
   - **Valid OAuth Redirect URIs**: `http://localhost:3000/api/auth/callback/facebook`
   - For production: `https://yourdomain.com/api/auth/callback/facebook`
5. Copy App ID and App Secret to `.env.local`:
   ```
   FACEBOOK_CLIENT_ID=your-app-id
   FACEBOOK_CLIENT_SECRET=your-app-secret
   ```

## 💻 Usage Examples

### 1. Using Login Form

```typescript
import { useLogin } from '@/lib/api';

function LoginForm() {
  const login = useLogin();

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      await login.mutateAsync(data);
      // User is redirected automatically
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    // Your form JSX
  );
}
```

### 2. Using Register Form

```typescript
import { useRegister } from '@/lib/api';

function RegisterForm() {
  const register = useRegister();

  const handleSubmit = async (data: IRegisterData) => {
    try {
      await register.mutateAsync(data);
      // User is redirected automatically
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    // Your form JSX
  );
}
```

### 3. Protecting Routes with Middleware

Routes are automatically protected by middleware. Configure public routes in `middleware.ts`:

```typescript
const publicRoutes = ['/login', '/register', '/auth/error'];
```

### 4. Protecting Components

```typescript
import { ProtectedRoute } from '@/components/auth';

function DashboardPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <YourProtectedContent />
    </ProtectedRoute>
  );
}
```

### 5. Getting Current User

```typescript
'use client';

import { useSession } from 'next-auth/react';

function UserProfile() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;

  return <div>Welcome, {session.user?.name}!</div>;
}
```

### 6. Server-Side Authentication

```typescript
import { getCurrentUser } from '@/lib/auth';

export default async function ServerPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return <div>Hello {user.name}</div>;
}
```

### 7. Logout

```typescript
import { useLogout } from '@/lib/api';
// OR
import { signOut } from 'next-auth/react';

function LogoutButton() {
  const logout = useLogout();

  return (
    <button onClick={() => logout.mutate()}>
      Logout
    </button>
  );

  // Alternative using NextAuth directly:
  // <button onClick={() => signOut()}>Logout</button>
}
```

## 🌐 API Endpoints

### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### POST /api/auth/logout
Logout current user.

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### GET /api/auth/session
Get current session.

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### POST /api/auth/refresh
Refresh access token.

**Response:**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

## 🗄️ Database Integration

The current implementation uses MOCK data for demonstration. To integrate with a real database:

### Using Prisma (Recommended)

1. **Install Prisma:**
```bash
pnpm add @prisma/client
pnpm add -D prisma
```

2. **Initialize Prisma:**
```bash
npx prisma init
```

3. **Define User Schema** (`prisma/schema.prisma`):
```prisma
model User {
  id              String   @id @default(cuid())
  name            String
  email           String   @unique
  password        String?
  role            String   @default("user")
  image           String?
  emailVerified   DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  accounts        Account[]
  cluster_projects ClusterProject[]
  projects_limit  Int      @default(5)
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
}
```

4. **Create Prisma Client** (`src/lib/db/prisma.ts`):
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

5. **Update Register Route** (`src/app/api/auth/register/route.ts`):
```typescript
import { prisma } from '@/lib/db/prisma';

// Replace MOCK user creation with:
const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    role: 'user',
  },
});
```

6. **Update Login Route** (`src/app/api/auth/login/route.ts`):
```typescript
import { prisma } from '@/lib/db/prisma';

// Replace MOCK user lookup with:
const user = await prisma.user.findUnique({
  where: { email },
  select: {
    id: true,
    name: true,
    email: true,
    password: true,
    role: true,
    cluster_projects: true,
    projects_limit: true,
  },
});
```

### Using MongoDB with Mongoose

1. **Install Mongoose:**
```bash
pnpm add mongoose
```

2. **Create User Model** (`src/lib/db/models/User.ts`):
```typescript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, default: 'user' },
  cluster_projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  projects_limit: { type: Number, default: 5 },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
```

3. **Connect to MongoDB** (`src/lib/db/mongoose.ts`):
```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URL!;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
}
```

4. **Update API Routes** to use the User model similarly to Prisma examples above.

## 🧪 Testing

### Test Credentials

For development/testing, use these credentials:
- **Email**: `test@example.com`
- **Password**: `Test1234!`

### Manual Testing Checklist

- [ ] User can register with valid credentials
- [ ] User cannot register with weak password
- [ ] User cannot register with existing email
- [ ] User can login with correct credentials
- [ ] User cannot login with incorrect password
- [ ] User is redirected to protected page after login
- [ ] Unauthenticated user is redirected to login
- [ ] User can logout successfully
- [ ] Token is refreshed automatically on expiration
- [ ] OAuth login works (Google)
- [ ] OAuth login works (Facebook)
- [ ] Protected routes are inaccessible without auth
- [ ] Auth routes redirect to home when already logged in

## 🔧 Customization

### Adding More OAuth Providers

NextAuth supports many providers. To add more:

1. Install provider package if needed
2. Add to `auth.config.ts`:
```typescript
import GitHub from 'next-auth/providers/github';

providers: [
  // ... existing providers
  GitHub({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
]
```

### Customizing Token Expiration

Edit `src/lib/auth/jwt.ts`:

```typescript
// Access token (change from 15m to desired duration)
.setExpirationTime('30m')

// Refresh token (change from 7d to desired duration)
.setExpirationTime('30d')
```

### Adding Two-Factor Authentication

1. Install TOTP library:
```bash
pnpm add speakeasy qrcode
```

2. Add to user schema (Prisma example):
```prisma
model User {
  // ... existing fields
  twoFactorSecret   String?
  twoFactorEnabled  Boolean @default(false)
}
```

3. Create 2FA setup and verification endpoints
4. Update login flow to check for 2FA

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Prisma Documentation](https://www.prisma.io/docs)

## 🐛 Troubleshooting

### "Invalid credentials" error on login
- Check that the password matches the hashed password in the database
- Verify the test credentials are correct
- Check database connection

### OAuth redirect not working
- Verify callback URLs in OAuth provider settings
- Check that CLIENT_ID and CLIENT_SECRET are correct
- Ensure NEXTAUTH_URL is set correctly

### Token not refreshing
- Check that refresh token cookie exists
- Verify JWT_REFRESH_SECRET is set
- Check browser console for errors

### Middleware redirecting to login in loop
- Verify access token is being set correctly
- Check that public routes are configured properly
- Clear browser cookies and try again

## 📝 License

This implementation is part of the Cluster Board project. Refer to the main project license.
