export function previewMessageBody(body: string, maxLen = 120): string {
  const t = body.replace(/\s+/g, ' ').trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen)}…`;
}
