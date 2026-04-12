'use server';
import { emptyPaginationMeta } from '@/lib/pagination/constants';
import type { PaginationMeta, TInspirationItem } from '@/types';
import type { TInspirationListResponse } from '@/types/inspiration.type';
import { serverGet } from '../projects';

export async function getProjectInspirationsAction(
  projectId: string,
  request: { currentPage: number; itemsPerPage: number },
): Promise<{
  success: boolean;
  data: TInspirationItem[];
  pagination: PaginationMeta;
  error?: unknown;
}> {
  try {
    const response = await serverGet<TInspirationListResponse>(
      `/inspirations/project/${projectId}?page=${request.currentPage}&limit=${request.itemsPerPage}`,
    );

    const inspirationItems = response.data?.inspirationItems || [];
    const pagination = response.pagination ?? emptyPaginationMeta;

    return { success: true, data: inspirationItems, pagination };
  } catch (error) {
    return {
      success: false,
      error,
      data: [],
      pagination: emptyPaginationMeta,
    };
  }
}
