import type { TPublicProjectMessage } from '@/types';

function findRootInReplies(
  replies: TPublicProjectMessage[],
  targetId: string,
  rootId: string,
): string | null {
  for (const r of replies) {
    if (r.id === targetId) return rootId;
    const nested = findRootInReplies(r.replies, targetId, rootId);
    if (nested) return nested;
  }
  return null;
}

/**
 * Returns the root thread id that contains the given message id (root or any reply).
 */
export function findRootMessageIdForMessageId(
  roots: TPublicProjectMessage[],
  messageId: string,
): string | null {
  for (const root of roots) {
    if (root.id === messageId) return root.id;
    const fromReply = findRootInReplies(root.replies, messageId, root.id);
    if (fromReply) return fromReply;
  }
  return null;
}
