# Cluster Board

Secure cluster management dashboard built with Next.js 15, React 19, MUI, React Query, Zustand, and NextAuth.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # update secrets afterwards
pnpm dev
```

Application runs on [http://localhost:3000](http://localhost:3000).

## Environment configuration

| Variable | Description |
| --- | --- |
| `NEXTAUTH_SECRET` | Required. Long random string used to encrypt JWT/session cookies. |
| `NEXTAUTH_URL` | Public origin (defaults to `http://localhost:3000` for local dev). |
| `NEXT_PUBLIC_API_URL` | Base URL for the Axios data access layer. Use `http://localhost:3000/api` for same-origin requests so secure cookies flow automatically. |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Optional. Add to enable Google SSO. |
| `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET` | Optional. Add to enable Facebook SSO. |

## Authentication architecture

- **Data layer:** All auth-specific persistence lives in `storage/users.json` and is wrapped by `src/lib/auth/userRepository.ts`. Passwords are salted and hashed with `bcryptjs`, and every write is validated through Zod schemas.
- **REST endpoints:**  
  - `POST /api/auth/register` – creates a new user with secure defaults.  
  - `POST /api/auth/login` – issues a signed JWT in an `HttpOnly` cookie for non-NextAuth clients.  
  - `GET /api/auth/me` – returns the current authenticated profile (used by the data access layer and Zustand store).  
- **NextAuth:** Configured in `src/lib/auth/nextAuthOptions.ts` with:
  - Credentials provider (email + password) calling the validated service layer.
  - Optional Google and Facebook OAuth providers (enabled automatically when env secrets exist) with account-linking safeguards.
  - JWT sessions including a short-lived access token that is also delivered to the client session for API calls requiring a bearer token.
- **Session storage:** Browser keeps a secure, HTTP-only NextAuth session cookie. A short-lived JWT mirror (`clusterboard.at`) is also issued for API usage outside NextAuth, but the UI relies on the secure cookie so tokens never leave `document.cookie`.
- **Route protection:**  
  - Server layouts under `app/(clusterGroup)` and `app/(projectGroup)` call `getServerSession` and redirect to `/login` when unauthenticated.  
  - `UserProvider` hydrates Zustand from `/api/auth/me`, and `Navbar` switches between login/register buttons and a logout-enabled avatar menu based on session state.
- **Frontend flows:**  
  - `app/(auth)/login` and `app/(auth)/register` implement React Hook Form + Zod forms over the shared data access layer (`src/lib/api/user/*`).  
  - Social buttons call `signIn('google' | 'facebook')` with safe callback URLs.

## Security highlights

- Password policy enforced both client- and server-side.
- Secrets never rendered to the client; only signed tokens generated with `jose`.
- All API responses explicitly disable caching where appropriate and return typed error payloads.
- Axios client is configured with same-origin credentials and consistent error handling.

## Testing the flows locally

1. Register a new account at `/register`. On success, the UI automatically signs you in and redirects to `/cluster`.
2. Try logging out via the avatar menu and sign back in via `/login`.
3. To test OAuth, plug your Google/Facebook sandbox credentials into `.env.local`, restart the dev server, and use the corresponding buttons on the auth screens.
4. Inspect `storage/users.json` to confirm hashed passwords and provider links are stored as expected (replace with a proper database before production).

## Deployment checklist

- Set every secret through your hosting provider (never commit `.env.local`).
- Replace the file-based repository with a durable database/adapter.
- Configure HTTPS + secure cookies (`NEXTAUTH_URL` must be an HTTPS origin in production).
- Review `storage/users.json` usage; on serverless targets replace with DB before deploying.
