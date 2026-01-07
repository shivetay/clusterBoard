# Migrating from React Query to Next.js Server Actions

## Overview

This guide explains how to properly migrate from React Query to Next.js Server Actions in your Next.js 15 project. Server Actions are a powerful Next.js feature that allows you to execute server-side code directly from client components, eliminating the need for React Query in most cases.

## Why Server Actions?

**Benefits:**
1. **Native Next.js Integration** - No additional client-side libraries needed
2. **Type Safety** - Full TypeScript support end-to-end
3. **Simplified Architecture** - Reduces client-side complexity
4. **Better Performance** - Server-side execution reduces bundle size
5. **Progressive Enhancement** - Works without JavaScript
6. **Automatic Request Deduplication** - Next.js handles this automatically
7. **Built-in Error Handling** - Native error boundaries and error handling

**Trade-offs:**
- **No Client-Side Caching** - Server Actions don't provide the same caching mechanisms as React Query
- **Less Granular Loading States** - Requires manual state management for loading/error states
- **No Optimistic Updates** - Must be implemented manually using `useTransition` or `useOptimistic`

## Architecture Decision: Server Actions vs Route Handlers

### Use Server Actions when:
- ✅ You need to mutate data (POST, PUT, DELETE, PATCH)
- ✅ You want type-safe server-side functions
- ✅ You're calling from client components (forms, buttons, etc.)
- ✅ You want progressive enhancement
- ✅ You're working with forms and mutations

### Use Route Handlers when:
- ✅ You need REST API endpoints for external services
- ✅ You need to handle webhooks
- ✅ You need file uploads/downloads with specific headers
- ✅ You're building a public API

**Recommendation for your project:** Use Server Actions for all mutations and most data fetching. You can still use your existing `serverApiClient.ts` helpers within Server Actions.

## Project Structure

Create a new directory structure for Server Actions:

```
src/
  lib/
    actions/
      projects/
        actions.ts          # Project-related actions
      invitations/
        actions.ts          # Invitation-related actions
      stages/
        actions.ts          # Stage-related actions
      tasks/
        actions.ts          # Task-related actions
      index.ts              # Export all actions
```

## Implementation Guide

### 1. Setting Up Server Actions

#### Basic Server Action Structure

```typescript
// src/lib/actions/projects/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { serverPost, serverDelete, serverPut, serverGet } from '@/lib/api/projects/serverApiClient';
import { auth } from '@clerk/nextjs/server';

// Type-safe action result
type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Create a new project
 * Server Actions automatically handle serialization
 */
export async function createProject(
  formData: FormData
): Promise<ActionResult<void>> {
  try {
    // Verify authentication
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    // Extract and validate data
    const data = {
      project_name: formData.get('project_name') as string,
      project_description: formData.get('project_description') as string,
      // ... other fields
    };

    // Call your API
    await serverPost('/projects/create', data);

    // Revalidate relevant paths
    revalidatePath('/projects');
    revalidatePath('/cluster');

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create project'
    };
  }
}
```

#### Key Points:
- **'use server'** directive at the top - makes it a Server Action
- **Always return a result object** - Use a discriminated union type for type safety
- **Use `revalidatePath`** - Invalidate Next.js cache after mutations
- **Handle errors gracefully** - Return error objects instead of throwing

### 2. Client Component Integration

#### Using Server Actions with useTransition

```typescript
// src/components/features/project-form.tsx
'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '@/lib/actions/projects/actions';
import { useAlert, useModal } from '@/providers';

export function ProjectForm() {
  const [isPending, startTransition] = useTransition();
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await createProject(formData);
      
      if (result.success) {
        showAlert({
          message: 'Project created successfully',
          severity: 'success',
        });
        setIsOpen(false);
        router.refresh(); // Refresh server components
      } else {
        showAlert({
          message: result.error,
          severity: 'error',
        });
      }
    });
  }

  return (
    <form action={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Project'}
      </button>
    </form>
  );
}
```

#### Using Server Actions with Form Actions (Recommended)

```typescript
'use client';

import { createProject } from '@/lib/actions/projects/actions';
import { useAlert, useModal } from '@/providers';
import { useRouter } from 'next/navigation';

export function ProjectForm() {
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await createProject(formData);
    
    if (result.success) {
      showAlert({
        message: 'Project created successfully',
        severity: 'success',
      });
      setIsOpen(false);
      router.refresh();
    } else {
      showAlert({
        message: result.error,
        severity: 'error',
      });
    }
  }

  return (
    <form action={handleSubmit}>
      {/* form fields */}
      <button type="submit">Create Project</button>
    </form>
  );
}
```

**Why this approach:**
- Simpler than `useTransition` for most cases
- Works without JavaScript (progressive enhancement)
- Next.js handles the loading state automatically during form submission
- Less boilerplate code

### 3. Data Fetching Patterns

#### Server Components (Preferred for Initial Load)

