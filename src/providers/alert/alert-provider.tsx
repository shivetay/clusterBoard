'use client';
import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';
import type { IAlert, IAlertOptions } from '@/types';

const ALERT_DURATION = 5000;

interface AlertContextType {
  alerts: IAlert[];
  showAlert: (options: IAlertOptions) => void;
  removeAlert: (id: string) => void;
  clearAllAlerts: () => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined,
);

export function AlertProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => {
      const alert = prev.find((a) => a.id === id);
      if (alert?.onClose) {
        alert.onClose();
      }
      return prev.filter((a) => a.id !== id);
    });
  }, []);

  const showAlert = useCallback(
    (options: IAlertOptions) => {
      const id = `alert-${Date.now()}-${Math.random()}`;
      const alert: IAlert = {
        id,
        severity: options.severity || 'info',
        duration: options.duration || ALERT_DURATION,
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
    },
    [removeAlert],
  );

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
