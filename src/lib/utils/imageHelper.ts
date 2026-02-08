import type { IFile } from '@/types';

/** Image MIME types we can display inline */
const IMAGE_MIME_PREFIX = 'image/';

export function isImageFile(file: IFile): boolean {
  return file.mime_type?.startsWith(IMAGE_MIME_PREFIX) ?? false;
}

/**
 * Resolve URL for displaying a file image.
 * - Prod (Cloudflare): backend sets storage_url → use it directly.
 * - Dev (MongoDB): no storage_url → use Next.js API proxy (/api/file/[id]) which forwards to backend with auth.
 */
export function getImageSrc(file: IFile): string {
  if (file.storage_url) return file.storage_url;
  if (isImageFile(file)) return `/api/file/${file._id}`;
  return '';
}
