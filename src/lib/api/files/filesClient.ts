import apiClient from '@/lib/api/apiClient';
import type {
  FilesListResponse,
  FileUploadResponse,
  IFile,
} from '@/types/file.type';

const FILES_SIZE_PROGRESS_STEP = 100;

/**
 * Upload a single file
 */
export const uploadFile = async (
  file: File,
  projectId: string,
  accessLevel: 'owner' | 'investor' | 'public' = 'investor',
  isPublic: boolean = false,
  isInspiration: boolean = false,
  onProgress?: (progress: number) => void,
): Promise<IFile> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('project_id', projectId);
  formData.append('access_level', accessLevel);
  // TODO check if this can be removed
  formData.append('is_public', String(isPublic));
  formData.append('is_inspiration', String(isInspiration));

  const response = await apiClient.post<FileUploadResponse>(
    '/files/upload',
    formData,
    {
      // Don't set Content-Type header - axios/browser will set it automatically
      // with the correct boundary for multipart/form-data
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * FILES_SIZE_PROGRESS_STEP) /
              progressEvent.total,
          );
          // Emit progress to the callback if provided
          onProgress?.(percentCompleted);
        }
      },
    },
  );

  return response.data.data.file;
};

/**
 * Get all files for a project
 */
export const getProjectFiles = async (projectId: string): Promise<IFile[]> => {
  const response = await apiClient.get<FilesListResponse>(
    `/files/project/${projectId}`,
  );

  return response.data.data.files;
};

/**
 * Get file by ID with download URL
 */
export const getFileById = async (fileId: string): Promise<IFile> => {
  const response = await apiClient.get<{ data: { file: IFile } }>(
    `/files/${fileId}`,
  );

  return response.data.data.file;
};

/**
 * Delete a file
 */
export const deleteFile = async (fileId: string): Promise<void> => {
  await apiClient.delete(`/files/${fileId}`);
};

/**
 * Download a file
 */
export const downloadFile = async (fileId: string): Promise<void> => {
  // TODO: check why this is like this, it should be possible to download the file directly from the fileId
  // First get file metadata to get the filename
  const fileMetadata = await apiClient.get<{ data: { file: IFile } }>(
    `/files/${fileId}/metadata`,
  );
  const file = fileMetadata.data.data.file;

  // Then download the actual file as binary data
  const response = await apiClient.get(`/files/${fileId}`, {
    responseType: 'blob',
  });

  // Create a blob URL from the response
  const blob = new Blob([response.data], { type: file.mime_type });
  const url = window.URL.createObjectURL(blob);

  // Create a temporary anchor element to trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = file.file_name;
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
