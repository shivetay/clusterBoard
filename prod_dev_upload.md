# File Storage: MongoDB (Dev) vs Cloudflare R2 (Production)

This document describes how the frontend interacts with the file storage system that uses **MongoDB document storage for development** and **Cloudflare R2 (S3-compatible) for production**.

---

## Overview

The frontend doesn't need to know which storage backend is being used. The backend automatically handles:
- **Development**: Files stored in MongoDB (streamed through backend)
- **Production**: Files stored in Cloudflare R2 (served via presigned URLs or direct R2 URLs)

The frontend API client remains the same regardless of storage backend.

---

## Frontend Implementation

### Current File Client

**File: `cluster_app_fe/src/lib/api/files/filesClient.ts`**

The existing implementation works for both storage types:

```typescript
import apiClient from '@/lib/api/apiClient';
import type {
  FilesListResponse,
  FileUploadResponse,
  IFile,
} from '@/types/file.type';

const FILES_SIZE_PROGRESS_STEP = 100;

/**
 * Upload a single file
 * Works for both MongoDB (dev) and R2 (prod)
 */
export const uploadFile = async (
  file: File,
  projectId: string,
  accessLevel: 'owner' | 'investor' | 'public' = 'investor',
  isPublic: boolean = false,
  onProgress?: (progress: number) => void,
): Promise<IFile> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('project_id', projectId);
  formData.append('access_level', accessLevel);
  formData.append('is_public', String(isPublic));

  const response = await apiClient.post<FileUploadResponse>(
    '/files/upload',
    formData,
    {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * FILES_SIZE_PROGRESS_STEP) /
              progressEvent.total,
          );
          onProgress?.(percentCompleted);
        }
      },
    },
  );

  return response.data.data.file;
};

/**
 * Get all files for a project
 * Returns metadata only (works for both storage types)
 */
export const getProjectFiles = async (projectId: string): Promise<IFile[]> => {
  const response = await apiClient.get<FilesListResponse>(
    `/files/project/${projectId}`,
  );

  return response.data.data.files;
};

/**
 * Get file by ID with metadata
 * Works for both storage types
 */
export const getFileById = async (fileId: string): Promise<IFile> => {
  const response = await apiClient.get<{ data: { file: IFile } }>(
    `/files/${fileId}`,
  );

  return response.data.data.file;
};

/**
 * Delete a file
 * Works for both storage types
 */
export const deleteFile = async (fileId: string): Promise<void> => {
  await apiClient.delete(`/files/${fileId}`);
};

/**
 * Download a file
 * Handles both MongoDB (stream) and R2 (redirect to presigned URL)
 */
export const downloadFile = async (fileId: string): Promise<void> => {
  // Get file metadata first
  const fileMetadata = await apiClient.get<{ data: { file: IFile } }>(
    `/files/${fileId}/metadata`,
  );
  const file = fileMetadata.data.data.file;

  // For R2 files, the backend returns a redirect to presigned URL
  // For MongoDB files, the backend streams the file
  const response = await apiClient.get(`/files/${fileId}`, {
    responseType: 'blob',
    maxRedirects: 5, // Allow redirects for R2 presigned URLs
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
```

---

## File Type Definitions

**File: `cluster_app_fe/src/types/file.type.ts`**

Ensure the file type includes all storage-related fields:

```typescript
export interface IFile {
  _id: string;
  file_name: string;
  stored_file_name: string;
  file_path?: string; // R2 key (production only)
  mime_type: string;
  file_size: number;
  file_extension: string;
  project_id: string;
  uploaded_by: string;
  uploaded_by_name: string;
  storage_type: 'mongodb' | 'r2' | 's3' | 'gridfs';
  bucket_name?: string; // R2 bucket name (production only)
  storage_url?: string; // R2 public URL (production only)
  is_public: boolean;
  access_level: 'owner' | 'investor' | 'public';
  is_validated: boolean;
  validation_status: 'pending' | 'valid' | 'invalid';
  uploaded_at: string;
  deleted_at?: string;
  expires_at?: string;
  is_deleted: boolean;
  version: number;
  previous_version_id?: string;
  createdAt: string;
  updatedAt: string;
}
```

---

## Displaying Files

### Show File Preview/Download

When displaying files, you can check `storage_type` to determine how to handle the file:

```typescript
import { IFile } from '@/types/file.type';
import { downloadFile } from '@/lib/api/files/filesClient';

const FileItem = ({ file }: { file: IFile }) => {
  const handleDownload = async () => {
    if (file.storage_type === 'r2' && file.storage_url) {
      // For R2 files, you can optionally use the public URL directly
      // Or use the downloadFile function which handles presigned URLs
      window.open(file.storage_url, '_blank');
    } else {
      // For MongoDB files, use the download function
      await downloadFile(file._id);
    }
  };

  return (
    <div>
      <p>{file.file_name}</p>
      <p>Size: {formatFileSize(file.file_size)}</p>
      <p>Storage: {file.storage_type}</p>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
};
```

