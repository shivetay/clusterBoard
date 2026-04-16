import { TRANSLATIONS } from '@/locales/pl/locales';
import { normalizeAppError } from './parse-app-error';

const DEFAULT_ERROR_KEY = 'GENERAL_ERROR';

type TranslationDictionary = typeof TRANSLATIONS;

const hasTranslation = (key: string): key is keyof TranslationDictionary =>
  key in TRANSLATIONS;

const getTranslatedMessageFromKey = (key: string) => {
  if (hasTranslation(key)) {
    return TRANSLATIONS[key];
  }
  return TRANSLATIONS[DEFAULT_ERROR_KEY];
};

export const resolveApiErrorMessage = (error: unknown): string => {
  const appError = normalizeAppError(error);
  if (appError.translationKey) {
    return getTranslatedMessageFromKey(appError.translationKey);
  }

  return appError.message || TRANSLATIONS[DEFAULT_ERROR_KEY];
};
