'use client';

import { Delete, Upload } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '@/lib/api/files/filesClient';

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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    maxSize: 10 * FILES_MAX_SIZE, // 10MB for MongoDB document storage
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
    try {
      await uploadFile(selectedFiles[0], projectId);

      setSelectedFiles([]);
      router.refresh();
      onUploadComplete?.();
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s',
        }}
      >
        <input {...getInputProps()} />
        <Upload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop files here, or click to select'}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          Max file size: 10MB
        </Typography>
      </Box>

      {selectedFiles.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <List>
            {selectedFiles.map((file, index) => (
              <ListItem
                key={file.name}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => removeFile(index)}
                    disabled={isPending}
                  >
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={file.name}
                  secondary={`${(file.size / KB / KB).toFixed(2)} MB`}
                />
              </ListItem>
            ))}
          </List>

          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={isPending}
            fullWidth
            sx={{ mt: 2 }}
          >
            {isPending ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Uploading...
              </>
            ) : (
              `Upload ${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''}`
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
}
