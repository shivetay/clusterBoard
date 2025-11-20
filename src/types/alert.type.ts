export type TAlertSeverity = 'success' | 'error' | 'warning' | 'info';

export interface IAlertOptions {
  message: string;
  severity?: TAlertSeverity;
  duration?: number; // Auto-hide duration in ms (default: 6000)
  action?: React.ReactNode; // Optional action button
  onClose?: () => void; // Optional callback when alert closes
}

export interface IAlert extends IAlertOptions {
  id: string;
  severity: TAlertSeverity;
  duration: number;
}
