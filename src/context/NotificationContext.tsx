import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';

interface Notification {
  id: string;
  message: string;
  severity: AlertColor;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (message: string, severity?: AlertColor, duration?: number) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (message: string, severity: AlertColor = 'info', duration: number = 6000) => {
      const id = Date.now().toString();
      setNotifications((prev) => [...prev, { id, message, severity, duration }]);
    },
    []
  );

  const showSuccess = useCallback((message: string) => {
    showNotification(message, 'success', 4000);
  }, [showNotification]);

  const showError = useCallback((message: string) => {
    showNotification(message, 'error', 7000);
  }, [showNotification]);

  const showWarning = useCallback((message: string) => {
    showNotification(message, 'warning', 5000);
  }, [showNotification]);

  const showInfo = useCallback((message: string) => {
    showNotification(message, 'info', 4000);
  }, [showNotification]);

  const handleClose = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, showSuccess, showError, showWarning, showInfo }}
    >
      {children}
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.duration}
          onClose={() => handleClose(notification.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ 
            top: `${80 + index * 70}px !important`,
            zIndex: 9999
          }}
        >
          <Alert
            onClose={() => handleClose(notification.id)}
            severity={notification.severity}
            variant="filled"
            sx={{ 
              width: '100%',
              minWidth: '300px',
              boxShadow: 3,
              fontSize: '0.95rem'
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};
