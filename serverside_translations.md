# Server-Side Translations Solution

This guide explains how to implement server-side translations in your Next.js 15 App Router application.

## Overview

Your application currently uses `i18next` and `react-i18next` for client-side translations. To enable server-side translations in server components, we need to create a utility that loads translations synchronously on the server.

## Solution Architecture

1. **Translation Utility**: A utility function that loads translations from JSON files for server components
2. **Type Safety**: TypeScript types for translation keys
3. **Locale Detection**: Automatic locale detection from request headers or params
4. **Integration**: Seamless integration with existing client-side translations

## Implementation Steps

### Step 1: Create Server-Side Translation Utility

Create `src/lib/utils/getTranslations.ts`:

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';
import { TRANSLATIONS } from '@/locales/pl/locales';

type TranslationKey = keyof typeof TRANSLATIONS;
type Translations = Record<TranslationKey, string>;

// Cache for loaded translations to avoid reading files on every request
const translationsCache: Map<string, Translations> = new Map();

/**
 * Get server-side translations for a given locale
 * @param locale - The locale code (e.g., 'pl')
 * @returns Object with all translations for the locale
 */
export function getServerTranslations(locale: string = 'pl'): Translations {
  // Check cache first
  if (translationsCache.has(locale)) {
    return translationsCache.get(locale)!;
  }

  try {
    // For now, we'll use the TypeScript translations object
    // If you prefer loading from JSON, uncomment the JSON loading code below
    const translations = TRANSLATIONS as Translations;

    // Alternative: Load from JSON file (requires translations to be in JSON format)
    // const translationsPath = join(process.cwd(), 'src', 'locales', locale, 'common.json');
    // const fileContents = readFileSync(translationsPath, 'utf-8');
    // const jsonTranslations = JSON.parse(fileContents);
    // 
    // // Merge with locales.ts translations if needed
    // const translations = { ...TRANSLATIONS, ...jsonTranslations } as Translations;

    // Cache the translations
    translationsCache.set(locale, translations);

    return translations;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    return TRANSLATIONS as Translations;
  }
}

/**
 * Get a single translation by key
 * @param locale - The locale code (e.g., 'pl')
 * @param key - The translation key
 * @returns The translated string or the key if not found
 */
export function getServerTranslation(
  locale: string = 'pl',
  key: TranslationKey,
): string {
  const translations = getServerTranslations(locale);
  return translations[key] || key;
}

/**
 * Get translations with type safety in server components
 * Usage: const t = getServerTranslations(locale);
 */
export function useServerTranslations(locale: string = 'pl') {
  const translations = getServerTranslations(locale);

  return {
    t: (key: TranslationKey): string => translations[key] || key,
    translations,
  };
}
```

### Step 2: Create Locale Detection Utility

Create `src/lib/utils/getLocale.ts`:

```typescript
import { headers } from 'next/headers';
import { i18nConfig } from '../../../i18nConfig';

/**
 * Get the locale from request headers or default locale
 * @returns The locale code (e.g., 'pl')
 */
export async function getLocale(): Promise<string> {
  // Option 1: Get locale from Accept-Language header
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  
  if (acceptLanguage) {
    // Parse Accept-Language header to find preferred locale
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().split('-')[0])
      .find((lang) => i18nConfig.locales.includes(lang));

    if (preferredLocale) {
      return preferredLocale;
    }
  }

  // Option 2: Get locale from URL segment (if using next-i18n-router)
  // This would require setting up next-i18n-router in middleware

  // Fallback to default locale
  return i18nConfig.defaultLocale;
}

/**
 * Get locale synchronously (for cases where you can't use async)
 * Note: This is a simplified version that just returns the default
 */
export function getLocaleSync(): string {
  return i18nConfig.defaultLocale;
}
```

### Step 3: Convert i18nConfig to TypeScript (Optional but Recommended)

Update `i18nConfig.js` to `i18nConfig.ts`:

```typescript
export const i18nConfig = {
  locales: ['pl'] as const,
  defaultLocale: 'pl' as const,
};

export type Locale = (typeof i18nConfig.locales)[number];
```

Or keep it as JS and import it:

```typescript
// src/lib/utils/i18n-config.ts
export const i18nConfig = {
  locales: ['pl'],
  defaultLocale: 'pl',
} as const;
```

### Step 4: Usage in Server Components

#### Basic Usage:

```typescript
// src/app/(projectGroup)/project/[id]/invitations/page.tsx
import { getServerTranslations } from '@/lib/utils/getTranslations';
import { getLocale } from '@/lib/utils/getLocale';
// ... other imports

export default async function ProjectInvitationsPage({
  params,
}: IProjectInvitationsPageProps) {
  const { id } = await params;
  const locale = await getLocale();
  const translations = getServerTranslations(locale);

  // ... your data fetching logic

  if (!invitations) {
    return <div>{translations.NO_INVITATIONS_FOUND}</div>;
  }

  return <ProjectInvitationsView invitations={invitations} />;
}
```

#### Using the Helper Function:

```typescript
import { useServerTranslations } from '@/lib/utils/getTranslations';
import { getLocale } from '@/lib/utils/getLocale';

