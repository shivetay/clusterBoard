'use client';

import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';

interface LogoutButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  fullWidth?: boolean;
}

/**
 * Logout button component
 * Uses NextAuth signOut function
 */
export function LogoutButton({
  variant = 'outlined',
  fullWidth = false,
}: LogoutButtonProps) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <Button
      variant={variant}
      onClick={handleLogout}
      startIcon={<LogoutIcon />}
      fullWidth={fullWidth}
    >
      Logout
    </Button>
  );
}
