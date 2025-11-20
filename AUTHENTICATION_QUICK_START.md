# 🚀 Authentication Quick Start Guide

## ⚡ Quick Setup (5 minutes)

### 1. Environment Variables

```bash
cp .env.example .env.local
```

Add these to `.env.local`:
```bash
# Required for JWT
AUTH_SECRET=your-secret-here
JWT_SECRET=your-jwt-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional: OAuth (skip for now if just testing)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
```

Generate secrets:
```bash
openssl rand -base64 32
```

### 2. Start Development

```bash
pnpm dev
```

### 3. Test Authentication

Navigate to: `http://localhost:3000/login`

**Test Credentials:**
- Email: `test@example.com`
- Password: `Test1234!`

## 📖 Common Use Cases

### How to Login

```typescript
'use client';
import { signIn } from 'next-auth/react';

await signIn('credentials', {
  email: 'user@example.com',
  password: 'password123',
  redirect: false,
});
```

### How to Register

```typescript
'use client';
import { useRegister } from '@/lib/api';

const register = useRegister();
await register.mutateAsync({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'SecurePass123!',
  confirmPassword: 'SecurePass123!',
});
```

### How to Logout

```typescript
'use client';
import { signOut } from 'next-auth/react';

await signOut({ callbackUrl: '/login' });
```

### How to Get Current User

**Client Component:**
```typescript
'use client';
import { useSession } from 'next-auth/react';

function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return <div>Not logged in</div>;
  
  return <div>Hello {session.user.name}</div>;
}
```

**Server Component:**
```typescript
import { getCurrentUser } from '@/lib/auth';

export default async function MyPage() {
  const user = await getCurrentUser();
  
  if (!user) redirect('/login');
  
  return <div>Hello {user.name}</div>;
}
```

### How to Protect a Route

**Option 1: Automatic (Middleware)**
All routes are protected by default except:
- `/login`
- `/register`
- `/auth/error`

**Option 2: Component Wrapper**
```typescript
import { ProtectedRoute } from '@/components/auth';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <YourContent />
    </ProtectedRoute>
  );
}
```

**Option 3: Role-Based**
```typescript
<ProtectedRoute requiredRole="admin">
  <AdminContent />
</ProtectedRoute>
```

### How to Check if User is Authenticated

**Client Side:**
```typescript
'use client';
import { useSession } from 'next-auth/react';

const { data: session } = useSession();
const isAuthenticated = !!session?.user;
```

**Server Side:**
```typescript
import { isAuthenticated } from '@/lib/auth';

const authenticated = await isAuthenticated();
```

## 🔧 Customize

### Change Public Routes

Edit `middleware.ts`:
```typescript
const publicRoutes = ['/login', '/register', '/about', '/contact'];
```

### Change Token Expiration

Edit `src/lib/auth/jwt.ts`:
```typescript
// Access token (default: 15 minutes)
.setExpirationTime('30m')

// Refresh token (default: 7 days)
.setExpirationTime('14d')
```

### Change Password Requirements

Edit `src/lib/validations/auth.validation.ts`:
```typescript
password: z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .regex(/your-pattern/, 'Your requirement message')
```

## 🔐 Security Checklist

- ✅ Passwords hashed with bcrypt (12 rounds)
- ✅ HTTP-only cookies (XSS protection)
- ✅ Secure cookies in production
- ✅ SameSite cookies (CSRF protection)
- ✅ Short-lived access tokens (15 min)
- ✅ Long-lived refresh tokens (7 days)
- ✅ Automatic token refresh
- ✅ Strong password requirements
- ✅ Input validation with Zod
- ✅ Route protection middleware

## 🎯 Next Steps

### For Development:
1. ✅ You're ready to go! Just add `.env.local` and start coding

### For Production:
1. ⚠️ **Connect to a real database** (see `AUTH_SETUP.md`)
2. ⚠️ Add rate limiting to prevent brute force
3. ⚠️ Implement email verification
4. ⚠️ Add password reset functionality
5. ⚠️ Set up monitoring and logging
6. ⚠️ Configure OAuth providers properly
7. ⚠️ Use strong secrets (not the defaults!)
8. ⚠️ Enable HTTPS in production

## 📚 Full Documentation

- `AUTH_SETUP.md` - Complete setup guide with OAuth
- `IMPLEMENTATION_SUMMARY.md` - Technical implementation details
- `.env.example` - All environment variables

## 🆘 Troubleshooting

### "Invalid credentials" error
- Check test credentials: `test@example.com` / `Test1234!`
- Ensure environment variables are set

### OAuth not working
- Verify CLIENT_ID and CLIENT_SECRET in `.env.local`
- Check callback URLs in provider settings
- Make sure NEXTAUTH_URL is correct

### Redirect loop on protected routes
- Clear browser cookies
- Check middleware configuration
- Verify access token is being set

### Token not refreshing
- Check JWT_REFRESH_SECRET is set
- Verify refresh token cookie exists
- Check browser console for errors

## 💡 Pro Tips

1. **Use the React hooks** - They handle all the complexity:
   - `useLogin()`, `useRegister()`, `useLogout()`, `useSession()`

2. **Let middleware handle protection** - Don't manually check auth on every page

3. **Use HTTP-only cookies** - Already configured, don't change to localStorage

4. **Test with network throttling** - Ensures token refresh works properly

5. **Check the browser console** - Most auth issues will show errors there

## 🎉 You're Ready!

The authentication system is fully set up and ready to use. Just add your environment variables and start building!

Questions? Check the full documentation in `AUTH_SETUP.md`.
