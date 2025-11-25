'use client';
import { SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '@/locales';
import { CustomButton } from '../../ui/button';

export function LoginBar() {
  const { t } = useTranslation();

  return (
    <SignedOut>
      <Link href="/sign-in">
        <CustomButton>{t(TRANSLATIONS.LOGIN_BTN)}</CustomButton>
      </Link>

      <Link href="/sign-up">
        <CustomButton>{t(TRANSLATIONS.REGISTER_BTN)}</CustomButton>
      </Link>
    </SignedOut>
  );
}

export default LoginBar;