export default async function MyServerComponent() {
  const locale = await getLocale();
  const { t, translations } = useServerTranslations(locale);

  return (
    <div>
      <h1>{t('PROJEKTY')}</h1>
      <p>{translations.ADD_NEW_PROJECT}</p>
    </div>
  );
}
```

### Step 5: Pass Locale to Client Components (Optional)

If you need to pass translations or locale to client components, you can pass them as props:

```typescript
// Server Component
export default async function ServerComponent() {
  const locale = await getLocale();
  const translations = getServerTranslations(locale);

  return (
    <ClientComponent 
      initialLocale={locale}
      serverTranslations={translations}
    />
  );
}

// Client Component
'use client';
interface ClientComponentProps {
  initialLocale: string;
  serverTranslations: Record<string, string>;
}

export function ClientComponent({ initialLocale, serverTranslations }: ClientComponentProps) {
  // Use client-side i18next for interactive translations
  // Or use the server translations as initial values
}
```

### Step 6: Update Your Current Implementation

Replace direct imports of `TRANSLATIONS` in server components:

**Before:**
```typescript
import { TRANSLATIONS } from '@/locales/pl/locales';

export default async function Page() {
  return <div>{TRANSLATIONS.NO_INVITATIONS_FOUND}</div>;
}
```

**After:**
```typescript
import { getServerTranslations } from '@/lib/utils/getTranslations';
import { getLocale } from '@/lib/utils/getLocale';

export default async function Page() {
  const locale = await getLocale();
  const t = getServerTranslations(locale);
  return <div>{t.NO_INVITATIONS_FOUND}</div>;
}
```

## Alternative: Using next-i18n-router (If You Want URL-Based Locales)

If you want to support locale prefixes in URLs (e.g., `/pl/projects`, `/en/projects`), you can use `next-i18n-router`:

### Setup next-i18n-router:

1. **Update middleware.ts:**

```typescript
import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from './i18nConfig';
import {
  type ClerkMiddlewareAuth,
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

const handleMiddleware = async (
  auth: ClerkMiddlewareAuth,
  request: NextRequest,
) => {
  // Handle i18n routing first
  i18nRouter(request, i18nConfig);

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
};

export default clerkMiddleware(handleMiddleware);

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
```

2. **Update getLocale utility:**

```typescript
import { getLocale as getI18nLocale } from 'next-i18n-router';
import { i18nConfig } from '../../../i18nConfig';

export async function getLocale(): Promise<string> {
  // This will extract locale from URL if using next-i18n-router
  const locale = await getI18nLocale(i18nConfig);
  return locale || i18nConfig.defaultLocale;
}
```

3. **Update your app structure** to include locale segments:
   - Move pages to `app/[locale]/...` structure, OR
   - Keep current structure and handle locale detection differently

## Best Practices

1. **Cache Translations**: Translations are cached in memory to avoid reading files on every request
2. **Type Safety**: Use TypeScript to ensure translation keys exist
3. **Fallback**: Always provide fallback to default locale
4. **Performance**: Load translations once per request, not in loops
5. **Consistency**: Use the same translation keys on both client and server

## Migration Checklist

- [ ] Create `src/lib/utils/getTranslations.ts`
- [ ] Create `src/lib/utils/getLocale.ts`
- [ ] Update all server components to use `getServerTranslations`
- [ ] Remove direct imports of `TRANSLATIONS` from server components
- [ ] Test all server-rendered pages
- [ ] Ensure client components still work with react-i18next
- [ ] (Optional) Set up next-i18n-router for URL-based locales

## Example: Complete Server Component

```typescript
import { getServerTranslations } from '@/lib/utils/getTranslations';
import { getLocale } from '@/lib/utils/getLocale';
import { serverGet } from '@/lib/api/projects/serverApiClient';
import type { IInvitationData } from '@/types';
import { ProjectInvitationsView } from '@/views';

interface IProjectInvitationsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectInvitationsPage({
  params,
}: IProjectInvitationsPageProps) {
  const { id } = await params;
  const locale = await getLocale();
  const t = getServerTranslations(locale);

  const response = await serverGet<{
    data: { invitations: IInvitationData[] };
  }>(`invitations/project/${id}`);

  const invitations = response.data.invitations;
  
  if (!invitations) {
    return <div>{t.NO_INVITATIONS_FOUND}</div>;
  }

  return <ProjectInvitationsView invitations={invitations} />;
}
```

## Notes

- Server-side translations are loaded synchronously, which is fine for server components
- Client-side translations continue to use `react-i18next` and the existing `I18nProvider`
- Both systems can coexist - server components use server translations, client components use i18next
- If you add more locales later, update the `getServerTranslations` function to load from the appropriate locale directory
