'use client';

import {
  Delete,
  Description,
  Download,
  Image,
  InsertDriveFile,
} from '@mui/icons-material';
import { Box, List, ListItemText, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteFile, downloadFile } from '@/lib/api/files/filesClient';
import type { IFile } from '@/types';
import { ActionButtons } from '../project-stage-container/project-stage-container.styled';
import { FileListItem } from './FileUpload.styled';

interface FilesListProps {
  files?: IFile[];
}

export function FilesList({ files }: FilesListProps) {
  const router = useRouter();
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);
  const [downloadingFileId, setDownloadingFileId] = useState<string | null>(
    null,
  );
  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image />;
    if (mimeType.includes('pdf') || mimeType.includes('document'))
      return <Description />;
    return <InsertDriveFile />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  const handleDownload = async (fileId: string) => {
    setDownloadingFileId(fileId);
    try {
      await downloadFile(fileId);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setDownloadingFileId(null);
    }
  };

  const handleDelete = async (fileId: string) => {
    setDeletingFileId(fileId);
    try {
      await deleteFile(fileId);
      router.refresh();
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setDeletingFileId(null);
    }
  };

  if (!files || files.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No files uploaded yet
        </Typography>
      </Box>
    );
  }

  return (
    <List>
      {files.map((file) => (
        <FileListItem key={file._id}>
          {getFileIcon(file.mime_type)}
          <ListItemText
            primary={file.file_name}
            secondary={
              <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  {formatFileSize(file.file_size)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  • {new Date(file.uploaded_at).toLocaleDateString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  • {file.uploaded_by_name}
                </Typography>
              </Box>
            }
            sx={{ ml: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <ActionButtons
              disabled={downloadingFileId === file._id}
              startIcon={<Download />}
              onClick={() => handleDownload(file._id)}
            />
            <ActionButtons
              disabled={deletingFileId === file._id}
              startIcon={<Delete />}
              onClick={() => handleDelete(file._id)}
            />
          </Box>
        </FileListItem>
      ))}
    </List>
  );
}

export default FilesList;
