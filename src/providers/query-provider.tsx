'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

// biome-ignore lint/style/noMagicNumbers: <minutes and seconds>
const ONE_MINUTE = 60 * 1000;
// biome-ignore lint/style/noMagicNumbers: <minutes and seconds>
const FIVE_MINUTES = 5 * 60 * 1000;

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: ONE_MINUTE, // 1 minute
            gcTime: FIVE_MINUTES, // 5 minutes (formerly cacheTime)
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default QueryProvider;
