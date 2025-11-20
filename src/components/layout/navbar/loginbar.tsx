'use client';
import { Box } from '@mui/material';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '@/locales';
import { CustomButton } from '../../ui/button';

export function LoginBar() {
  const { t } = useTranslation();
  const { status } = useSession();

  if (status === 'authenticated') {
    return null;
  }

  return (
    <Box>
      <CustomButton component={Link} href="/login" variant="outlined">
        {t(TRANSLATIONS.LOGIN_BTN)}
      </CustomButton>
      <CustomButton component={Link} href="/register" variant="contained">
        {t(TRANSLATIONS.REGISTER_BTN)}
      </CustomButton>
    </Box>
  );
}

export default LoginBar;
