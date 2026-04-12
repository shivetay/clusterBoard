import type { IFile } from './file.type';
import type { PaginationMeta } from './pagination.types';

/** One inspiration row (single file), as returned by the paginated API. */
export type TInspirationItem = {
  title: string;
  file: IFile;
};

export type TInspirationListResponse = {
  status: string;
  results: number;
  data: {
    inspirationItems: TInspirationItem[];
  };
  pagination: PaginationMeta;
};