---

## Environment Variables

### Development (`cluster_app_fe/.env.development`)

```env
# File Upload Limits (MongoDB - 10MB)
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
NEXT_PUBLIC_ALLOWED_FILE_TYPES=pdf,doc,docx,xls,xlsx,jpg,png,gif,webp,zip

# API URL
NEXT_PUBLIC_API_URL=http://localhost:3121/api/v1
```

### Production (`cluster_app_fe/.env.production`)

```env
# File Upload Limits (R2 - 100MB)
NEXT_PUBLIC_MAX_FILE_SIZE=104857600
NEXT_PUBLIC_ALLOWED_FILE_TYPES=pdf,doc,docx,xls,xlsx,jpg,png,gif,webp,zip

# API URL
NEXT_PUBLIC_API_URL=https://your-backend.herokuapp.com/api/v1
```

---

## File Upload Component

### Example Upload Component

```typescript
'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '@/lib/api/files/filesClient';

const FileUpload = ({ projectId }: { projectId: string }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      try {
        setUploading(true);
        setProgress(0);

        await uploadFile(
          file,
          projectId,
          'investor',
          false,
          (progressPercent) => {
            setProgress(progressPercent);
          },
        );

        setUploading(false);
        setProgress(0);
        // Show success message
      } catch (error) {
        console.error('Upload failed:', error);
        // Show error message
        setUploading(false);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) || 10485760,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-8 text-center cursor-pointer ${
        isDragActive ? 'border-blue-500' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <div>
          <p>Uploading... {progress}%</p>
          <progress value={progress} max={100} />
        </div>
      ) : (
        <p>
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop files here, or click to select'}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
```

---

## Handling File Downloads

### Direct Download (Recommended)

The `downloadFile` function handles both storage types automatically:

```typescript
import { downloadFile } from '@/lib/api/files/filesClient';

const handleDownload = async (fileId: string) => {
  try {
    await downloadFile(fileId);
    // File download started
  } catch (error) {
    console.error('Download failed:', error);
    // Show error message
  }
};
```

### Alternative: Direct R2 URL (Production Only)

For R2 files, you can optionally use the `storage_url` directly if it's public:

```typescript
const handleDownloadR2 = (file: IFile) => {
  if (file.storage_type === 'r2' && file.storage_url) {
    // Open in new tab or download
    window.open(file.storage_url, '_blank');
  } else {
    // Use backend endpoint for MongoDB files
    downloadFile(file._id);
  }
};
```

---

## File Size Validation

### Client-Side Validation

```typescript
const MAX_FILE_SIZE = Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) || 10485760; // 10MB default

const validateFile = (file: File): string | null => {
  if (file.size > MAX_FILE_SIZE) {
    return `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`;
  }

  const allowedTypes = process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES?.split(',') || [];
  const fileExtension = file.name.split('.').pop()?.toLowerCase();

  if (fileExtension && !allowedTypes.includes(fileExtension)) {
    return `File type .${fileExtension} is not allowed`;
  }

  return null;
};
```

---

## Error Handling

### Upload Errors

```typescript
try {
  await uploadFile(file, projectId, 'investor', false, (progress) => {
    setProgress(progress);
  });
} catch (error: any) {
  if (error.response?.status === 413) {
    // File too large
    alert('File is too large. Maximum size is 10MB (dev) or 100MB (prod).');
  } else if (error.response?.status === 400) {
    // Invalid file type
    alert('File type not allowed.');
  } else {
    // Other errors
    alert('Upload failed. Please try again.');
  }
}
```

---

## Testing

### Test File Upload (Development)

1. Set `NODE_ENV=development` in backend
2. Upload a file (< 10MB)
3. Check MongoDB - file should be stored with `storage_type: 'mongodb'`
4. Download file - should stream from backend

### Test File Upload (Production)

1. Set `NODE_ENV=production` in backend
2. Configure R2 credentials in `prod.env`
3. Upload a file (< 100MB)
4. Check MongoDB - file should have `storage_type: 'r2'` and `file_path`
5. Download file - should redirect to R2 presigned URL

---

## Best Practices

1. **Always use the API client**: Don't access R2 URLs directly from frontend
2. **Handle both storage types**: Code should work regardless of backend storage
3. **Show upload progress**: Use the `onProgress` callback for better UX
4. **Validate file size**: Check file size before upload to avoid errors
5. **Error handling**: Provide clear error messages for upload failures
6. **File preview**: For images, you can use `storage_url` directly if available

---

## Summary

- **Frontend is storage-agnostic**: Same API calls work for both MongoDB and R2
- **Backend handles routing**: Automatically uses correct storage based on `NODE_ENV`
- **No frontend changes needed**: Existing file client works for both storage types
- **Optional optimizations**: Can use R2 public URLs directly for faster access
- **Environment-based limits**: File size limits differ between dev (10MB) and prod (100MB)
