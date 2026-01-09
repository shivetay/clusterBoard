export function handleActionError(error: unknown): string {
  if (error instanceof Error) {
    // Handle API errors
    if ('response' in error) {
      const apiError = error as any;
      return apiError.response?.data?.message || apiError.message;
    }
    return error.message;
  }
  return 'An unexpected error occurred';
}
