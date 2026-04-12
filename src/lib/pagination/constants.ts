import type { PaginationMeta } from '@/types';

export const emptyPaginationMeta: PaginationMeta = {
  currentPage: 1,
  itemsPerPage: 1,
  totalItems: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

/** Page size for the authenticated user's project list (must match backend default). */
export const userProjectsPageSize = 6;

export const filesListPageSize = 10;

export const filesGridPageSize = 9;

export const inspirationListPageSize = 10;

export const inspirationGridPageSize = 9;

export const filesViewQuery = {
  page: 'page',
  view: 'view',
} as const;

export type FilesViewMode = 'list' | 'grid';

export function parseFilesViewMode(value: string | undefined): FilesViewMode {
  return value === 'grid' ? 'grid' : 'list';
}

export function itemsPerPageForFilesView(view: FilesViewMode): number {
  return view === 'grid' ? filesGridPageSize : filesListPageSize;
}

export function itemsPerPageForInspirationView(view: FilesViewMode): number {
  return view === 'grid' ? inspirationGridPageSize : inspirationListPageSize;
}
