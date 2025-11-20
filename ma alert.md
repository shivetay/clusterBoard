# Alert Popup System - Implementation Guide

## Overview

This document provides a comprehensive, maintainable, and extensible solution for implementing and using Alert Popups throughout the application. The solution follows the same pattern as the existing Modal system for consistency.

## Architecture

The Alert system consists of three main parts:
1. **AlertProvider** - Context provider that manages alert state
2. **useAlert Hook** - Custom hook to trigger alerts from anywhere
3. **AlertContainer** - Component that renders alerts

## Implementation Steps

### Step 1: Create Alert Types

Create `src/types/alert.type.ts`:

```typescript
export type AlertSeverity = 'success' | 'error' | 'warning' | 'info';

export interface AlertOptions {
  message: string;
  severity?: AlertSeverity;
  duration?: number; // Auto-hide duration in ms (default: 6000)
  action?: React.ReactNode; // Optional action button
  onClose?: () => void; // Optional callback when alert closes
}

export interface Alert extends AlertOptions {
  id: string;
  severity: AlertSeverity;
  duration: number;
}
```

### Step 2: Create Alert Provider

Create `src/providers/alert/alert-provider.tsx`:

```typescript
'use client';
import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import type { Alert, AlertOptions } from '@/types/alert.type';

interface AlertContextType {
  alerts: Alert[];
  showAlert: (options: AlertOptions) => void;
  removeAlert: (id: string) => void;
  clearAllAlerts: () => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined,
);

export function AlertProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = useCallback((options: AlertOptions) => {
    const id = `alert-${Date.now()}-${Math.random()}`;
    const alert: Alert = {
      id,
      severity: options.severity || 'info',
      duration: options.duration || 6000,
      message: options.message,
      action: options.action,
      onClose: options.onClose,
    };

    setAlerts((prev) => [...prev, alert]);

    // Auto-remove after duration
    if (alert.duration > 0) {
      setTimeout(() => {
        removeAlert(id);
      }, alert.duration);
    }
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => {
      const alert = prev.find((a) => a.id === id);
      if (alert?.onClose) {
        alert.onClose();
      }
      return prev.filter((a) => a.id !== id);
    });
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  return (
    <AlertContext.Provider
      value={{
        alerts,
        showAlert,
        removeAlert,
        clearAllAlerts,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
```

### Step 3: Create Alert Provider Index

Create `src/providers/alert/index.ts`:

```typescript
export * from './alert-provider';
export { useAlert } from './alert-provider';
```

### Step 4: Update Providers Index

Update `src/providers/index.ts`:

```typescript
export * from './i18n-provider';
export * from './modal';
export * from './query-provider';
export * from './user-provider';
export * from './alert'; // Add this line
```

### Step 5: Create Alert Container Component

Update `src/components/features/alert-popup/alert-popup.tsx`:

```typescript
'use client';
import Alert from '@mui/material/Alert';
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import * as React from 'react';
import { useAlert } from '@/providers';
import type { Alert as AlertType } from '@/types/alert.type';

export function AlertPopup() {
  const { alerts, removeAlert } = useAlert();

  const handleClose = (
    alert: AlertType,
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    removeAlert(alert.id);
  };

  return (
    <>
      {alerts.map((alert, index) => (
        <Snackbar
          key={alert.id}
          open={true}
          autoHideDuration={alert.duration}
          onClose={(event, reason) => handleClose(alert, event, reason)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            top: `${80 + index * 70}px !important`, // Stack alerts vertically
          }}
        >
          <Alert
            onClose={(event) => handleClose(alert, event)}
            severity={alert.severity}
            variant="filled"
            sx={{ width: '100%' }}
            action={alert.action}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}

export default AlertPopup;
```

### Step 6: Add AlertProvider to Root Layout

Update `src/app/layout.tsx`:

```typescript
import {
  I18nProvider,
  ModalProvider,
  QueryProvider,
  UserProvider,
  AlertProvider, // Add this import
} from '@/providers';

// ... inside RootLayout component:
<ThemeProvider>
  <AlertProvider> {/* Add this wrapper */}
    <ModalProvider>
      <QueryProvider>
        <UserProvider>
          <I18nProvider locale="pl">
            <LayoutContainer>
              <Header />
              {children}
              <Footer />
              <AlertPopup /> {/* Add this component */}
            </LayoutContainer>
          </I18nProvider>
        </UserProvider>
      </QueryProvider>
    </ModalProvider>
  </AlertProvider> {/* Close wrapper */}
</ThemeProvider>
```

### Step 7: Export AlertPopup from Components

Update `src/components/features/index.ts` (if not already):

```typescript
export * from './alert-popup';
export * from './modal';
export * from './projects-card';
export * from './tags';
```

Update `src/components/index.ts` (if it exists) to export AlertPopup:

```typescript
// ... other exports
export * from './features';
```

## Usage Examples

### Basic Usage

```typescript
'use client';
import { useAlert } from '@/providers';

export function MyComponent() {
  const { showAlert } = useAlert();

  const handleSuccess = () => {
    showAlert({
      message: 'Operation completed successfully!',
      severity: 'success',
    });
  };

  const handleError = () => {
    showAlert({
      message: 'Something went wrong!',
      severity: 'error',
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
}
```

### With Custom Duration

```typescript
showAlert({
  message: 'This alert will stay for 10 seconds',
  severity: 'info',
  duration: 10000,
});
```

### With Action Button

```typescript
import { Button } from '@mui/material';

showAlert({
  message: 'File uploaded successfully',
  severity: 'success',
  action: (
    <Button color="inherit" size="small" onClick={handleViewFile}>
      View
    </Button>
  ),
});
```

