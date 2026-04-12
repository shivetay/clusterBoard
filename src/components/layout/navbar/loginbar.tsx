'use client';
import { SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '@/locales';
import { CustomButton } from '../../ui/button';

type LoginBarProps = {
  showAuthLinks?: boolean;
};

export function LoginBar({ showAuthLinks = false }: LoginBarProps) {
  const { t } = useTranslation();

  if (!showAuthLinks) {
    return null;
  }

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