```typescript
// src/app/projects/page.tsx
import { serverGet } from '@/lib/api/projects/serverApiClient';
import { ProjectsView } from '@/views';

export default async function ProjectsPage() {
  // This runs on the server, no Server Action needed
  const projects = await serverGet('/projects/user/123');
  
  return <ProjectsView projects={projects} />;
}
```

**Use Server Components when:**
- You're fetching data for initial page load
- Data doesn't need to be reactive/real-time
- SEO is important

#### Server Actions for Refetching (Client-Initiated)

```typescript
// src/lib/actions/projects/actions.ts
'use server';

export async function getUserProjects(userId: string) {
  try {
    const { userId: authUserId } = await auth();
    if (!authUserId || authUserId !== userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const projects = await serverGet(`/projects/user/${userId}`);
    return { success: true, data: projects };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch projects'
    };
  }
}
```

```typescript
// Client component
'use client';

import { useState } from 'react';
import { getUserProjects } from '@/lib/actions/projects/actions';

export function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function refetchProjects() {
    setIsLoading(true);
    const result = await getUserProjects(userId);
    if (result.success) {
      setProjects(result.data);
    }
    setIsLoading(false);
  }

  // ... rest of component
}
```

### 4. Migration Pattern for Your Hooks

#### Before (React Query):

```typescript
// src/lib/api/hooks/useCreateNewProject.ts
export const useCreateNewProject = () => {
  const queryClient = useQueryClient();
  const { mutate: createProject, isPending } = useMutation({
    mutationFn: async (data) => {
      await apiClient.post('/projects/create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-projects'] });
    },
  });
  return { createProject, isPending };
};
```

#### After (Server Action):

```typescript
// src/lib/actions/projects/actions.ts
'use server';

export async function createProject(data: TFormData): Promise<ActionResult<void>> {
  try {
    await serverPost('/projects/create', data);
    revalidatePath('/projects');
    revalidatePath('/cluster');
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

```typescript
// In component
'use client';

import { createProject } from '@/lib/actions/projects/actions';

export function CreateProjectForm() {
  const [isPending, startTransition] = useTransition();
  
  async function handleSubmit(data: TFormData) {
    startTransition(async () => {
      const result = await createProject(data);
      // Handle result
    });
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <button disabled={isPending}>Create</button>
    </form>
  );
}
```

### 5. Handling Complex Mutations

#### Example: Delete with Confirmation

```typescript
// src/lib/actions/invitations/actions.ts
'use server';

export async function deleteInvitation(
  invitationId: string
): Promise<ActionResult<void>> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    await serverDelete(`/invitations/${invitationId}`);
    
    revalidatePath('/invitations');
    
    return { success: true, data: undefined };
  } catch (error: any) {
    return {
      success: false,
      error: error?.response?.data?.message || 'Failed to delete invitation'
    };
  }
}
```

```typescript
// Component
'use client';

import { deleteInvitation } from '@/lib/actions/invitations/actions';
import { useAlert } from '@/providers';
import { useRouter } from 'next/navigation';

