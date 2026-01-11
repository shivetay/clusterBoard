'use server';

import { revalidatePath } from 'next/cache';
import {
  deleteFile,
  downloadFile,
  uploadFile,
} from '@/lib/api/files/filesClient';
import { serverGet } from '@/lib/api/projects/serverApiClient';
import type { TFileAccessLevel } from '@/types';
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

export async function downloadFileAction(fileId: string) {
  try {
    await downloadFile(fileId);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getProjectFilesAction(projectId: string) {
  try {
    const response = await serverGet<FilesListResponse>(
      `/files/project/${projectId}`,
    );
    const files = response.data?.files || [];
    return { success: true, data: files };
  } catch (error) {
    return { success: false, error };
  }
}
