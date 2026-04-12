import type { IFile } from './file.type';
import type { PaginationMeta } from './pagination.types';

/** One inspiration row (single file), as returned by the paginated API. */
export type TInspirationItem = {
  title: string;
  file: IFile;
};

/** Legacy grouped shape (files under one title); still returned for compatibility. */
export type TInspiration = {
  title: string;
  files: IFile[];
};

export type TInspirationListResponse = {
  status: string;
  results: number;
  data: {
    inspirationItems: TInspirationItem[];
    /** Grouped by title for the current page only (legacy clients). */
    inspirations: TInspiration[];
  };
  pagination: PaginationMeta;
};
