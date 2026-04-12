export type ServerHealthResponse = {
  status: 'ok' | 'degraded';
  version: string;
};

export async function getServerHealth(): Promise<ServerHealthResponse | null> {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  if (!base) {
    return null;
  }

  try {
    const res = await fetch(`${base}/health`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as unknown;
    if (
      !data ||
      typeof data !== 'object' ||
      !('status' in data) ||
      !('version' in data)
    ) {
      return null;
    }

    const { status, version } = data as ServerHealthResponse;
    if (
      (status !== 'ok' && status !== 'degraded') ||
      typeof version !== 'string'
    ) {
      return null;
    }

    return { status, version };
  } catch {
    return null;
  }
}
