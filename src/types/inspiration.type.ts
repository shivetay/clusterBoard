import type { IFile } from './file.type';

export type TInspiration = {
  title: string;
  files: IFile[];
};

export type TInspirationListResponse = {
  status: string;
  results: number;
  data: {
    inspirations: TInspiration[];
  };
};
