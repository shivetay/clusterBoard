const NOTIFICATIONS_STREAM_PATH = '/notifications/stream';

const SSE_DATA_PREFIX = 'data:';
const HTTP_STATUS_SERVICE_UNAVAILABLE = 503;

const SSE_DEFAULT_BACKOFF_MS = 2000;
const SSE_NO_TOKEN_RETRY_MS = 5000;
const SSE_FAILED_FETCH_MIN_BACKOFF_MS = 3000;
const SSE_BACKOFF_CEILING_MS = 30_000;
const SSE_BACKOFF_MAX_AFTER_MULTIPLY_MS = 60_000;

function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }
    const t = window.setTimeout(() => resolve(), ms);
    const onAbort = () => {
      window.clearTimeout(t);
      reject(new DOMException('Aborted', 'AbortError'));
    };
    signal.addEventListener('abort', onAbort, { once: true });
  });
}

async function readSseBody(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onDataPayload: (payload: unknown) => void,
  signal: AbortSignal,
): Promise<void> {
  const decoder = new TextDecoder();
  let buffer = '';
  while (!signal.aborted) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split(/\r?\n\r?\n/);
    buffer = chunks.pop() ?? '';
    for (const chunk of chunks) {
      const dataLines = chunk
        .split(/\r?\n/)
        .filter((line) => line.startsWith(SSE_DATA_PREFIX))
        .map((line) => line.slice(SSE_DATA_PREFIX.length).trim())
        .join('');
      if (!dataLines) continue;
      try {
        onDataPayload(JSON.parse(dataLines));
      } catch {
        // ignore malformed event
      }
    }
  }
}

/**
 * Long-lived SSE consumer: calls `onInvalidate` when the server reports new notifications.
 * Reconnects with backoff. If the stream is unavailable (503), backs off more aggressively so polling covers updates.
 */
export async function subscribeNotificationEvents(
  getToken: () => Promise<string | null>,
  onInvalidate: () => void,
  signal: AbortSignal,
): Promise<void> {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  if (!base) return;

  let backoffMs = SSE_DEFAULT_BACKOFF_MS;

  while (!signal.aborted) {
    try {
      const token = await getToken();
      if (!token) {
        await delay(SSE_NO_TOKEN_RETRY_MS, signal);
        continue;
      }

      const url = `${base}${NOTIFICATIONS_STREAM_PATH}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'text/event-stream',
        },
        signal,
      });

      if (res.status === HTTP_STATUS_SERVICE_UNAVAILABLE) {
        backoffMs = Math.min(backoffMs * 2, SSE_BACKOFF_MAX_AFTER_MULTIPLY_MS);
        await delay(backoffMs, signal);
        continue;
      }

      if (!res.ok || !res.body) {
        backoffMs = Math.min(
          Math.max(backoffMs, SSE_FAILED_FETCH_MIN_BACKOFF_MS),
          SSE_BACKOFF_CEILING_MS,
        );
        await delay(backoffMs, signal);
        continue;
      }

      backoffMs = SSE_DEFAULT_BACKOFF_MS;
      const reader = res.body.getReader();
      try {
        await readSseBody(
          reader,
          (payload) => {
            const p = payload as { type?: string };
            if (p?.type === 'notifications_updated') onInvalidate();
          },
          signal,
        );
      } finally {
        reader.releaseLock();
      }

      await delay(SSE_DEFAULT_BACKOFF_MS, signal);
    } catch (err) {
      if (
        signal.aborted ||
        (err instanceof DOMException && err.name === 'AbortError')
      )
        break;
      backoffMs = Math.min(
        Math.max(backoffMs, SSE_DEFAULT_BACKOFF_MS),
        SSE_BACKOFF_CEILING_MS,
      );
      await delay(backoffMs, signal);
      backoffMs = Math.min(backoffMs * 2, SSE_BACKOFF_MAX_AFTER_MULTIPLY_MS);
    }
  }
}