### With Callback

```typescript
showAlert({
  message: 'Item deleted',
  severity: 'success',
  onClose: () => {
    console.log('Alert closed');
    // Perform cleanup or additional actions
  },
});
```

### In API Hooks (Error Handling)

Update `src/lib/api/hooks/useCreateNewProject.ts`:

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAlert } from '@/providers';
import type { TFormData } from '@/types';
import apiClient from '../apiClient';

export const useCreateNewProject = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  
  const {
    mutate: createProject,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: TFormData) => {
      try {
        await apiClient.post('/projects', data);
      } catch (error: any) {
        throw new Error(error?.response?.data?.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      showAlert({
        message: 'Project created successfully!',
        severity: 'success',
      });
    },
    onError: (error: Error) => {
      showAlert({
        message: error.message || 'Failed to create project',
        severity: 'error',
      });
    },
  });
  
  return { createProject, isPending, error };
};
```

## Extensibility Options

### 1. Add Custom Alert Types

You can extend the `AlertSeverity` type:

```typescript
export type AlertSeverity = 'success' | 'error' | 'warning' | 'info' | 'custom';
```

### 2. Add Position Configuration

Modify `AlertOptions` to support different positions:

```typescript
export type AlertPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface AlertOptions {
  // ... existing options
  position?: AlertPosition;
}
```

Then update `AlertPopup` to use the position:

```typescript
<Snackbar
  anchorOrigin={{
    vertical: alert.position?.includes('top') ? 'top' : 'bottom',
    horizontal: alert.position?.includes('right') ? 'right' : alert.position?.includes('left') ? 'left' : 'center',
  }}
  // ... rest of props
>
```

### 3. Add Persistent Alerts

Add a `persistent` option that prevents auto-dismiss:

```typescript
export interface AlertOptions {
  // ... existing options
  persistent?: boolean; // If true, alert won't auto-dismiss
}
```

Update the provider logic:

```typescript
// Auto-remove after duration (only if not persistent)
if (alert.duration > 0 && !alert.persistent) {
  setTimeout(() => {
    removeAlert(id);
  }, alert.duration);
}
```

### 4. Add Alert Queue Management

Limit the number of visible alerts:

```typescript
const MAX_ALERTS = 5;

const showAlert = useCallback((options: AlertOptions) => {
  // ... create alert
  
  setAlerts((prev) => {
    const newAlerts = [...prev, alert];
    // Keep only the last MAX_ALERTS
    return newAlerts.slice(-MAX_ALERTS);
  });
  
  // ... rest of logic
}, []);
```

### 5. Add Alert Grouping

Group similar alerts together:

```typescript
export interface AlertOptions {
  // ... existing options
  groupId?: string; // Group alerts with the same groupId
}
```

### 6. Add Animation Options

Customize animations by modifying the Snackbar component with MUI's `Slide` or custom transitions.

## Best Practices

1. **Consistent Messaging**: Use translation keys for alert messages:
   ```typescript
   const { t } = useTranslation();
   showAlert({
     message: t(TRANSLATIONS.PROJECT_CREATED_SUCCESS),
     severity: 'success',
   });
   ```

2. **Error Handling**: Always show user-friendly error messages:
   ```typescript
   onError: (error: Error) => {
     showAlert({
       message: error.message || t(TRANSLATIONS.GENERIC_ERROR),
       severity: 'error',
     });
   }
   ```

3. **Success Feedback**: Provide immediate feedback for user actions:
   ```typescript
   onSuccess: () => {
     showAlert({
       message: t(TRANSLATIONS.OPERATION_SUCCESS),
       severity: 'success',
     });
   }
   ```

4. **Avoid Alert Spam**: Debounce rapid alerts or group them:
   ```typescript
   // Use a debounce utility for rapid-fire alerts
   const debouncedShowAlert = debounce(showAlert, 300);
   ```

5. **Accessibility**: Ensure alert messages are descriptive and actionable.

## Testing

### Unit Test Example

```typescript
import { renderHook, act } from '@testing-library/react';
import { AlertProvider, useAlert } from '@/providers';

describe('useAlert', () => {
  it('should show and remove alerts', () => {
    const wrapper = ({ children }) => <AlertProvider>{children}</AlertProvider>;
    const { result } = renderHook(() => useAlert(), { wrapper });

    act(() => {
      result.current.showAlert({
        message: 'Test alert',
        severity: 'info',
      });
    });

    expect(result.current.alerts).toHaveLength(1);
    expect(result.current.alerts[0].message).toBe('Test alert');

    act(() => {
      result.current.removeAlert(result.current.alerts[0].id);
    });

    expect(result.current.alerts).toHaveLength(0);
  });
});
```

## Migration from Current Implementation

If you're currently using the basic `AlertPopup` component:

1. Replace direct `AlertPopup` usage with the `useAlert` hook
2. Remove any local state management for alerts
3. Update all components to use `showAlert()` instead of managing alert state directly

## Summary

This solution provides:
- ✅ **Centralized Management**: All alerts managed through a single provider
- ✅ **Easy to Use**: Simple `showAlert()` function from anywhere
- ✅ **Extensible**: Easy to add new features (positions, types, etc.)
- ✅ **Maintainable**: Follows existing patterns (Modal system)
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Flexible**: Supports custom durations, actions, callbacks
- ✅ **Stackable**: Multiple alerts can be shown simultaneously
- ✅ **Auto-dismiss**: Configurable auto-hide functionality

The implementation follows React best practices and integrates seamlessly with your existing codebase architecture.

