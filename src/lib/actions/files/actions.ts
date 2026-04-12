'use server';

import { revalidatePath } from 'next/cache';
import { deleteFile, uploadFile } from '@/lib/api/files/filesClient';
import { serverGet } from '@/lib/api/projects/serverApiClient';
import { emptyPaginationMeta } from '@/lib/pagination/constants';
import type { IFile, TFileAccessLevel } from '@/types';
import type { FilesListResponse } from '@/types/file.type';

export async function uploadFileAction(
  file: File,
  projectId: string,
  accessLevel: TFileAccessLevel = 'investor',
  isPublic: boolean = false,
) {
  try {
    await uploadFile(file, projectId, accessLevel, isPublic);

    revalidatePath(`/project/[id]`);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error };
  }
}

export async function deleteFileAction(fileId: string) {
  try {
    await deleteFile(fileId);
    revalidatePath(`/project/[id]`);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getProjectFilesAction(
  projectId: string,
  request: { currentPage: number; itemsPerPage: number },
) {
  try {
    const response = await serverGet<FilesListResponse>(
      `/files/project/${projectId}?page=${request.currentPage}&limit=${request.itemsPerPage}`,
    );
    const files = response.data?.files || [];
    const pagination = response.pagination ?? emptyPaginationMeta;
    return { success: true as const, data: files, pagination };
  } catch (error) {
    return {
      success: false as const,
      error,
      data: [] as IFile[],
      pagination: emptyPaginationMeta,
    };
  }
}
