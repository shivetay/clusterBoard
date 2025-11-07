'use client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
  locale: string;
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale).catch(console.error);
    }
  }, [locale, i18n]);

  return <>{children}</>;
}
export default I18nProvider;
