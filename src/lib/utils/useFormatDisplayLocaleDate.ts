'use client';

import { useTranslation } from 'react-i18next';
import { formatDisplayLocaleDate } from './formatDate';

/** Uses the current i18n language for {@link formatDisplayLocaleDate}. */
export function useFormatDisplayLocaleDate() {
  const { i18n } = useTranslation();
  return (input: string | number | Date) =>
    formatDisplayLocaleDate(
      input,
      i18n.resolvedLanguage ?? i18n.language ?? undefined,
    );
}
