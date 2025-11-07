'use client';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '@/locales';
import { CustomButton } from '../button';

export function LoginBar() {
  const { t } = useTranslation();

  return (
    <Box>
      <CustomButton>{t(TRANSLATIONS.LOGIN_BTN)}</CustomButton>
      <CustomButton>{t(TRANSLATIONS.REGISTER_BTN)}</CustomButton>
    </Box>
  );
}

export default LoginBar;
