import type { IFile } from '@/types';

/** Image MIME types we can display inline */
const IMAGE_MIME_PREFIX = 'image/';

export function isImageFile(file: IFile): boolean {
  return file.mime_type?.startsWith(IMAGE_MIME_PREFIX) ?? false;
}

/**
 * Resolve URL for displaying a file image. For MongoDB storage (no storage_url)
 * we use the Next.js API proxy which forwards the request to the backend with auth.
 */
export function getImageSrc(file: IFile): string {
  if (file.storage_url) return file.storage_url;
  if (isImageFile(file)) return `/api/file/${file._id}`;
  return '';
}
