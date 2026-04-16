import { isAxiosError } from 'axios';
import { AppError, type TParsedAppError } from '@/types';

const TRANSLATION_KEY_REGEX = /^[A-Z0-9_]+$/;

type TApiErrorPayload = {
  errorKey?: string;
  message?: string;
  errors?: Array<{ code?: number | string; message?: string }>;
};

type TClerkErrorPayload = {
  errors?: Array<{ code?: string; message?: string; longMessage?: string }>;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const toStringOrUndefined = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim().length > 0 ? value : undefined;

const toTranslationKey = (value?: string) =>
  value && TRANSLATION_KEY_REGEX.test(value) ? value : undefined;

export const parseAppError = (error: unknown): TParsedAppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (isAxiosError(error)) {
    const payload = (error.response?.data ?? {}) as TApiErrorPayload;
    const backendErrorKey = toStringOrUndefined(payload.errorKey);
    const backendMessage = toStringOrUndefined(payload.message);
    const cloudflareError = payload.errors?.[0];
    const cloudflareMessage = toStringOrUndefined(cloudflareError?.message);

    const message =
      backendMessage ??
      cloudflareMessage ??
      toStringOrUndefined(error.message) ??
      'GENERAL_ERROR';

    return {
      source: payload.errors?.length ? 'cloudflare' : 'backend',
      message,
      translationKey: toTranslationKey(
        backendErrorKey ?? backendMessage ?? message,
      ),
      details: payload.errors?.map((detail) => ({
        code: detail.code ? String(detail.code) : undefined,
        message: detail.message ?? 'Unknown error',
      })),
      raw: error,
    };
  }

  if (isRecord(error)) {
    const maybeClerk = error as TClerkErrorPayload & { message?: string };
    const clerkError = maybeClerk.errors?.[0];
    if (clerkError) {
      return {
        source: 'clerk',
        message:
          toStringOrUndefined(clerkError.longMessage) ??
          toStringOrUndefined(clerkError.message) ??
          'GENERAL_ERROR',
        details: maybeClerk.errors?.map((detail) => ({
          code: toStringOrUndefined(detail.code),
          message: detail.message ?? 'Unknown error',
          longMessage: detail.longMessage,
        })),
        raw: error,
      };
    }

    const genericMessage = toStringOrUndefined(maybeClerk.message);
    if (genericMessage) {
      return {
        source: 'unknown',
        message: genericMessage,
        translationKey: toTranslationKey(genericMessage),
        raw: error,
      };
    }
  }

  if (error instanceof Error) {
    return {
      source: 'unknown',
      message: error.message || 'GENERAL_ERROR',
      translationKey: toTranslationKey(error.message),
      raw: error,
    };
  }

  return {
    source: 'unknown',
    message: 'GENERAL_ERROR',
    raw: error,
  };
};

export const normalizeAppError = (error: unknown) =>
  new AppError(parseAppError(error));
