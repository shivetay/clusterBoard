'use client';

import { Delete, Upload } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  LinearProgress,
  List,
  ListItemText,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '@/components/ui';
import { uploadFile } from '@/lib/api/files/filesClient';
import { TRANSLATIONS } from '@/locales/pl';
import { useAlert } from '@/providers';
import { ActionButtons } from '../project-stage-container/project-stage-container.styled';
import { DragContainer, FileListItem } from './FileUpload.styled';

const KB = 1024;
const MB = KB * KB;
const FILES_MAX_SIZE = 10 * MB; // 10MB for MongoDB document storage

interface FileUploadProps {
  projectId: string;
  multiple?: boolean;
  onUploadComplete?: () => void;
}

export function FileUpload({
  projectId,
  multiple = false,
  onUploadComplete,
}: FileUploadProps) {
  const { t } = useTranslation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {},
  );
  const router = useRouter();
  const { showAlert } = useAlert();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    maxSize: FILES_MAX_SIZE, // 10MB for MongoDB document storage
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
      'application/zip': ['.zip'],
    },
  });

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsPending(true);
    setUploadProgress({});
    try {
      await Promise.all(
        selectedFiles.map((file) =>
          uploadFile(file, projectId, 'investor', false, (progress) => {
            setUploadProgress((prev) => ({
              ...prev,
              [file.name]: progress,
            }));
          }),
        ),
      );

      setSelectedFiles([]);
      setUploadProgress({});
      router.refresh();
      onUploadComplete?.();
    } catch (error) {
      showAlert({
        message: t(TRANSLATIONS.ERROR_ADD_FILE),
        severity: 'error',
      });
    } finally {
      setIsPending(false);
      setUploadProgress({});
    }
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      {selectedFiles.length === 0 ? (
        <DragContainer {...getRootProps()} isDragActive={isDragActive}>
          <input {...getInputProps()} />
          <Upload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="body1" color="text.secondary">
            {isDragActive
              ? t(TRANSLATIONS.DROP_FILES_HERE)
              : t(TRANSLATIONS.DRAG_AND_DROP_FILES_HERE)}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            {t(TRANSLATIONS.MAX_FILE_SIZE)}
          </Typography>
        </DragContainer>
      ) : (
        <Box sx={{ mt: 2 }}>
          <List>
            {selectedFiles.map((file, index) => {
              const progress = uploadProgress[file.name];
              const isUploading = isPending && progress !== undefined;

              return (
                <FileListItem
                  key={file.name}
                  secondaryAction={
                    <ActionButtons
                      startIcon={<Delete />}
                      onClick={() => removeFile(index)}
                      disabled={isPending}
                    />
                  }
                >
                  <ListItemText
                    primary={file.name}
                    secondary={
                      <Box>
                        <Typography variant="body2" component="span">
                          {`${(file.size / KB / KB).toFixed(2)} MB`}
                        </Typography>
                        {isUploading && (
                          <Box sx={{ mt: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={progress}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ mt: 0.5, display: 'block' }}
                            >
                              {progress}%
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </FileListItem>
              );
            })}
          </List>

          <CustomButton
            onClick={handleUpload}
            disabled={isPending}
            sx={{ mt: 2 }}
            color="primary"
            variant="contained"
          >
            {isPending ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                {t(TRANSLATIONS.UPLOADING)}
              </>
            ) : (
              t(TRANSLATIONS.UPLOAD_FILES)
            )}
          </CustomButton>
        </Box>
      )}
    </Box>
  );
}

export default FileUpload;
