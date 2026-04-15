'use client';
import { Show } from '@clerk/nextjs';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_GROUPS } from '@/locales';
import { CustomButton } from '../../ui/button';

export function LoginBar() {
  const { t } = useTranslation();

  return (
    <Show when="signed-out">
      <Link href="/sign-in">
        <CustomButton>{t(TRANSLATION_GROUPS.COMMON.LOGIN_BTN)}</CustomButton>
      </Link>

      <Link href="/sign-up">
        <CustomButton>{t(TRANSLATION_GROUPS.COMMON.REGISTER_BTN)}</CustomButton>
      </Link>
    </Show>
  );
}

export default LoginBar;