export function DeleteInvitationButton({ invitationId }: { invitationId: string }) {
  const [isPending, startTransition] = useTransition();
  const { showAlert } = useAlert();
  const router = useRouter();

  async function handleDelete() {
    startTransition(async () => {
      const result = await deleteInvitation(invitationId);
      
      if (result.success) {
        showAlert({
          message: 'Invitation deleted successfully',
          severity: 'success',
        });
        router.refresh();
      } else {
        showAlert({
          message: result.error,
          severity: 'error',
        });
      }
    });
  }

  return (
    <button onClick={handleDelete} disabled={isPending}>
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
```

### 6. Optimistic Updates (If Needed)

For optimistic updates, use React's `useOptimistic` hook:

```typescript
'use client';

import { useOptimistic, useTransition } from 'react';
import { updateProject } from '@/lib/actions/projects/actions';

export function ProjectList({ initialProjects }: { initialProjects: Project[] }) {
  const [optimisticProjects, addOptimisticProject] = useOptimistic(
    initialProjects,
    (state, newProject: Project) => [...state, newProject]
  );

  const [isPending, startTransition] = useTransition();

  async function handleCreate(data: FormData) {
    const optimisticProject = { id: 'temp', ...data };
    
    startTransition(async () => {
      addOptimisticProject(optimisticProject);
      const result = await createProject(data);
      // Server will revalidate, so optimistic update will be replaced
    });
  }

  return (
    <div>
      {optimisticProjects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

### 7. Error Handling Best Practices

#### Centralized Error Handling

```typescript
// src/lib/actions/utils/error-handler.ts
export function handleActionError(error: unknown): string {
  if (error instanceof Error) {
    // Handle API errors
    if ('response' in error) {
      const apiError = error as any;
      return apiError.response?.data?.message || apiError.message;
    }
    return error.message;
  }
  return 'An unexpected error occurred';
}
```

#### Usage in Actions

```typescript
'use server';

import { handleActionError } from '../utils/error-handler';

export async function createProject(data: TFormData): Promise<ActionResult<void>> {
  try {
    await serverPost('/projects/create', data);
    revalidatePath('/projects');
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: handleActionError(error)
    };
  }
}
```

### 8. Type Safety

Create shared types for action results:

```typescript
// src/lib/actions/types.ts
export type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

export type ActionState<T> = {
  data?: T;
  error?: string;
  isPending: boolean;
};
```

### 9. Authentication with Clerk

Your existing `serverApiClient.ts` already handles Clerk authentication correctly. Server Actions can use it directly:

```typescript
'use server';

import { auth } from '@clerk/nextjs/server';
import { serverPost } from '@/lib/api/projects/serverApiClient';

export async function createProject(data: TFormData): Promise<ActionResult<void>> {
  // Clerk auth is automatically handled in serverApiClient
  // But you can add additional checks:
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    await serverPost('/projects/create', data);
    revalidatePath('/projects');
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: handleActionError(error) };
  }
}
```

### 10. Revalidation Strategy

Use `revalidatePath` and `revalidateTag` strategically:

```typescript
// After mutations
revalidatePath('/projects');           // Revalidate a page
revalidatePath('/projects', 'page');   // Revalidate layout and page
revalidatePath('/projects/[id]', 'page'); // Revalidate dynamic route

// Or use tags for more granular control
// In server component:
const data = await fetch(url, { next: { tags: ['projects'] } });

// In action:
revalidateTag('projects');
```

## Migration Checklist

1. **Create actions directory structure**
   - [ ] Create `src/lib/actions/` directory
   - [ ] Organize actions by domain (projects, invitations, stages, tasks)

2. **Convert mutations first**
   - [ ] Convert all `useMutation` hooks to Server Actions
   - [ ] Update components to use Server Actions
   - [ ] Replace `queryClient.invalidateQueries` with `revalidatePath`

3. **Handle data fetching**
   - [ ] Keep server-side fetching in Server Components where possible
   - [ ] Create Server Actions only for client-initiated refetching

4. **Remove React Query**
   - [ ] Remove `@tanstack/react-query` and `@tanstack/react-query-devtools` from package.json
   - [ ] Remove `QueryProvider` from `src/app/layout.tsx`
   - [ ] Delete `src/providers/query-provider.tsx`
   - [ ] Delete all files in `src/lib/api/hooks/`

5. **Update imports**
   - [ ] Remove all `useQuery` and `useMutation` imports
   - [ ] Update component imports to use Server Actions

6. **Test thoroughly**
   - [ ] Test all mutations
   - [ ] Test error handling
   - [ ] Test loading states
   - [ ] Test authentication
   - [ ] Test revalidation

## Best Practices Summary

1. **Always use 'use server' directive** at the top of Server Action files
2. **Return discriminated union types** (`ActionResult<T>`) for type safety
3. **Use `revalidatePath`** after mutations to update UI
4. **Handle errors gracefully** - return error objects, don't throw
5. **Use Server Components** for initial data fetching when possible
6. **Use `useTransition`** for loading states in client components
7. **Keep actions small and focused** - one action per operation
8. **Validate authentication** in each action
9. **Use TypeScript** for full type safety
10. **Test error cases** - authentication failures, network errors, validation errors

## Example: Complete Migration

### Hook to Action Conversion

**Before:**
```typescript
// useDeleteInvitation.ts
export const useDeleteInvitation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/invitations/${id}`);
    },
    onSuccess: () => {
      router.refresh();
      showAlert({ message: 'Success', severity: 'success' });
    },
  });
  return { deleteInvitation: mutate, isPending };
};
```

**After:**
```typescript
// actions.ts
'use server';
export async function deleteInvitation(id: string): Promise<ActionResult<void>> {
  try {
    await serverDelete(`/invitations/${id}`);
    revalidatePath('/invitations');
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: handleActionError(error) };
  }
}
```

```typescript
// Component
'use client';
export function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const { showAlert } = useAlert();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteInvitation(id);
      if (result.success) {
        showAlert({ message: 'Success', severity: 'success' });
        router.refresh();
      } else {
        showAlert({ message: result.error, severity: 'error' });
      }
    });
  }

  return <button onClick={handleDelete} disabled={isPending}>Delete</button>;
}
```

## Conclusion

Next.js Server Actions provide a modern, type-safe way to handle mutations and data fetching without React Query. They integrate seamlessly with Next.js's server-first architecture and provide better performance and developer experience for most use cases.

The migration requires:
- Creating Server Action files
- Updating components to use actions
- Removing React Query dependencies
- Using `revalidatePath` for cache invalidation
- Handling loading states with `useTransition` or form actions

Your existing `serverApiClient.ts` helpers work perfectly within Server Actions, maintaining your authentication and API communication patterns.

