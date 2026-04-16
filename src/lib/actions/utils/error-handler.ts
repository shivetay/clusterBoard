import { resolveApiErrorMessage } from '@/lib/utils/resolve-api-error-message';

export function handleActionError(error: unknown): string {
  return resolveApiErrorMessage(error);
}
