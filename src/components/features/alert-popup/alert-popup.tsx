'use client';
import Alert from '@mui/material/Alert';
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import type * as React from 'react';
import { useAlert } from '@/providers';
import type { IAlert } from '@/types';

export function AlertPopup() {
  const { alerts, removeAlert } = useAlert();

  const handleClose = (
    alert: IAlert,
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
      {alerts.map((alert) => (
        <Snackbar
          key={alert.id}
          open={true}
          autoHideDuration={alert.duration}
          onClose={(event, reason) => {
            handleClose(alert, event, reason);
          }}
        >
          <Alert
            onClose={(event) => {
              handleClose(alert, event);
            }}
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
